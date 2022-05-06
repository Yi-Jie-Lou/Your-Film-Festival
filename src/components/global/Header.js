import React, { useEffect, useState } from "react";
import { firebase } from "../../utils/firebase-config";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CubeNavLink,
  SwitchCubeNavLink,
  SwitchReloadData,
  CustomerNavLink,
} from "./CubeNavLink";
import Logo from "../../img/yourFilmLogoA.png";
import CubeA from "../../img/yourFilmCubeA.png";
import CubeB from "../../img/yourFilmCubeB.png";
import CubeC from "../../img/yourFilmCubeC.png";

function TemplateHeader() {
  const state = useSelector((state) => state.state);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="header__container">
        <NavLink to="/">
          <div className="py-2 mx-6 | hidden my-1 | sm:block | md:my-2 ">
            <img className="w-36 | md:w-44 | xl:w-64" src={Logo} />
          </div>
        </NavLink>
          <div onClick={ () => {setIsActive(prev => (!prev)) } } className="w-full py-2 justify-center | flex | sm:hidden">
            <img className="w-36" src={Logo} />
          </div>

        <div
          id="step1"
          className="ml-auto text-center text-1xl | hidden | sm:flex"
        >
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
      <div
        className={`fixed flex flex-col items-center  w-full  ${
          isActive ? "h-full" : "h-0 duration-0"
        }  bg-stone-900/50 z-30 | flex | sm:hidden`}
      >
   
        <div className={`shape w-[94%] ${isActive ? "h-16 delay-[100ms] transition-all  duration-700" : "h-0 duration-0"} bg-[#f4cd7f] rounded-lg  z-50`}></div>
        <div className={`shape vertical w-[94%] ${isActive ? "h-16 delay-[200ms] transition-all  duration-700" : "h-0 duration-0"} bg-[#57bdc8] rounded-lg z-50`}><span className=" text-white text-center text-xl text-shadow-light">最新消息</span></div>
        <div className={`shape w-[94%] ${isActive ? "h-16 delay-[300ms] transition-all  duration-700" : "h-0 duration-0"} bg-[#f4cd7f] rounded-lg  z-50`}></div>
        <div className={`shape w-[94%] ${isActive ? "h-16 delay-[400ms] transition-all  duration-700" : "h-0 duration-0"} bg-[#57bdc8] rounded-lg z-50`}></div>
        <div className={`shape w-[94%] ${isActive ? "h-16 delay-[500ms] transition-all  duration-700" : "h-0 duration-0"} bg-[#f4cd7f] rounded-lg  z-50`}></div>
        <div className={`shape w-[94%] ${isActive ? "h-16 delay-[600ms] transition-all  duration-700" : "h-0 duration-0"} bg-[#57bdc8] rounded-lg z-50`}></div>
        <div className={`shape w-[94%] ${isActive ? "h-16 delay-[700ms] transition-all  duration-700" : "h-0 duration-0"} bg-[#f08074] rounded-lg   z-50`}></div>
      </div>
    </>
  );
}

function BackstageHeader() {
  return (
    <div className="header__container">
      <a href="/">
        <div className="py-2 my-2 mx-6 w-64 rounded text-center text-1xl">
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
      className="header__container"
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
    <div
      style={{
        background: primaryColor,
      }}
      className=" flex fixed top-0 duration-0 w-full my-0 duration-0 mx-auto z-30 rounded-lg "
    >
      <CustomerNavLink router={`/build/festival=${festivalPathName}`}>
        {festivalLogo ? (
          <img className="h-14" src={festivalLogo} />
        ) : (
          "請上傳LOGO"
        )}
      </CustomerNavLink>
      <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
        <CustomerNavLink router={`/build/news/festival=${festivalPathName}`}>
          最新消息
        </CustomerNavLink>
        <CustomerNavLink router={`/build/price/festival=${festivalPathName}`}>
          購票資訊
        </CustomerNavLink>
        <CustomerNavLink
          router={`/build/timetable/festival=${festivalPathName}`}
        >
          場次表
        </CustomerNavLink>
        <CustomerNavLink
          router={`/build/workshop/festival=${festivalPathName}`}
        >
          工作坊
        </CustomerNavLink>
      </div>
    </div>
  );
}

function Header(props) {
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
