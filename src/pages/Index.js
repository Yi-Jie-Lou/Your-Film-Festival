import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePrice, isGuide } from "../actions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IndexContainer from "../components/IndexContainer";
import Joyride, { STATUS } from "react-joyride";

function Index(props) {
  const dispatch = useDispatch();
  const isFirstViewed = useSelector((state) => state.isGuide);
  const steps = [
    {
      title: "Step1",
      content: "歡迎",
      target: "#step1",
      disableBeacon: true,
      placement: "top",
    },
    {
      title: "Step2",
      content: "瀏覽範例網站介面",
      target: "#step2",
      placement: "top",
    },
    {
      title: "Step3",
      content: "登入開始上傳影片",
      target: "#step3",
      placement: "top",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      dispatch(isGuide(false));

      
    }
  };

  // useEffect(()=>{

  //
  // },[])

  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      {isFirstViewed ? (
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          continuous={true}
        />
      ) : (
        ""
      )}

      <IndexContainer />
      <Footer userState={props.userState} />
    </>
  );
}

export default Index;
