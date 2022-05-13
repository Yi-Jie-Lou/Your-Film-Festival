import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import "react-image-gallery/styles/css/image-gallery.css";
import ReCAPTCHA from "react-google-recaptcha";
import BlueCloudImg from "../img/BlueCloud.png";
import PuzzleImg from "../img/Puzzle.png";
import { customImgAlert } from "../utils/customAlert";
import { errorAlert } from "../utils/customAlert";

function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPhoneNumber":
      return { ...state, phoneNumber: action.payload };
    default:
      throw new Error();
  }
}

function WorkshopDetails() {
  const workshop = useSelector((state) => state.workshop);
  const currentID = useParams();
  const initialState = { name: "", email: "", phoneNumber: "" };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentWorkshop, setCurrentWorkshop] = useState("");
  const [isRobot, setIsRobot] = useState(true);
  const [isLoaing, setIsLoading] = useState(false);
  console.log(currentWorkshop);

  const handleChange = (value, key) => {
    dispatch({ type: key, payload: value });
  };

  function onChange(value) {
    if (!value) return;
    setIsRobot(false);
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log(state);
    setIsLoading(true)
    const response = await fetch(
      "https://stark-mountain-00642.herokuapp.com/send",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(state),
      }
    ).then((res) => {
      console.log(res.status);

      if (res.status === 200) {
        customImgAlert("您已成功報名活動囉", BlueCloudImg)
        setIsLoading(false)
      } else if (res.status === "fail") {
        errorAlert("出錯了\n請聯繫主辦方", PuzzleImg);
        setIsLoading(false)
      }
    });
  };

  useEffect(() => {
    if (!workshop) return;
    const currentOne = workshop.filter(
      (item) => item.workshopID === currentID.id
    );
    setCurrentWorkshop(...currentOne);
  }, [workshop]);

  return (
    <>
      {isLoaing ? (
        <>
          <div className="fixed top-[50%] h-full w-full bg-none  z-40">
            <div className="loader justify-center p-5 rounded-full flex space-x-3">
              <div className="w-5 h-5 bg-[#f4cd7f] rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-[#57bdc8] rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-[#f08074] rounded-full animate-bounce"></div>
            </div>
          </div>
          <div className="fixed top-0 bg-black w-full h-full z-30 opacity-50"></div>
        </>
      ) : (
        ""
      )}
      <div className="min-h-200">
        <img className="w-full mt-16" src={currentWorkshop?.img} />
        <h1 className="w-11/12 mx-auto mt-16 pb-8 mb-8 border-b-2 border-stone-500 text-center text-2xl tracking-wider">
          {currentWorkshop?.title}
        </h1>
        <div className="mx-auto my-12 w-11/12">
          {currentWorkshop
            ? currentWorkshop.text.split("\n").map((line, index) => (
                <div key={index} className="my-1">
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                </div>
              ))
            : ""}

          <h1
            id="H1"
            className=" w-full mx-auto mt-16 mb-8  text-2xl tracking-wider"
          >
            影人出席
          </h1>
          <div className="flex flex-wrap">
            {currentWorkshop &&
              currentWorkshop.guest.map((img, index) => (
                <img
                  key={index}
                  className="border-0 object-cover  w-48 h-48 rounded-full  mr-4"
                  src={img ? img : ""}
                />
              ))}
          </div>
          <h1 className=" w-full  mx-auto mt-16 mb-8 text-center  text-xl tracking-wider">
            欲參加工作坊請填妥以下資訊：
          </h1>
          {currentWorkshop.name && (
            <Input
              className="input-30"
              attribute="setName"
              value={state.name}
              name="name"
              onChange={handleChange}
            >
              姓名 / Name（必填）
            </Input>
          )}

          {currentWorkshop.email && (
            <Input
              className="input-30"
              attribute="setEmail"
              value={state.email}
              name="email"
              onChange={handleChange}
            >
              信箱 / Email（必填）
            </Input>
          )}

          {currentWorkshop.phone && (
            <Input
              className="input-30"
              attribute="setPhoneNumber"
              value={state.phoneNumber}
              name="phone"
              onChange={handleChange}
            >
              電話 / Phone Number（必填）
            </Input>
          )}

          <div className="flex flex-col  justify-center">
            <ReCAPTCHA
              className="mx-auto my-4"
              sitekey="6Lc9nKAfAAAAAExmB7T7nPKicCC88JPDJBes3Nhi"
              onChange={onChange}
            />
            <div className="mx-auto">
              <button
                onClick={submitEmail}
                className={` ${
                  isRobot
                    ? "pointer-events-none button-gray  "
                    : " button-blue cursor-pointer"
                }  `}
              >
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkshopDetails;
