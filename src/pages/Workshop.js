import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";

function WorkshopContainer() {
  const workshop = useSelector((state) => state.workshop);
  const currentID = useParams();

  return (
    <div className="flex flex-wrap justify-center w-full   mt-32 mx-auto rounded-lg">
      {workshop && workshop.map((item, index) => (
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

function Workshop(props) {
  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      <WorkshopContainer />
      <Footer />
    </>
  );
}

export default Workshop;
