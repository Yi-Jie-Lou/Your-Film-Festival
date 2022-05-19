import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import NewsBox from '../components/global/NewsBox';

function News({ userState }) {
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
    <div className="mb-10 | mt-24 | md:mt-32">
      <div className="flex flex-col w-11/12 min-h-[500px]  mx-auto rounded-lg">
        <div className="flex flex-wrap justify-center">
          {importantNews.map((item, index) => (
            <NewsBox
              key={index}
              router={
                userState === 'build'
                  ? `/build/news/${item.newsID}/festival=${festivalPathName}`
                  : userState === 'preview'
                  ? `/preview/news/${item.newsID}`
                  : `/news/${item.newsID}`
              }
              navLinkClassName=""
              className="mx-4 drop-shadow-2xl cursor-pointer hover:scale-105 ease-in-out duration-300 | w-full h-[250px] mb-4 | md:w-[calc((100%-64px)/2)] md:h-[300px] md:mb-8 | xl:h-[480px]  "
              title={item.title}
              img={item.img}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-start ">
          {normalNews.map((item, index) => (
            <NewsBox
              key={index}
              router={
                userState === 'build'
                  ? `/build/news/${item.newsID}/festival=${festivalPathName}`
                  : userState === 'preview'
                  ? `/preview/news/${item.newsID}`
                  : `/news/${item.newsID}`
              }
              className="mb-4 mx-4 drop-shadow-2xl cursor-pointer hover:scale-105 ease-in-out duration-300 w-full h-[250px] | md:w-[calc((100%-96px)/3)]"
              title={item.title}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

News.propTypes = {
  userState: PropTypes.oneOf(['build', 'preview', '']),
};

export default News;
