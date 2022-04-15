import React, { useEffect, useState } from "react";
import Booking from "../components/Booking";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Features(props) {
  return (
    <div className="wrap">
      <Header userState={"editing"} />
      <Booking userUID={props.userUID} />
      <div className="flex justify-center my-8">
        <button className="w-28 p-2 mx-2 border-2 rounded-lg bg-red-300">
          刪除影片
        </button>
        <button className="w-28 p-2 mx-2 border-2 rounded-lg bg-blue-300">
          儲存本頁
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Features;
