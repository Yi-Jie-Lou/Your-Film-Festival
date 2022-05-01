import React, { useEffect } from "react";
import { firebase } from "../utils/firebase-config";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../actions";
import Logo from "../img/yourFilmLogoA.png";
import CubeA from "../img/yourFilmCubeA.png";
import CubeB from "../img/yourFilmCubeB.png";
import CubeC from "../img/yourFilmCubeC.png";

function Header(props) {
  const dispatch = useDispatch();
  const userUID = useSelector((state) => state.userID);
  const state = useSelector((state) => state.state);
  const festivalLogo = useSelector((state) => state.festivalLogo);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  useEffect(() => {
    dispatch(updateState(props.userState));
  }, [props.userState]);

  return (
    <div className=" flex fixed left-0 top-0 w-full my-0 mx-auto z-20 border-2 rounded-lg bg-neutral-300">
      {state === "preview" ? (
        <>
          <div className=" flex fixed left-0 top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
            <NavLink className="vertical" to="/preview">
              <div className="py-1 my-4 mx-6 rounded text-center text-1xl">
                {festivalPathName ? (
                  <img className="h-14" src={festivalLogo} />
                ) : (
                  "請上傳LOGO"
                )}
              </div>
            </NavLink>
            <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
              <NavLink className="vertical" to="/preview/news">
                <div className="w-28 py-2  text-center leading-7  text-1xl">
                  最新消息
                </div>
              </NavLink>
              <NavLink className="vertical" to="/preview/price">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  購票資訊
                </div>
              </NavLink>
              <NavLink className="vertical" to="/preview/timetable">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  場次表
                </div>
              </NavLink>
              <NavLink className="vertical" to="/preview/workshop">
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  工作坊
                </div>
              </NavLink>
              <NavLink className="vertical mx-2" to="/backstage/features">
                <div className="w-40 py-2 border-2 rounded-xl text-center text-1xl bg-amber-400">
                  回到後台
                </div>
              </NavLink>
              <div className="vertical mx-2 ">
                <button
                  onClick={() => {
                    userUID
                      ? firebase.buildFestival(userUID, festivalPathName)
                      : alert("您好像還沒登入");
                  }}
                  className="w-40 py-2 border-2 text-center text-1xl rounded-xl bg-red-400"
                >
                  Build
                </button>
              </div>
            </div>
          </div>
        </>
      ) : state === "editing" ? (
        <>
          <div className=" flex fixed top-0 left-0 w-full my-0 mx-auto z-10 rounded-lg bg-white">
            <NavLink to="/">
              <div className=" py-2  my-2 mx-6 w-64 rounded text-center text-1xl">
                <img src={Logo} />
              </div>
            </NavLink>

            <div className="flex ml-auto  text-center text-1xl">
              <NavLink to="/backstage">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeB} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    影展日期
                  </span>
                </div>
              </NavLink>
              <NavLink to="/backstage/features">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeC} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    上傳影片
                  </span>
                </div>
              </NavLink>
              <NavLink to="/backstage/news">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeB} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    編輯消息
                  </span>
                </div>
              </NavLink>
              <NavLink to="/backstage/price">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeC} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    售票資訊
                  </span>
                </div>
              </NavLink>
              <NavLink to="/backstage/workshop">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeB} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    新增工作坊
                  </span>
                </div>
              </NavLink>

              <NavLink to="/backstage/edit-footer-color">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeC} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    自訂顏色
                  </span>
                </div>
              </NavLink>
              <NavLink to="/preview">
                <div className="relative top-[-10px] w-40   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeA} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    Preview
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
        </>
      ) : state === "login" ? (
        <>
          <div className=" flex fixed top-0 left-0 w-full my-0  z-10 rounded-lg bg-white">
            <NavLink to="/">
              <div className=" py-2  my-2 mx-6 w-64 rounded text-center text-1xl">
                <img src={Logo} />
              </div>
            </NavLink>
            <div id="step1" className="flex ml-auto  text-center text-1xl">
              <NavLink to="/news">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeB} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    最新消息
                  </span>
                </div>
              </NavLink>
              <NavLink to="/price">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeC} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    購票資訊
                  </span>
                </div>
              </NavLink>
              <NavLink to="/timetable">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeB} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    場次表
                  </span>
                </div>
              </NavLink>
              <NavLink to="/workshop">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeC} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    工作坊
                  </span>
                </div>
              </NavLink>
              <NavLink to="/backstage">
                <div
                  id="step2"
                  className="relative top-[-10px] w-40    text-center leading-7  text-1xl hover:top-[0px]  "
                >
                  <img src={CubeA} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider ">
                    進入後台
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
        </>
      ) : state === "build" ? (
        <>
          <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
            <NavLink to={`/festival=${festivalPathName}`}>
              <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
                {festivalPathName ? festivalPathName : "Your Film Festival"}
              </div>
            </NavLink>
            <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
              <NavLink to={`/news/festival=${festivalPathName}`}>
                <div className="w-28 py-2  text-center leading-7  text-1xl">
                  最新消息
                </div>
              </NavLink>
              <NavLink to={`/price/festival=${festivalPathName}`}>
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  購票資訊
                </div>
              </NavLink>
              <NavLink to={`/timetable/festival=${festivalPathName}`}>
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  場次表
                </div>
              </NavLink>
              <NavLink to={`/workshop/festival=${festivalPathName}`}>
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  工作坊
                </div>
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" flex fixed top-0 left-0 w-full my-0  z-10 rounded-lg bg-white">
            <NavLink to="/">
              <div className=" py-2  my-2 mx-6 w-64 rounded text-center text-1xl">
                <img src={Logo} />
              </div>
            </NavLink>
            <div id="step1" className="flex  ml-auto  text-center text-1xl">
              <NavLink to="/news">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeB} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    最新消息
                  </span>
                </div>
              </NavLink>
              <NavLink to="/price">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeC} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    購票資訊
                  </span>
                </div>
              </NavLink>
              <NavLink to="/timetable">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeB} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    場次表
                  </span>
                </div>
              </NavLink>
              <NavLink to="/workshop">
                <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
                  <img src={CubeC} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    工作坊
                  </span>
                </div>
              </NavLink>
              <NavLink to="/login">
                <div
                  id="step2"
                  className="relative top-[-10px] w-40   text-center leading-7  text-1xl hover:top-[0px]"
                >
                  <img src={CubeA} />
                  <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
                    登入客製化
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
