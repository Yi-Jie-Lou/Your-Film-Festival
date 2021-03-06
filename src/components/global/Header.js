import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import propTypes from 'prop-types';
import {
  CubeNavLink,
  SwitchCubeNavLink,
  CustomerNavLink,
  MobileNavLink,
  LoginTemplateLink,
  LoginBackstageLink,
  MobileTemplateLink,
  MobileBuild,
} from './CubeNavLink';
import { firebase } from '../../utils/firebase-config';
import { errorAlert } from '../../utils/customAlert';
import Logo from '../../img/yourFilmLogoA.png';
import CubeA from '../../img/yourFilmCubeA.png';
import CubeB from '../../img/yourFilmCubeB.png';
import CubeC from '../../img/yourFilmCubeC.png';
import PuzzleImg from '../../img/Puzzle.png';

function TemplateHeader() {
  const path = useParams();
  const state = useSelector((state) => state.state);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(false);
  }, [path]);

  return (
    <>
      <div className="header__container border-b-0 rounded-b-none justify-between">
        <NavLink to="/">
          <div className="py-2 mx-6 | hidden my-1 | sm:block sm:my-2 ">
            <img className="w-48 | lg:w-64" src={Logo} />
          </div>
        </NavLink>
        <div
          onClick={() => {
            setIsActive((prev) => !prev);
          }}
          className="w-full h-[67px] border-b-2 py-2 justify-center | flex | sm:hidden"
        >
          <img className="h-full" src={Logo} />
        </div>

        <div
          className={`fixed flex top-[67px] left-0 flex-col items-center  w-full  ${
            isActive ? 'h-full z-30' : 'h-0 duration-0 z-0'
          }  bg-stone-900/50  | flex | sm:hidden`}
        >
          <MobileTemplateLink
            isActive={isActive}
            router={`/build/festival=YourFilmFestival`}
            color="#57bdc8"
            className={
              isActive
                ? 'h-16 delay-[100ms] transition-all  duration-700'
                : 'h-0 duration-0'
            }
          >
            範例網站
          </MobileTemplateLink>
          {state === 'logout' ? (
            <MobileNavLink
              isActive={isActive}
              router={`/`}
              color="#f4cd7f"
              className={
                isActive
                  ? 'h-16 delay-[200ms] transition-all  duration-700'
                  : 'h-0 duration-0'
              }
            >
              請先登入
            </MobileNavLink>
          ) : state === 'login' ? (
            <MobileNavLink
              isActive={isActive}
              router={`/backstage`}
              color="#f4cd7f"
              className={
                isActive
                  ? 'h-16 delay-[200ms] transition-all  duration-700'
                  : 'h-0 duration-0'
              }
            >
              進入後台
            </MobileNavLink>
          ) : (
            <MobileNavLink
              isActive={isActive}
              router={`/`}
              color="#f4cd7f"
              className={
                isActive
                  ? 'h-16 delay-[200ms] transition-all  duration-700'
                  : 'h-0 duration-0'
              }
            >
              Loading...
            </MobileNavLink>
          )}
        </div>

        <div className="ml-auto text-center text-1xl | hidden | sm:flex">
          <LoginTemplateLink
            router="/build/festival=YourFilmFestival"
            id="step1"
            cube={CubeB}
          >
            範例網站
          </LoginTemplateLink>

          {state === 'logout' ? (
            <LoginBackstageLink router="/" cube={CubeC}>
              請先登入
            </LoginBackstageLink>
          ) : state === 'login' ? (
            <LoginBackstageLink router="/backstage" cube={CubeC}>
              進入後台
            </LoginBackstageLink>
          ) : (
            <LoginBackstageLink router="/" cube={CubeC}>
              Loading...
            </LoginBackstageLink>
          )}
        </div>
      </div>
      <div
        className={`fixed flex top-[67px] left-0 flex-col items-center  w-full  ${
          isActive ? 'h-full' : 'h-0 duration-0 z-0'
        }  bg-stone-900/50  | flex | sm:hidden`}
      ></div>
    </>
  );
}

