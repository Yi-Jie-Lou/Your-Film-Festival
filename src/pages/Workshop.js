import React from "react";
import { useSelector } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";
import NewsBox from "../components/global/NewsBox";

function Workshop(props) {
  const workshop = useSelector((state) => state.workshop);
  const festivalPathName = useSelector((state) => state.festivalPathName);

  return (
    <div className="flex flex-wrap justify-center w-full min-h-[600px]  mt-24 mb-52 | xl:mt-32 mx-auto rounded-lg">
      {workshop &&
        workshop.map((item, index) => (
          <>
            <NewsBox
              key={index}
              router={
                props.userState === "build"
                  ? `/build/workshop/${item.workshopID}/festival=${festivalPathName}`
                  : props.userState === "preview"
                  ? `/preview/workshop/${item.workshopID}`
                  : `/workshop/${item.workshopID}`
              }
              className="relative h-1/2 mb-8 drop-shadow-2xl  cursor-pointer | w-11/12 | md:w-full"
              text={item.title}
              img={item.img}
            />
          </>
        ))}
    </div>
  );
}

export default Workshop;
