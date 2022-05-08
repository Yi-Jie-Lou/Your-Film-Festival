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
    <div className="flex flex-col">
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
              className="relative cursor-pointer | w-full h-48 my-1 | sm:w-600 sm:h-64 sm:my-2 | md:w-[calc(50vw-36px)] md:h-80 md:mx-2 md:my-2 | xl:my-6 xl:mx-3 xl:w-600 xl:h-96 "
              title={item.commercialInfo}
              text={item.shortInfo}
              img={item.featureImgs[1]}
            />
          ))}
        </>
      </div>
      <div className="flex flex-wrap mb-16 max-w-1440 | justify-center mx-auto | md:justify-start md:mx-3 | xl:justify-center xl:mx-auto ">
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
              className="relative cursor-pointer | h-48 w-full my-1 | sm:w-[290px] sm:my-2 sm:mx-2 | md:w-[calc((100vw-88px)/3)] | xl:w-72 xl:h-72 xl:mx-3 xl:my-0 "
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
