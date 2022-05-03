import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

function TemplateNewsContainer() {
  const news = useSelector((state) => state.news);
  const [importantNews, setImportantNews] = useState([]);
  const [normalNews, setNormalNews] = useState([]);

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
            <NavLink key={index} to={`/news/${item.newsID}`}>
              <div className="relative  h-516 w-480 mb-8 mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300">
                <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
                  {item.title.split("\n").map((line, index) => (
                    <p key={index} className="my-1">
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    </p>
                  ))}
                </div>
                <img
                  className="w-full h-full object-cover object-center rounded-lg"
                  src={item.img}
                />
              </div>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-wrap justify-start ">
          {normalNews.map((item, index) => (
            <NavLink key={index} to={`/news/${item.newsID}`}>
              <div className="relative w-300 h-250 mb-4   mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300">
                <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
                  {item.title.split("\n").map((line, index) => (
                    <p key={index} className="my-1">
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    </p>
                  ))}
                </div>

                <img
                  className="w-full h-full object-cover object-center rounded-lg"
                  src={item.img}
                />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewNewsContainer() {
  const news = useSelector((state) => state.news);
  const [importantNews, setImportantNews] = useState([]);
  const [normalNews, setNormalNews] = useState([]);

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
            <NavLink key={index} to={`/preview/news/${item.newsID}`}>
              <div className="relative  h-516 w-480 mb-8 mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300">
                <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
                  {item.title.split("\n").map((line, index) => (
                    <p key={index} className="my-1">
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    </p>
                  ))}
                </div>
                <img
                  className="w-full h-full object-cover object-center rounded-lg"
                  src={item.img}
                />
              </div>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-wrap justify-start ">
          {normalNews.map((item, index) => (
            <NavLink key={index} to={`/preview/news/${item.newsID}`}>
              <div className="relative w-300 h-250 mb-4   mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300">
                <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
                  {item.title.split("\n").map((line, index) => (
                    <p key={index} className="my-1">
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    </p>
                  ))}
                </div>

                <img
                  className="w-full h-full object-cover object-center rounded-lg"
                  src={item.img}
                />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuildNewsContainer() {
  const news = useSelector((state) => state.news);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const [importantNews, setImportantNews] = useState([]);
  const [normalNews, setNormalNews] = useState([]);

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
            <NavLink
              key={index}
              to={`/news/${item.newsID}/festival=${festivalPathName}`}
            >
              <div className="relative  h-516 w-480 mb-8 mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300">
                <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
                  {item.title.split("\n").map((line, index) => (
                    <p key={index} className="my-1">
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    </p>
                  ))}
                </div>
                <img
                  className="w-full h-full object-cover object-center rounded-lg"
                  src={item.img}
                />
              </div>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-wrap justify-start ">
          {normalNews.map((item, index) => (
            <NavLink
              key={index}
              to={`/news/${item.newsID}/festival=${festivalPathName}`}
            >
              <div className="relative w-300 h-250 mb-4   mx-4 drop-shadow-2xl  cursor-pointer hover:scale-105 ease-in-out duration-300">
                <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
                  {item.title.split("\n").map((line, index) => (
                    <p key={index} className="my-1">
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    </p>
                  ))}
                </div>

                <img
                  className="w-full h-full object-cover object-center rounded-lg"
                  src={item.img}
                />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function News(props) {
  const [pageState, setPageState] = useState(props.userState);
  useEffect(() => {
    setPageState(props.userState);
  }, [props.userState]);

  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      {pageState === "preview" ? (
        <PreviewNewsContainer />
      ) : pageState === "build" ? (
        <BuildNewsContainer />
      ) : (
        <TemplateNewsContainer />
      )}
      <Footer userState={props.userState} />
    </>
  );
}

export default News;
