import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";

function TemplateWorkshopContainer() {
  const workshop = useSelector((state) => state.workshop);

  return (
    <div className="flex flex-wrap justify-center w-full  min-h-200  mt-32 mx-auto rounded-lg">
      {workshop &&
        workshop.map((item, index) => (
          <NavLink key={index} to={`/workshop/${item.workshopID}`}>
            <div className="relative  w-full mb-8 drop-shadow-2xl  cursor-pointer ">
              <div className="absolute m-10 bottom-0  text-white text-shadow text-2xl tracking-wider">
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
  );
}

function PreviewWorkshopContainer() {
  const workshop = useSelector((state) => state.workshop);

  return (
    <div className="flex flex-wrap justify-center w-full  min-h-200  mt-32 mx-auto rounded-lg">
      {workshop &&
        workshop.map((item, index) => (
          <NavLink key={index} to={`/preview/workshop/${item.workshopID}`}>
            <div className="relative  w-full mb-8 drop-shadow-2xl  cursor-pointer ">
              <div className="absolute m-10 bottom-0  text-white text-shadow text-2xl tracking-wider">
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
  );
}

function BuildWorkshopContainer() {
  const workshop = useSelector((state) => state.workshop);
  const festivalPathName = useSelector((state) => state.festivalPathName);

  return (
    <div className="flex flex-wrap justify-center w-full  min-h-200  mt-32 mx-auto rounded-lg">
      {workshop &&
        workshop.map((item, index) => (
          <NavLink key={index} to={`/workshop/${item.workshopID}/festival=${festivalPathName}`}>
            <div className="relative  w-full mb-8 drop-shadow-2xl  cursor-pointer ">
              <div className="absolute m-10 bottom-0  text-white text-shadow text-2xl tracking-wider">
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
  );
}

function Workshop(props) {
  const [pageState, setPageState] = useState(props.userState);
  useEffect(() => {
    setPageState(props.userState);
  }, [props.userState]);

  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      {pageState === "preview" ? (
        <PreviewWorkshopContainer />
      ) :pageState === "build"? (
        <BuildWorkshopContainer />
      ) : (
        <TemplateWorkshopContainer />
      )}

      <Footer userState={props.userState} />
    </>
  );
}

export default Workshop;
