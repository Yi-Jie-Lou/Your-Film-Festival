import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";


function NewsContainer() {
  const news = useSelector((state) => state.news);
  

  return (
    <div className="my-32 ">
      <div className="w-11/12 h-64 mt-4 mx-auto border-2 rounded-lg">
        {news.map((item=>(
          <>
          <div className="w-250 h-600 border-2">{item.title} </div>
          <img src={item.img} />
          </>
        )))}
      </div>
      <div className="w-11/12 h-64 mt-4 mx-auto border-2 rounded-lg"></div>
      <div className="w-11/12 h-64 mt-4 mx-auto border-2 rounded-lg"></div>
      <div className="w-11/12 h-64 mt-4 mx-auto border-2 rounded-lg"></div>
    </div>
  );
}

function News(props) {
  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      <NewsContainer />
      <Footer />
    </>
  );
}

export default News;