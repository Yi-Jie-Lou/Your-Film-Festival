import React, { useEffect, useState } from "react";
import { firebase } from "../utils/firebase-config";

function Header(props) {
  const [userState, setUserState] = useState(null);
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    setUserState(props.userState);
    // console.log(props.userState);
  }, [props.userState]);

  useEffect(() => {
    setUserUID(props.userUID);
  }, [props.userUID]);

  return (
    <div className=" flex fixed top-0 w-full my-0 mx-auto z-10 border-2 rounded-lg bg-neutral-300">
      <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
        <a href="/">Your Film Festival</a>
      </div>
      <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
        {userState === "preview" ? (
          <>
            <div className="w-28 py-2  text-center leading-7  text-1xl">
              <a href="/preview/news">最新消息</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/preview/price">購票資訊</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/preview/timetable">場次表</a>
            </div>
            <div className="w-28 py-2 text-center leading-7 text-1xl">
              <a href="/preview/workshop">工作坊</a>
            </div>
            <div className="w-40 py-2 border-2 rounded text-center text-1xl">
              <a href="/backstage">回到後台</a>
            </div>
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
          </>
        ) : userState === "editing" ? (
          <>
            <div className="w-28 py-2  text-center leading-7  text-1xl">
              <a href="/backstage">影展日期</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/backstage/features">上傳影片</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/backstage/news">編輯消息</a>
            </div>
            <div className="w-28 py-2 text-center leading-7 text-1xl">
              <a href="/backstage/price">售票資訊</a>
            </div>
            <div className="w-28 py-2 text-center leading-7 text-1xl">
              <a href="/backstage/workshop">新增工作坊</a>
            </div>
            <div className="w-40 py-2 border-2 rounded text-center text-1xl">
              <a href="/preview/timetable">Preview</a>
            </div>
          </>
        ) : userState === "login" ? (
          <>
            <div className="w-28 py-2  text-center leading-7  text-1xl">
              <a href="/news">最新消息</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/price">購票資訊</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/timetable">場次表</a>
            </div>
            <div className="w-28 py-2 text-center leading-7 text-1xl">
              <a href="/workshop">工作坊</a>
            </div>
            <div className="w-40 py-2 border-2 rounded text-center text-1xl">
              <a href="/backstage">進入後台</a>
            </div>
          </>
        ) : userState === "build" ? (
          <>
            <div className="w-28 py-2  text-center leading-7  text-1xl">
              <a href="/news">最新消息</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/price">購票資訊</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/timetable">場次表</a>
            </div>
            <div className="w-28 py-2 text-center leading-7 text-1xl">
              <a href="/workshop">工作坊</a>
            </div>
          </>
        ) : (
          <>
            <div className="w-28 py-2  text-center leading-7  text-1xl">
              <a href="/news">最新消息</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/price">購票資訊</a>
            </div>
            <div className="w-28 py-2  text-center leading-7 text-1xl">
              <a href="/timetable">場次表</a>
            </div>
            <div className="w-28 py-2 text-center leading-7 text-1xl">
              <a href="/workshop">工作坊</a>
            </div>
            <div className="w-40 py-2 border-2 rounded text-center text-1xl">
              <a href="/login">登入客製化</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