function BackstageHeader() {
  const [isActive, setIsActive] = useState(false);
  const path = useParams();

  useEffect(() => {
    setIsActive(false);
  }, [path]);

  return (
    <div className="header__container border-b-0 rounded-b-none justify-between">
      <div
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
        className="w-full h-[67px] border-b-2 py-2 justify-center | flex | md:hidden"
      >
        <img className=" h-full" src={Logo} />
      </div>

      <div
        className={`fixed flex top-[67px] left-0 flex-col items-center  w-full  ${
          isActive ? 'h-full z-30' : 'h-0 duration-0 z-0'
        }  bg-stone-900/50  | flex | md:hidden`}
      >
        <MobileNavLink
          isActive={isActive}
          router="/"
          color="#f4cd7f"
          className={
            isActive
              ? 'h-16 delay-[100ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          回到登入頁面
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/backstage"
          color="#57bdc8"
          className={
            isActive
              ? 'h-16 delay-[200ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          影展日期
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/backstage/features"
          color="#f4cd7f"
          className={
            isActive
              ? 'h-16 delay-[300ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          上傳影片
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/backstage/news"
          color="#57bdc8"
          className={
            isActive
              ? 'h-16 delay-[400ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          編輯消息
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/backstage/price"
          color="#f4cd7f"
          className={
            isActive
              ? 'h-16 delay-[500ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          售票資訊
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/backstage/workshop"
          color="#57bdc8"
          className={
            isActive
              ? 'h-16 delay-[600ms] transition-all  duration-700 '
              : 'h-0 duration-0'
          }
        >
          新增工作坊
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/backstage/edit-footer-color"
          color="#f4cd7f"
          className={
            isActive
              ? 'h-16 delay-[700ms] transition-all  duration-700 '
              : 'h-0 duration-0'
          }
        >
          自訂顏色
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/preview"
          color="#f08074"
          className={
            isActive
              ? 'h-16 delay-[800ms] transition-all  duration-700 '
              : 'h-0 duration-0'
          }
        >
          預覽網站
        </MobileNavLink>
      </div>

      <NavLink to="/">
        <div className="py-2 mx-6 | hidden my-1 | md:block | md:my-2 ">
          <img className="w-36 | md:w-44 | xl:w-64" src={Logo} />
        </div>
      </NavLink>

      <div className="hidden md:flex ml-auto text-center text-xl">
        <CubeNavLink
          router="/backstage"
          className="sm:text-sm | lg:text-base | lg:w-24 | xl:w-28"
          cube={CubeB}
        >
          影展日期
        </CubeNavLink>
        <CubeNavLink
          router="/backstage/features"
          className="sm:text-sm | lg:text-base | lg:w-24 | xl:w-28"
          cube={CubeC}
        >
          上傳影片
        </CubeNavLink>
        <CubeNavLink
          router="/backstage/news"
          className="sm:text-sm | lg:text-base | lg:w-24 | xl:w-28"
          cube={CubeB}
        >
          編輯消息
        </CubeNavLink>
        <CubeNavLink
          router="/backstage/price"
          className="sm:text-sm | lg:text-base | lg:w-24 | xl:w-28"
          cube={CubeC}
        >
          售票資訊
        </CubeNavLink>
        <CubeNavLink
          router="/backstage/workshop"
          className="sm:text-sm | lg:text-base | lg:w-24 | xl:w-28"
          cube={CubeB}
        >
          新增工作坊
        </CubeNavLink>
        <CubeNavLink
          router="/backstage/edit-footer-color"
          className="sm:text-sm | lg:text-base | lg:w-24 | xl:w-28"
          cube={CubeC}
        >
          自訂顏色
        </CubeNavLink>
        <SwitchCubeNavLink router="/preview" cube={CubeA}>
          預覽網站
        </SwitchCubeNavLink>
      </div>
    </div>
  );
}

function PreviewHeader() {
  const userUID = useSelector((state) => state.userID);
  const secondaryColor = useSelector((state) => state.secondaryColor);
  const festivalLogo = useSelector((state) => state.festivalLogo);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const primaryColor = useSelector((state) => state.primaryColor);
  const textColor = useSelector((state) => state.textColor);
  const [isActive, setIsActive] = useState(false);
  const path = useParams();

  useEffect(() => {
    setIsActive(false);
  }, [path]);

  return (
    <div
      style={{
        background: primaryColor,
        color: textColor,
      }}
      className="header__container border-b-0 rounded-b-none justify-between"
    >
      <CustomerNavLink router="/preview">
        {festivalLogo ? (
          <img
            className="h-16 ml-2 py-2 mx-6 | hidden my-1 | md:block | md:my-2 "
            src={festivalLogo}
          />
        ) : (
          '請上傳LOGO'
        )}
      </CustomerNavLink>

      <div
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
        className="w-full h-[67px] py-2 justify-center | flex | md:hidden"
      >
        <img className=" h-full" src={festivalLogo} />
      </div>

      <div
        className={`fixed flex top-[67px] left-0 flex-col items-center  w-full  ${
          isActive ? 'h-full z-30' : 'h-0 duration-0 z-0'
        }  bg-stone-900/50  | flex | md:hidden`}
      >
        <MobileNavLink
          isActive={isActive}
          router="/preview"
          color={`${secondaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[100ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          首頁
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/preview/news"
          color={`${primaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[200ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          最新消息
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/preview/price"
          color={`${secondaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[300ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          購票資訊
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/preview/timetable"
          color={`${primaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[400ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          場次表
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/preview/workshop"
          color={`${secondaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[500ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          工作坊
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router="/backstage/features"
          color="#57bdc8"
          className={
            isActive
              ? 'h-16 delay-[100ms] transition-all  duration-700 '
              : 'h-0 duration-0'
          }
        >
          回到後台
        </MobileNavLink>
        <MobileBuild
          color="#f08074"
          onClick={() => {
            userUID
              ? firebase.buildFestival(userUID, festivalPathName)
              : errorAlert('您好像還沒登入', PuzzleImg);
          }}
          isActive={isActive}
          className={
            isActive
              ? 'h-16 delay-[700ms] transition-all duration-700'
              : 'h-0 duration-0'
          }
        >
          建立網站
        </MobileBuild>
      </div>

      <div className=" h-[48px]  my-6 mr-4 ml-auto  text-center text-1xl | hidden | md:flex ">
        <CustomerNavLink router="/preview/news">最新消息</CustomerNavLink>
        <CustomerNavLink router="/preview/price">購票資訊</CustomerNavLink>
        <CustomerNavLink router="/preview/timetable">場次表</CustomerNavLink>
        <CustomerNavLink router="/preview/workshop">工作坊</CustomerNavLink>
        <NavLink className="vertical mx-2" to="/backstage/features">
          <div className="vertical button-blue border-2 py-2  text-center text-1xl w-32 | xl:w-40">
            <span>回到後台</span>
          </div>
        </NavLink>

        <div className="vertical mx-2 ">
          <button
            onClick={() => {
              userUID
                ? firebase.buildFestival(userUID, festivalPathName)
                : errorAlert('您好像還沒登入', PuzzleImg);
            }}
            className="flex justify-center border-2 items-center button-red text-center text-1xl w-32 | xl:w-40"
          >
            <span className="text-center">建立網站</span>
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
  const textColor = useSelector((state) => state.textColor);
  const secondaryColor = useSelector((state) => state.secondaryColor);
  const [isActive, setIsActive] = useState(false);
  const path = useParams();

  useEffect(() => {
    setIsActive(false);
  }, [path]);

  return (
    <div
      style={{
        background: primaryColor,
        color: textColor,
      }}
      className="header__container border-b-0 rounded-b-none  justify-between"
    >
      <div
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
        className="w-full h-[67px] py-2 justify-center | flex | md:hidden"
      >
        <img className=" h-full" src={festivalLogo} />
      </div>

      <div
        className={`fixed flex top-[67px] left-0 flex-col items-center  w-full  ${
          isActive ? 'h-full z-30' : 'h-0 duration-0 z-0'
        }  bg-stone-900/50  | flex | md:hidden`}
      >
        <MobileNavLink
          isActive={isActive}
          router={`/build/festival=${festivalPathName}`}
          color={`${secondaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[100ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          首頁
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router={`/build/news/festival=${festivalPathName}`}
          color={`${primaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[200ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          最新消息
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router={`/build/price/festival=${festivalPathName}`}
          color={`${secondaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[300ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          購票資訊
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router={`/build/timetable/festival=${festivalPathName}`}
          color={`${primaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[400ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          場次表
        </MobileNavLink>
        <MobileNavLink
          isActive={isActive}
          router={`/build/workshop/festival=${festivalPathName}`}
          color={`${secondaryColor}`}
          className={
            isActive
              ? 'h-16 delay-[500ms] transition-all  duration-700'
              : 'h-0 duration-0'
          }
        >
          工作坊
        </MobileNavLink>
      </div>

      <CustomerNavLink router={`/build/festival=${festivalPathName}`}>
        {festivalLogo ? (
          <img
            className="h-16 ml-2  | hidden my-1 | md:block | md:my-2"
            src={festivalLogo}
          />
        ) : (
          '請上傳LOGO'
        )}
      </CustomerNavLink>
      <div className="h-[48px]  my-6 mr-4 ml-auto  text-center text-1xl | hidden | md:flex">
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

function Header({ userState }) {
  const [pageState, setPageState] = useState(userState);

  useEffect(() => {
    setPageState(userState);
  }, [userState]);

  return (
    <>
      {pageState === 'preview' ? (
        <PreviewHeader />
      ) : pageState === 'editing' ? (
        <BackstageHeader />
      ) : pageState === 'build' ? (
        <BuildHeader />
      ) : (
        <TemplateHeader />
      )}
    </>
  );
}

Header.propTypes = {
  userState: propTypes.oneOf(['preview', 'editing', 'build', 'login', '']),
};

export default Header;
