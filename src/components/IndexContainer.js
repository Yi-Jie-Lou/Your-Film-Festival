import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function Carousel() {
  const features = useSelector((state) => state.features);
  const [sourceImgs, setSourceImgs] = useState([]);
  const [length, setLength] = useState(1);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  const resetInterval = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
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
    const source = features.map((item) => item.featureImgs[0]);
    setSourceImgs(source);
    setLength(source.length);
  }, [features]);

  useEffect(() => {
    resetInterval();
  }, [length]);

  return (
    <div className="mt-24 ">
      <div className="relative w-full h-800 cursor-pointer">
        <FaArrowAltCircleRight
          onClick={nextSlide}
          className="absolute z-10 right-12 top-96  w-16 h-16 cursor-pointer opacity-80 "
        />
        <FaArrowAltCircleLeft
          onClick={prevSlide}
          className="absolute z-10 left-12 top-96  w-16 h-16 cursor-pointer opacity-80 "
        />
        {sourceImgs.map((item, index) => (
          <img
            key={index}
            className={`absolute top-0 left-0 w-full h-800  object-cover  object-center  transition-all duration-1000 ${
              current === index ? " opacity-100" : " opacity-0 "
            } `}
            src={item}
          />
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
    <div className="flex flex-wrap justify-center">
      <>
        {importantFeatures.map((item) => (
          <div className="my-6 mx-3 w-600 h-96 border-2 cursor-pointer">
            <img
              className="w-full h-full object-cover"
              src={item.featureImgs[1]}
            />
          </div>
        ))}
      </>
      {normalFeatures.map((item) => (
        <div className="my-6 w-1/4 h-60 border-2">
          <img
            className="w-full h-full object-cover"
            src={item.featureImgs[1]}
          />
        </div>
      ))}
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
