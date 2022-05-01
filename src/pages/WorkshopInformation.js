import React, { useEffect, useState, useReducer } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import "react-image-gallery/styles/css/image-gallery.css";
import ReCAPTCHA from "react-google-recaptcha";


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

function WorkshopContainer() {
  const workshop = useSelector((state) => state.workshop);
  const currentID = useParams();
  const initialState = { name: "", email: "", phoneNumber: "" };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentWorkshop, setCurrentWorkshop] = useState("");
  const [isRobot, setIsRobot] = useState(true);


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
    const response = await fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(state),
    }).then((res) => {
      console.log(res);
      if (res.status === "success") {
        alert("Message Sent");
      } else if (res.status === "fail") {
        alert("Message failed to send");
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
    <div className="min-h-200">
   
      <img className="w-full mt-24" src={currentWorkshop?.img} />
      <h1 className="w-11/12 mx-auto mt-16 pb-8 mb-8 border-b-2 border-stone-700 text-center text-2xl tracking-wider">
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
   
        <h1 id="H1" className=" w-full mx-auto mt-16 mb-8  text-2xl tracking-wider">
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
        <h1 className=" w-full mx-auto mt-16 mb-8 text-center  text-xl tracking-wider">
          欲參加工作坊請填妥以下資訊：
        </h1>
        <Input
          className="input-30"
          attribute="setName"
          value={state.name}
          name="name"
          onChange={handleChange}
        >
          姓名 / Name（必填）
        </Input>
        <Input
          className="input-30"
          attribute="setEmail"
          value={state.email}
          name="email"
          onChange={handleChange}
        >
          信箱 / Email（必填）
        </Input>
        <Input
          className="input-30"
          attribute="setPhoneNumber"
          value={state.phoneNumber}
          name="phone"
          onChange={handleChange}
        >
          電話 / Phone Number（必填）
        </Input>

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
  );
}

function WorkshopInformation(props) {
  return (
    <>
      <Header userState={props.userState} />
      <WorkshopContainer />
      <Footer />
    </>
  );
}

export default WorkshopInformation;
