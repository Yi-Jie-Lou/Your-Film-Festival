import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilmBox from "../global/FilmBox";

function FilmsContainer(props) {
  const features = useSelector((state) => state.features);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const [importantFeatures, setImportantFeatures] = useState([]);
  const [normalFeatures, setNormalFeatures] = useState([]);

  useEffect(() => {
    const initImpotant = features.filter((item) => item.important === true);
    const initNormalFeatures = features.filter(
      (item) => item.important === false
    );

    setImportantFeatures(initImpotant);
    setNormalFeatures(initNormalFeatures);
  }, [features]);

  return (
    <div className="flex flex-col mb-10 mx-auto w-[90%] |  md:w-11/12 | xl:w-[96%]">
      <div className="flex flex-wrap mx-auto max-w-[1440px] w-full justify-center">
        <>
          {importantFeatures.map((item, index) => (
            <FilmBox
              key={index}
              router={
                props.userState === "build"
                  ? `/build/feature-details/${item.featureID}/festival=${festivalPathName}`
                  : props.userState === "preview"
                  ? `/preview/feature-details/${item.featureID}`
                  : `/feature-details/${item.featureID}`
              }
              className="relative cursor-pointer | w-full h-48 my-1 | sm:w-full sm:h-64 sm:my-2 sm:mx-2 | md:w-[calc((100%-32px)/2)] md:h-80 md:mx-2 md:my-2 | xl:mt-6 xl:h-96 "
              title={item.commercialInfo}
              text={item.shortInfo}
              img={item.featureImgs[1]}
            />
          ))}
        </>
      </div>
      <div className="flex flex-wrap max-w-1440 | justify-center mx-auto | md:justify-start | xl:justify-center xl:mx-auto ">
        <>
          {normalFeatures.map((item, index) => (
            <FilmBox
              key={index}
              router={
                props.userState === "build"
                  ? `/build/feature-details/${item.featureID}/festival=${festivalPathName}`
                  : props.userState === "preview"
                  ? `/preview/feature-details/${item.featureID}`
                  : `/feature-details/${item.featureID}`
              }
              className="relative  cursor-pointer | h-48 w-full my-1 | sm:w-[calc((100%-32px)/2)] sm:h-64 sm:my-2 sm:mx-2 | md:w-[calc((100%-48px)/3)] | xl:w-[calc((100%-64px)/4)] xl:h-72 "
              title={item.title}
              text={item.shortInfo}
              img={item.featureImgs[1]}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default FilmsContainer;
