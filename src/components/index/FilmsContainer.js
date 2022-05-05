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
      <div className="flex flex-wrap mx-auto max-w-1440  justify-center">
        <>
          {importantFeatures.map((item, index) => (
            <FilmBox
              key={index}
              router={
                props.userState === "build"
                  ? `/build/feature-information/${item.featureID}/festival=${festivalPathName}`
                  : props.userState === "preview"
                  ? `/preview/feature-information/${item.featureID}`
                  : `/feature-information/${item.featureID}`
              }
              className="relative my-6 mx-3 w-600 h-96  cursor-pointer"
              title={item.commercialInfo}
              text={item.shortInfo}
              img={item.featureImgs[1]}
            />
          ))}
        </>
      </div>
      <div className="flex flex-wrap mx-auto mb-16 max-w-1440 justify-center ">
        <>
          {normalFeatures.map((item, index) => (
            <FilmBox
              key={index}
              router={
                props.userState === "build"
                  ? `/build/feature-information/${item.featureID}/festival=${festivalPathName}`
                  : props.userState === "preview"
                  ? `/preview/feature-information/${item.featureID}`
                  : `/feature-information/${item.featureID}`
              }
              className="relative mx-3 w-72 h-72  cursor-pointer"
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
