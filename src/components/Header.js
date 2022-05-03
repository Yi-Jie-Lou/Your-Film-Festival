import React, { useEffect, useState } from "react";
import { firebase } from "../utils/firebase-config";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CubeNavLink,
  SwitchCubeNavLink,
  SwitchReloadData,
  CustomerNavLink,
} from "./CubeNavLink";
import Logo from "../img/yourFilmLogoA.png";
import CubeA from "../img/yourFilmCubeA.png";
import CubeB from "../img/yourFilmCubeB.png";
import CubeC from "../img/yourFilmCubeC.png";

function TemplateHeader() {
  const state = useSelector((state) => state.state);

  return (
    <div className=" flex fixed top-0 left-0 w-full my-0  z-30 rounded-lg bg-white cursor-pointer">
      <NavLink to="/">
        <div className=" py-2  my-2 mx-6 w-64 rounded text-center text-1xl">
          <img src={Logo} />
        </div>
      </NavLink>
      <div id="step1" className="flex  ml-auto  text-center text-1xl">
        <CubeNavLink router="/news" cube={CubeB}>
          最新消息
        </CubeNavLink>
        <CubeNavLink router="/price" cube={CubeC}>
          購票資訊
        </CubeNavLink>
        <CubeNavLink router="/timetable" cube={CubeB}>
          場次表
        </CubeNavLink>
        <CubeNavLink router="/workshop" cube={CubeC}>
          工作坊
        </CubeNavLink>

        {state === "logout" ? (
          <SwitchCubeNavLink router="/login" id="step2" cube={CubeA}>
            登入客製化
          </SwitchCubeNavLink>
        ) : state === "login" ? (
          <SwitchReloadData router="/backstage" id="step2" cube={CubeA}>
            進入後台
          </SwitchReloadData>
        ) : (
          <SwitchCubeNavLink router="/login" id="step2" cube={CubeA}>
            Loading...
          </SwitchCubeNavLink>
        )}
      </div>
    </div>
  );
}

function BackstageHeader() {
  return (
    <div className=" flex fixed top-0 left-0 w-full my-0 mx-auto z-30 rounded-lg bg-white cursor-pointer">
      <a href="/">
        <div className=" py-2  my-2 mx-6 w-64 rounded text-center text-1xl">
          <img src={Logo} />
        </div>
      </a>

      <div className="flex ml-auto  text-center text-1xl">
        <CubeNavLink router="/backstage" cube={CubeB}>
          影展日期
        </CubeNavLink>
        <CubeNavLink router="/backstage/features" cube={CubeC}>
          上傳影片
        </CubeNavLink>
        <CubeNavLink router="/backstage/news" cube={CubeB}>
          編輯消息
        </CubeNavLink>
        <CubeNavLink router="/backstage/price" cube={CubeC}>
          售票資訊
        </CubeNavLink>
        <CubeNavLink router="/backstage/workshop" cube={CubeB}>
          新增工作坊
        </CubeNavLink>
        <CubeNavLink router="/backstage/edit-footer-color" cube={CubeC}>
          自訂顏色
        </CubeNavLink>
        <SwitchCubeNavLink router="/preview" id="preview" cube={CubeA}>
          Preview
        </SwitchCubeNavLink>
      </div>
    </div>
  );
}

function PreviewHeader() {
  const userUID = useSelector((state) => state.userID);
  const festivalLogo = useSelector((state) => state.festivalLogo);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const primaryColor = useSelector((state) => state.primaryColor);

  return (
    <div
      style={{
        background: primaryColor,
      }}
      className=" flex fixed left-0 top-0 w-full my-0 mx-auto z-30 rounded-lg "
    >
      <CustomerNavLink router="/preview">
        {festivalLogo ? (
          <img className="h-14" src={festivalLogo} />
        ) : (
          "請上傳LOGO"
        )}
      </CustomerNavLink>
      <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
        <CustomerNavLink router="/preview/news">最新消息</CustomerNavLink>
        <CustomerNavLink router="/preview/price">購票資訊</CustomerNavLink>
        <CustomerNavLink router="/preview/timetable">場次表</CustomerNavLink>
        <CustomerNavLink router="/preview/workshop">工作坊</CustomerNavLink>
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
  );
}

function BuildHeader() {
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const festivalLogo = useSelector((state) => state.festivalLogo);
  const primaryColor = useSelector((state) => state.primaryColor);
  
  return (
    <div   style={{
      background: primaryColor,
    }} className=" flex fixed top-0 w-full my-0 mx-auto z-30 border-2 rounded-lg ">

      <CustomerNavLink router={`/festival=${festivalPathName}`}>
        {festivalLogo ? (
          <img className="h-14" src={festivalLogo} />
        ) : (
          "請上傳LOGO"
        )}
      </CustomerNavLink>
      <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
        <CustomerNavLink router={`/news/festival=${festivalPathName}`}>
          最新消息
        </CustomerNavLink>
        <CustomerNavLink router={`/price/festival=${festivalPathName}`}>
          購票資訊
        </CustomerNavLink>
        <CustomerNavLink router={`/timetable/festival=${festivalPathName}`}>
          場次表
        </CustomerNavLink>
        <CustomerNavLink router={`/workshop/festival=${festivalPathName}`}>
          工作坊
        </CustomerNavLink>
      </div>
    </div>
  );
}

function Header(props) {
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState(props.userState);

  useEffect(() => {
    setPageState(props.userState);
  }, [props.userState]);

  return (
    <>
      {pageState === "preview" ? (
        <PreviewHeader />
      ) : pageState === "editing" ? (
        <BackstageHeader />
      ) : pageState === "build" ? (
        <BuildHeader />
      ) : (
        <TemplateHeader />
      )}
    </>
  );
}

export default Header;
