import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewsBox from "../components/global/NewsBox";

function News(props) {
  const news = useSelector((state) => state.news);
  const [importantNews, setImportantNews] = useState([]);
  const [normalNews, setNormalNews] = useState([]);
  const festivalPathName = useSelector((state) => state.festivalPathName);

  useEffect(() => {
    const importantTag = news.filter((item) => item.important === true);
    const normalTag = news.filter((item) => item.important === false);
    setImportantNews(importantTag);
    setNormalNews(normalTag);
  }, [news]);

  return (
    <div className="my-32 ">
      <div className="flex flex-wrap justify-center w-11/12 min-h-200  mt-4 mx-auto rounded-lg">
        <div className="flex flex-wrap">
          {importantNews.map((item, index) => (
            <NewsBox
              key={index}
              router={
                props.userState === "build"
                  ? `/build/news/${item.newsID}/festival=${festivalPathName}`
                  : props.userState === "preview"
                  ? `/preview/news/${item.newsID}`
                  : `/news/${item.newsID}`
              }
              className="relative  h-516 w-480 mb-8 mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300"
              text={item.title}
              img={item.img}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-start ">
          {normalNews.map((item, index) => (
            <NewsBox
              key={index}
              router={
                props.userState === "build"
                  ? `/build/news/${item.newsID}/festival=${festivalPathName}`
                  : props.userState === "preview"
                  ? `/preview/news/${item.newsID}`
                  : `/news/${item.newsID}`
              }
              className="relative w-300 h-250 mb-4   mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300"
              text={item.title}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
