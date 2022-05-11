import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import DarkBlueCloudImg from "../img/DarkBlueCloud.png";
import BlueCloudImg from "../img/BlueCloud.png";
import PuzzleImg from "../img/Puzzle.png";
import { customImgAlert, errorAlert } from "../utils/customAlert";
import { useNavigate } from "react-router-dom";
import { auth, firebase } from "../utils/firebase-config";
import { signOut } from "firebase/auth";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import { useSelector, useDispatch } from "react-redux";
import LoadingAnim from "../img/LoadingAnim.gif";
import { isGuide } from "../actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Joyride, { STATUS } from "react-joyride";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.userID);
  const [userEmail, setUserEmail] = useState("newdemo@gmail.com");
  const [userPassword, setUserPassword] = useState("test1234");
  const state = useSelector((state) => state.state);
  const isFirstViewed = useSelector((state) => state.isGuide);
  const steps = [
    {
      title: "Welcome！",
      content: "在這裡您可以建立自己的影展網站！",
      target: "body",
      disableBeacon: true,
      placement: "center",
    },
    {
      title: "Step1",
      content: "請先瀏覽範例網站介面",
      target: "#step1",
      placement: "top",
    },
    {
      title: "Step2",
      content: "登入後開始上傳您的影片！",
      target: "#step2",
      placement: "top",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      dispatch(isGuide(false));
    }
  };

  const handleError = (error) => {
    console.log(error);
    error === "Firebase: Error (auth/wrong-password)."
      ? errorAlert("密碼錯誤", PuzzleImg)
      : "Firebase: Error (auth/invalid-email)."
      ? errorAlert("無效的帳號或密碼", PuzzleImg)
      : errorAlert("登入失敗", PuzzleImg);
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      firebase
        .initDataBase(user.user.uid)
        .then((_) => {
          alert("註冊成功");
        })
        .then((_) => {
          customImgAlert("歡迎您", BlueCloudImg);
          navigate("/backstage");
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

      customImgAlert("歡迎您回來", BlueCloudImg);

      navigate("/backstage");
    } catch (error) {
      handleError(error.message);
    }
  };
  const logout = async () => {
    if (login) {
      await signOut(auth);
      customImgAlert("您已登出囉", DarkBlueCloudImg);
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
          <div id='step2'  className="flex  flex-wrap justify-center w-1/3 ">
            <h1 className=" my-4 p-2 w-full text-center text-xl tracking-wider  rounded-lg ">
              登入開始建立您的影展
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
              <button className="button-blue mx-3 w-28" onClick={register}>
                {" "}
                註冊
              </button>
              {userID ? (
                <button className="button-red mx-3 w-28" onClick={logout}>
                  登出
                </button>
              ) : (
                <button className="button-blue  mx-3 w-28" onClick={login}>
                  登入
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
        {state === "logout" && isFirstViewed ? (
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          continuous={true}
          styles={{
            options: {
              arrowColor: "#fff",
              backgroundColor: "#fff",
              primaryColor: "#f97316",
              textColor: "#000",
              zIndex: 1000,
            },
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Login;
