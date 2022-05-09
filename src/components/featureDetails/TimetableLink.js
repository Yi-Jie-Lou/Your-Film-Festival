import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineCaretUp, AiFillStar } from "react-icons/ai";

function TimetableLink(props) {
  const secondaryColor = useSelector((state) => state.secondaryColor);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  
  return (
    <>
      {props.currentFeatureObject.timetable.map((timetable, index) => (
        <NavLink
          key={index}
          to={
            props.userState === "build"
              ? `/build/timetable/${timetable.date}/festival=${festivalPathName}`
              : props.userState === "preview"
              ? `/preview/timetable/${timetable.date}`
              : `/timetable/${timetable.date}`
          }
        >
          <div
            style={{
              background: secondaryColor,
            }}
            className="flex py-2 px-4 my-2 justify-between border-2 rounded-lg border-stone-500"
          >
            <p className="text-white text-shadow tracking-wider">
              {timetable.date} {timetable.start}
            </p>
            <div className="flex">
              <p className="text-white text-shadow tracking-wider">{timetable.location} </p>
              <div className="vertical ml-2">
                {timetable.workshop ? <AiFillStar fill="white" /> : ""}
              </div>
              <div className="ml-2 mt-1">
                {timetable.opening || timetable.closing ? (
                  <AiOutlineCaretUp fill="white"/>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default TimetableLink;
