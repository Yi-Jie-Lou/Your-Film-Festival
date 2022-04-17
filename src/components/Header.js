import React, { useEffect } from "react";
import { firebase } from "../utils/firebase-config";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getState } from "../actions";

function Header(props) {
  const dispatch = useDispatch();
  const userUID = useSelector((state) => state.userID);
  const state = useSelector((state) => state.state);
  const festivalName = useSelector((state) => state.festivalName);
  useEffect(() => {
    dispatch(getState(props.userState));
  }, [props.userState]);

  return (
    <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
      {state === "preview" ? (
        <>
          <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
            <NavLink to="/preview">
              <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
                {festivalName ? festivalName : "Your Film Festival"}
              </div>
            </NavLink>
            <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
              <NavLink to="/preview/news">
                <div className="w-28 py-2  text-center leading-7  text-1xl">
                  最新消息
                </div>
              </NavLink>
              <NavLink to="/preview/price">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  購票資訊
                </div>
              </NavLink>
              <NavLink to="/preview/timetable">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  場次表
                </div>
              </NavLink>
              <NavLink to="/preview/workshop">
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  工作坊
                </div>
              </NavLink>
              <NavLink to="/backstage">
                <div className="w-40 py-2 border-2 rounded text-center text-1xl">
                  回到後台
                </div>
              </NavLink>
              <button
                onClick={() => {
                  userUID
                    ? firebase.buildFestival(userUID)
                    : alert("您好像還沒登入");
                }}
                className="w-40 py-2 border-2 rounded text-center text-1xl"
              >
                Build
              </button>
            </div>
          </div>
        </>
      ) : state === "editing" ? (
        <>
          <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
            <NavLink to="/">
              <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
                Your Film Festival
              </div>
            </NavLink>
            <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
              <NavLink to="/backstage">
                <div className="w-28 py-2  text-center leading-7  text-1xl">
                  影展日期
                </div>
              </NavLink>
              <NavLink to="/backstage/features">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  上傳影片
                </div>
              </NavLink>
              <NavLink to="/backstage/news">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  編輯消息
                </div>
              </NavLink>
              <NavLink to="/backstage/price">
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  售票資訊
                </div>
              </NavLink>
              <NavLink to="/backstage/workshop">
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  新增工作坊
                </div>
              </NavLink>
              <NavLink to="/preview/timetable">
                <div className="w-40 py-2 border-2 rounded text-center text-1xl">
                  Preview
                </div>
              </NavLink>
            </div>
          </div>
        </>
      ) : state === "login" ? (
        <>
          <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
            <NavLink to="/">
              <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
                Your Film Festival
              </div>
            </NavLink>
            <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
              <NavLink to="/news">
                <div className="w-28 py-2  text-center leading-7  text-1xl">
                  最新消息
                </div>
              </NavLink>
              <NavLink to="/price">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  購票資訊
                </div>
              </NavLink>
              <NavLink to="/timetable">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  場次表
                </div>
              </NavLink>
              <NavLink to="/workshop">
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  工作坊
                </div>
              </NavLink>
              <NavLink to="/backstage">
                <div className="w-40 py-2 border-2 rounded text-center text-1xl">
                  進入後台
                </div>
              </NavLink>
            </div>
          </div>
        </>
      ) : state === "build" ? (
        <>
          <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
            <NavLink to={`/festival=${festivalName}`}>
              <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
                {festivalName ? festivalName : "Your Film Festival"}
              </div>
            </NavLink>
            <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
              <NavLink to={`/news/festival=${festivalName}`}>
                <div className="w-28 py-2  text-center leading-7  text-1xl">
                  最新消息
                </div>
              </NavLink>
              <NavLink to={`/price/festival=${festivalName}`}>
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  購票資訊
                </div>
              </NavLink>
              <NavLink to={`/timetable/festival=${festivalName}`}>
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  場次表
                </div>
              </NavLink>
              <NavLink to={`/workshop/festival=${festivalName}`}>
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  工作坊
                </div>
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
            <NavLink to="/">
              <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
                Your Film Festival
              </div>
            </NavLink>
            <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
              <NavLink to="/news">
                <div className="w-28 py-2  text-center leading-7  text-1xl">
                  最新消息
                </div>
              </NavLink>
              <NavLink to="/price">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  購票資訊
                </div>
              </NavLink>
              <NavLink to="/timetable">
                <div className="w-28 py-2  text-center leading-7 text-1xl">
                  場次表
                </div>
              </NavLink>
              <NavLink to="/workshop">
                <div className="w-28 py-2 text-center leading-7 text-1xl">
                  工作坊
                </div>
              </NavLink>
              <NavLink to="/login">
                <div className="w-40 py-2 border-2 rounded text-center text-1xl">
                  登入客製化
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
