import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import CarouselFrame from "./CarouselFrame";

function Carousel(props) {
  const features = useSelector((state) => state.features);
  const festivalPathName = useSelector((state) => state.festivalPathName);
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
          className="absolute z-20 right-12 top-80   w-16 h-16 cursor-pointer opacity-80 "
        />
        <FaArrowAltCircleLeft
          onClick={prevSlide}
          className="absolute z-20 left-12 top-80  w-16 h-16 cursor-pointer opacity-80 "
        />

        {sourceImgs.map((item, index) => (
          <CarouselFrame
            key={index}
            router={
              props.userState === "build"
                ? `/build/feature-information/${item.id}/festival=${festivalPathName}`
                : props.userState === "preview"
                ? `/preview/feature-information/${item.id}`
                : `/feature-information/${item.id}`
            }
            img={item.img}
            className={`absolute top-0 left-0 w-full h-700  object-cover  object-center  transition-all duration-1000 ${
              current === index ? "z-10 opacity-100" : " opacity-0 "
            } `}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
