import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import CarouselFrame from "./CarouselFrame";

function Carousel({userState}) {
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
    <div className="mb-4 | mt-14 | sm:mt-16 | md:mt-20 | xl:mt-24">
      <div className="relative w-full cursor-pointer | h-64 | sm:h-80 | md:h-[500px] | xl:h-[700px]">
        <FaArrowAltCircleRight
          onClick={nextSlide}
          className="absolute z-20 opacity-80 cursor-pointer | top-28 right-6 w-10 h-10 | sm:top-32 sm:right-6 sm:w-12 sm:h-12 | md:top-44 md:right-6 md:w-12 md:h-12 | xl:top-80 xl:right-12 xl:w-16 xl:h-16 "
          fill="rgba(247,220,165,0.7)"
        />
        <FaArrowAltCircleLeft
          onClick={prevSlide}
          className="absolute z-20 opacity-80 cursor-pointer | top-28 left-6 w-10 h-10 | sm:top-32 sm:left-6 sm:w-12 sm:h-12 | md:top-44 md:left-6 md:w-12 md:h-12 | xl:top-80 xl:left-12 xl:w-16 xl:h-16"
          fill="rgba(247,220,165,0.7)"
        />

        {sourceImgs.map((item, index) => (
          <CarouselFrame
            key={index}
            router={
              userState === "build"
                ? `/build/feature-details/${item.id}/festival=${festivalPathName}`
                : userState === "preview"
                ? `/preview/feature-details/${item.id}`
                : `/feature-details/${item.id}`
            }
            img={item.img}
            className={`absolute top-0 left-0 w-full object-cover object-center transition-all duration-1000 ${
              current === index ? "z-10 opacity-100" : " opacity-0 "
            } h-full `}
          />
        ))}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  userState: PropTypes.oneOf(["build", "preview", ""]).isRequired,
};

export default Carousel;
