import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function NewsDetails() {
  const news = useSelector((state) => state.news);
  const [currentNews, setCurrentNews] = useState("");
  const currentID = useParams();

  useEffect(() => {
    const currentOne = news.filter((item) => item.newsID === currentID.id);
    setCurrentNews(...currentOne);
  }, [news]);

  return (
    <div className="min-h-200">
      <h1 className="w-11/12 mx-auto mt-32 pb-8 mb-8 border-b-2 border-stone-700 text-center text-2xl tracking-wider">{currentNews?.title}</h1>
      <img className="w-full" src={currentNews?.img} />
      <div className="mx-auto my-12 w-11/12">
        {currentNews
          ? currentNews.content.split("\n").map((line, index) => (
              <div key={index} className="my-1">
                <span >
                  {line}
                  <br />
                </span>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default NewsDetails;
