import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firebase } from "../utils/firebase-config";
import { signOut } from "firebase/auth";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import { useSelector } from "react-redux";
import LoadingAnim from "../img/LoadingAnim.gif";

function Login() {
  const userID = useSelector((state) => state.userID);
  const [userEmail, setUserEmail] = useState("newdemo@gmail.com");
  const [userPassword, setUserPassword] = useState("test1234");
  const state = useSelector((state) => state.state);

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
    <>
      <Header userState={state} />
      <div className="vertical mt-4  | h-[calc(100vh-96px)] | xl:h-[calc(100vh-136px)] ">
        <div className="flex flex-wrap justify-center  mx-auto w-11/12 ">
        <div className="vertical">
          <div
            className=" w-64  h-64  "
            style={{
              background: `url(${LoadingAnim})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          </div>
          <div className="flex  flex-wrap justify-center w-1/3 ">
            <h1 className=" my-4 p-2 w-full text-center text-xl tracking-wider  rounded-lg ">
              登入開始上傳您的影片
            </h1>
            <div className="flex justify-center my-4 w-2/3  ">
              <label className="vertical mr-4" htmlFor="Email">
                <span>信箱:</span>
              </label>
              <input
                className="pl-2 h-10 border-4 rounded-lg border-[#94bed1] outline-none"
                id="Email"
                placeholder="Email"
                value={userEmail}
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
              />
            </div>
            <div className="flex justify-center my-4 w-2/3">
              <label className="vertical mr-4" htmlFor="Password">
                <span>密碼:</span>
              </label>
              <input
                className="pl-2 h-10 border-4 rounded-lg border-[#94bed1] outline-none"
                id="Password"
                placeholder="Password"
                value={userPassword}
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
              />
            </div>
            <div className="flex justify-center my-4 w-2/3">
              <button
                className="button-blue mx-3 w-28"
                onClick={register}
              >
                {" "}
                註冊
              </button>
              {userID ? (
                <button
                  className="button-red mx-3 w-28"
                  onClick={logout}
                >
                  登出
                </button>
              ) : (
                <button
                  className="button-blue  mx-3 w-28"
                  onClick={login}
                >
                  登入
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
