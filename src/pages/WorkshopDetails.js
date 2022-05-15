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
import Logo from "../img/yourFilmLogoA.png";

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
  const festivalLogo = useSelector((state) => state.festivalLogo);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const hostEmail = useSelector((state) => state.userEmail);
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

  const generateMailContent = (title, content, img) => {
    const emailContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title> galliot-how to select a software </title>
        <meta http-equiv="x-ua-compatible" content="IE=edge">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> 
      <style type="text/css">
        #outlook a{
          padding:0;
        }
        body{
          margin:0;
          padding:0;
          -webkit-text-size-adjust:100%;
          -ms-text-size-adjust:100%;
        }
        table,td{
          border-collapse:collapse;
          mso-table-lspace:0;
          mso-table-rspace:0;
        }
        img{
          border:0;
          height:auto;
          line-height:100%;
          outline:none;
          text-decoration:none;
          -ms-interpolation-mode:bicubic;
        }
        p{
          display:block;
          margin:13px 0;
        }
        #outlook a{
          padding:0;
        }
        body{
          margin:0;
          padding:0;
          -webkit-text-size-adjust:100%;
          -ms-text-size-adjust:100%;
        }
        table,td{
          border-collapse:collapse;
          mso-table-lspace:0;
          mso-table-rspace:0;
        }
        img{
          border:0;
          height:auto;
          line-height:100%;
          outline:none;
          text-decoration:none;
          -ms-interpolation-mode:bicubic;
        }
        p{
          display:block;
          margin:13px 0;
        }
        #outlook a{
          padding:0;
        }
        body{
          margin:0;
          padding:0;
          -webkit-text-size-adjust:100%;
          -ms-text-size-adjust:100%;
        }
        table,td{
          border-collapse:collapse;
          mso-table-lspace:0;
          mso-table-rspace:0;
        }
        img{
          border:0;
          height:auto;
          line-height:100%;
          outline:none;
          text-decoration:none;
          -ms-interpolation-mode:bicubic;
        }
        p{
          display:block;
          margin:13px 0;
        }
      @media only screen and (min-width:480px){
        .mj-column-per-100{
          width:100% !important;
          max-width:100%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-px-570{
          width:570px !important;
          max-width:570px;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-px-120{
          width:120px !important;
          max-width:120px;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-30{
          width:30% !important;
          max-width:30%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-45{
          width:45% !important;
          max-width:45%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-28{
          width:28% !important;
          max-width:28%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-38{
          width:38% !important;
          max-width:38%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-20{
          width:20% !important;
          max-width:20%;
        }
    
    }		#outlook a{
          padding:0;
        }
        body{
          margin:0;
          padding:0;
          -webkit-text-size-adjust:100%;
          -ms-text-size-adjust:100%;
        }
        table,td{
          border-collapse:collapse;
          mso-table-lspace:0;
          mso-table-rspace:0;
        }
        img{
          border:0;
          height:auto;
          line-height:100%;
          outline:none;
          text-decoration:none;
          -ms-interpolation-mode:bicubic;
        }
        p{
          display:block;
          margin:13px 0;
        }
      @media only screen and (min-width:480px){
        .mj-column-per-100{
          width:100% !important;
          max-width:100%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-px-570{
          width:570px !important;
          max-width:570px;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-px-120{
          width:120px !important;
          max-width:120px;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-30{
          width:30% !important;
          max-width:30%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-45{
          width:45% !important;
          max-width:45%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-28{
          width:28% !important;
          max-width:28%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-38{
          width:38% !important;
          max-width:38%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-20{
          width:20% !important;
          max-width:20%;
        }
    
    }		.moz-text-html .mj-column-per-100{
          width:100% !important;
          max-width:100%;
        }
        .moz-text-html .mj-column-px-570{
          width:570px !important;
          max-width:570px;
        }
        .moz-text-html .mj-column-px-120{
          width:120px !important;
          max-width:120px;
        }
        .moz-text-html .mj-column-per-30{
          width:30% !important;
          max-width:30%;
        }
        .moz-text-html .mj-column-per-45{
          width:45% !important;
          max-width:45%;
        }
        .moz-text-html .mj-column-per-28{
          width:28% !important;
          max-width:28%;
        }
        .moz-text-html .mj-column-per-38{
          width:38% !important;
          max-width:38%;
        }
        .moz-text-html .mj-column-per-20{
          width:20% !important;
          max-width:20%;
        }
        #outlook a{
          padding:0;
        }
        body{
          margin:0;
          padding:0;
          -webkit-text-size-adjust:100%;
          -ms-text-size-adjust:100%;
        }
        table,td{
          border-collapse:collapse;
          mso-table-lspace:0;
          mso-table-rspace:0;
        }
        img{
          border:0;
          height:auto;
          line-height:100%;
          outline:none;
          text-decoration:none;
          -ms-interpolation-mode:bicubic;
        }
        p{
          display:block;
          margin:13px 0;
        }
      @media only screen and (min-width:480px){
        .mj-column-per-100{
          width:100% !important;
          max-width:100%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-px-570{
          width:570px !important;
          max-width:570px;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-px-120{
          width:120px !important;
          max-width:120px;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-30{
          width:30% !important;
          max-width:30%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-45{
          width:45% !important;
          max-width:45%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-28{
          width:28% !important;
          max-width:28%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-38{
          width:38% !important;
          max-width:38%;
        }
    
    }	@media only screen and (min-width:480px){
        .mj-column-per-20{
          width:20% !important;
          max-width:20%;
        }
    
    }		.moz-text-html .mj-column-per-100{
          width:100% !important;
          max-width:100%;
        }
        .moz-text-html .mj-column-px-570{
          width:570px !important;
          max-width:570px;
        }
        .moz-text-html .mj-column-px-120{
          width:120px !important;
          max-width:120px;
        }
        .moz-text-html .mj-column-per-30{
          width:30% !important;
          max-width:30%;
        }
        .moz-text-html .mj-column-per-45{
          width:45% !important;
          max-width:45%;
        }
        .moz-text-html .mj-column-per-28{
          width:28% !important;
          max-width:28%;
        }
        .moz-text-html .mj-column-per-38{
          width:38% !important;
          max-width:38%;
        }
        .moz-text-html .mj-column-per-20{
          width:20% !important;
          max-width:20%;
        }
      @media only screen and (max-width:480px){
        table.mj-full-width-mobile{
          width:100% !important;
        }
    
    }	@media only screen and (max-width:480px){
        td.mj-full-width-mobile{
          width:auto !important;
        }
    
    }</style></head>
      <body style="word-spacing:normal;background-color:#c8c8c8;">
    
          <div style="background:#f0f0f0;background-color:#f0f0f0;margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0f0f0;background-color:#f0f0f0;width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                    <div class="mj-column-px-120 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                            <td style="vertical-align:top;padding:0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:30px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                          <tr>
                                            <td style="width:120px;">
                                            <a href=https://your-film-festival-d2cd4.web.app/build/festival=${festivalPathName} target="_blank">
                                            <img src=${img} style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="120" alt="Your-Film-Festival">
                                            </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
    
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0px;padding-top:40px;text-align:center;">
        
                      <div class="mj-column-px-570 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                          <tbody>
                            <tr>
                              <td style="vertical-align:top;padding:0px;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:15px 0px 0px 0px;">
                                   
                                        <div style="font-family:Roboto, Helvetica, Arial, sans-serif;font-size:35px;font-weight:400;line-height:40px;text-align:center;color:#009bff;">${title}</div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
     
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:30px;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                          <tbody>
                            <tr>
                              <td style="vertical-align:top;padding:0px;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:20px 0;">
                                        <div style="font-family:Roboto, Helvetica, Arial, sans-serif;font-size:20px;font-weight:400;line-height:40px;text-align:center;color:#5a5a5a;white-space: pre;">${content}</div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:20px 0 0 0;">
                                        <div style="font-family:Roboto, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:21px;text-align:center;color:#5a5a5a;">
                                          <strong><span style="font-size: 40px;">⚊</span></strong>
                                          <br>
                                          <br>
                                        </div>
                                      </td>
                                    </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
    
                </div>
              </body>
    </html>`;

    return emailContent;
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const toCustomer = {
      name: state.name,
      email: state.email,
      phoneNumber: state.phoneNumber,
      content: generateMailContent(
        `您已成功報名${currentWorkshop.title}囉！`,
        "請注意信箱與簡訊，若有異動會再另行通知",
        festivalLogo
      ),
    };

    const toHost = {
      name: state.name,
      email: hostEmail,
      phoneNumber: state.phoneNumber,
      title:currentWorkshop.title ,
      content: generateMailContent(
        "有新的報名者！",
        `若有異動請記得通知報名者\nEmail:${state.email}\nPhone Number:${state.phoneNumber}`,
        "https://firebasestorage.googleapis.com/v0/b/your-film-festival-d2cd4.appspot.com/o/yourFilmLogoA.png?alt=media&token=26155ce9-3034-4070-a5e6-c12a0f93ea9f"
      ),
    };

    const sendToClient = await fetch("https://stark-mountain-00642.herokuapp.com/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toCustomer),
    }).then((res) => {
      console.log(res.status);
      if (res.status === 404) {
        errorAlert("出錯了\n請聯繫主辦方", PuzzleImg);
        setIsLoading(false);
      }
    });

    const sendToHost = await fetch("https://stark-mountain-00642.herokuapp.com/send/host", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toHost),
    }).then((res) => {
      console.log(res.status);

      if (res.status === 200) {
        customImgAlert("您已成功報名活動囉", BlueCloudImg);
        setIsLoading(false);
      } else if (res.status === 404) {
        errorAlert("出錯了\n請聯繫主辦方", PuzzleImg);
        setIsLoading(false);
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
