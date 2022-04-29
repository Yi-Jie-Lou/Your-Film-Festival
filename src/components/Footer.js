import React from "react";
import FooterImg from "../img/FooterImg.png";

function Footer() {
  return (
    <div
      className="flex h-32 bottom-0 z-10  mt-2 my-0 mx-auto"
      style={{
        background: `url(${FooterImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex mt-6 mr-4 ml-auto   text-center text-1xl">
        <div className="w-full py-1 my-1 rounded text-center text-1xl">
          贊助
        </div>
        <div className="flex">
          <div>
            <div className="w-40 py-1 my-1  rounded text-center text-sm">
              台北市政府
            </div>
            <div className="w-40 py-1 my-1  rounded text-center text-sm">
              台北市文化局
            </div>
          </div>
          <div>
            <div className="w-40 py-1 my-1  rounded text-center text-sm">
              台北市政府
            </div>
            <div className="w-40 py-1 my-1  rounded text-center text-sm">
              台北市文化局
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center  mr-auto ml-4 mx-auto  text-center text-1xl">
        <div className="relative w-24 h-24 mx-1 rounded-full border-2  text-center ">
          <span className="absolute  top-8 left-0 w-24 text-base">Logo</span>
        </div>
        <div className="relative w-24 h-24 mx-1 rounded-full border-2  text-center ">
          <span className="absolute  top-8 left-0 w-24 text-base">Logo</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
