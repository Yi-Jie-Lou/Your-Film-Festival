import React from "react";
import FooterImg from "../img/yourFilmFooter.png";
import AppWorksSchool from "../img/AppWorksSchool.png";
import { useSelector, useDispatch } from "react-redux";

function Footer() {
  const state = useSelector((state) => state.state);
  const sponsor = useSelector((state) => state.sponsor);
  const primaryColor = useSelector((state) => state.primaryColor);
  return (
    <>
      {state === "preview" || state === "build" ? (
        <div
          className="flex justify-center w-full  h-32 bottom-0 z-10 "
          style={{
            background: primaryColor,
          }}
        >
 
            <div className="vertical mr-12 py-1 text-center text-1xl">
              <sapn>贊助</sapn>
            </div>
            <div className="flex justify-center content-center flex-wrap max-w-530 ">
              {sponsor.text.map((item, index) => (
                <div
                  index={index}
                  className="flex py-1  mx-4 text-start text-sm"
                >
                 <span> {item}</span>
                </div>
              ))}
            </div>
    
          {sponsor.img.map((item, index) => (
          <div key={index} className="flex items-center w-32  mx-2 ">

              <img src={item} />
 
          </div>
          ))}
        </div>
      ) : (
        <div className="relative flex justify-center z-10 h-32   mx-auto">
          <div className="flex mt-5 z-20 text-center text-1xl">
            <div className="vertical w-full mx-2 text-center text-1xl text-black  tracking-wider ">
              <span>贊助</span>
            </div>
          </div>

          <div className="flex items-center mt-5 z-20 text-center text-1xl">
            <div className="w-48 rounded-full ">
              <img src={AppWorksSchool} />
            </div>
          </div>
          <img
            className="absolute bottom-0 h-full w-full object-cover "
            src={FooterImg}
          />
        </div>
      )}
    </>
  );
}

export default Footer;
