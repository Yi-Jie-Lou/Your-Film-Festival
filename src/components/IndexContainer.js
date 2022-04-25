import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Carousel() {
  const features = useSelector((state) => state.features);
  const [sourceImgs, setSourceImgs] = useState([]);
  const [length, setLength] = useState(1);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  const resetInterval = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    resetInterval();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    resetInterval();
  };
  useEffect(() => {
    const source = features.map((item) => ({
      img: item.featureImgs[0],
      id: item.featureID,
    }));
    setSourceImgs(source);
    setLength(source.length);
  }, [features]);

  useEffect(() => {
    resetInterval();
  }, [length]);

  return (
    <div className="mt-24 ">
      <div className="relative w-full h-700 cursor-pointer">
        <FaArrowAltCircleRight
          onClick={nextSlide}
          className="absolute z-10 right-12 top-80   w-16 h-16 cursor-pointer opacity-80 "
        />
        <FaArrowAltCircleLeft
          onClick={prevSlide}
          className="absolute z-10 left-12 top-80  w-16 h-16 cursor-pointer opacity-80 "
        />

        {sourceImgs.map((item, index) => (
          <NavLink key={index} to={`/preview/feature-information/${item.id}`}>
            <img
              className={`absolute top-0 left-0 w-full h-700  object-cover  object-center  transition-all duration-1000 ${
                current === index ? " opacity-100" : " opacity-0 "
              } `}
              src={item.img}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function FeatureContainer() {
  const features = useSelector((state) => state.features);
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
            <NavLink
              key={index}
              to={`/preview/feature-information/${item.featureID}`}
            >
              <div
                key={index}
                className="relative my-6 mx-3 w-600 h-96  cursor-pointer"
              >
                <div className="absolute flex flex-col justify-center h-full  w-full  text-white  opacity-0 hover:opacity-100 backdrop-blur-sm  ">
                  <h4 className="w-3/4 mx-auto text-shadow text-xl ">
                    {item.commercialInfo}
                  </h4>
                  <p className="w-3/4 mx-auto mt-2 text-shadow">
                    {item.shortInfo}
                  </p>
                </div>
                <img
                  className="w-full h-full object-cover"
                  src={item.featureImgs[1]}
                />
              </div>
            </NavLink>
          ))}
        </>
      </div>
      <div className="flex flex-wrap mx-auto mb-16 max-w-1440 justify-center ">
        <>
          {normalFeatures.map((item, index) => (
            <NavLink
              key={index}
              to={`/preview/feature-information/${item.featureID}`}
            >
              <div
                key={index}
                className="relative mx-3 w-72 h-72  cursor-pointer"
              >
                <div className="absolute flex flex-col justify-center h-full w-full  text-white  opacity-0 hover:opacity-100 backdrop-blur-sm  ">
                  <h4 className="w-3/4 mx-auto text-shadow text-xl ">
                    {item.title}
                  </h4>
                  <p className="w-3/4 mx-auto mt-2 text-shadow">
                    {item.shortInfo}
                  </p>
                </div>

                <img
                  className="w-full  h-full object-cover "
                  src={item.featureImgs[1]}
                />
              </div>
            </NavLink>
          ))}
        </>
      </div>
    </div>
  );
}

function IndexContainer() {
  return (
    <div className="mt-24 ">
      <Carousel />
      <FeatureContainer />
    </div>
  );
}

export default IndexContainer;
