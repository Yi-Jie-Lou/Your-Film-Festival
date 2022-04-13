import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, auth, firebase } from "./utils/firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const monitorAuthState = async () => {
  const loginAuth = getAuth();
  onAuthStateChanged(loginAuth, (currentUser) => {
    return currentUser.uid;
  });
};

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleError = (error) => {
    error === "Firebase: Error (auth/wrong-password)."
      ? alert("密碼錯誤")
      : "Firebase: Error (auth/invalid-email)."
      ? alert("無效的帳號或密碼")
      : alert("登入失敗");
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      firebase.initDataBase(user.user.uid).then((_) => {
        alert("註冊成功");
      });
    } catch (error) {
      handleError(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      alert("登入成功");
    } catch (error) {
      handleError(error.message);
    }
  };
  const logout = async () => {
    if (login) {
      await signOut(auth);
      alert("您已登出");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="Email">信箱</label>
        <input
          id="Email"
          placeholder="Email"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="Password">密碼</label>
        <input
          id="Password"
          placeholder="Password"
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={register}> 註冊</button>
        <button onClick={login}> 登入</button>
        <button onClick={logout}> 登出</button>
      </div>
    </div>
  );
}

export default Login;
