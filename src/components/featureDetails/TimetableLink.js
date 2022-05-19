import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineCaretUp, AiFillStar } from "react-icons/ai";
import PropTypes from "prop-types";

function TimetableLink({ userState, currentFeatureObject }) {
  const secondaryColor = useSelector((state) => state.secondaryColor);
  const festivalPathName = useSelector((state) => state.festivalPathName);

  return (
    <>
      {currentFeatureObject.timetable.map((timetable, index) => (
        <NavLink
          key={index}
          to={
            userState === "build"
              ? `/build/timetable/${timetable.date}/festival=${festivalPathName}`
              : userState === "preview"
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
              <p className="text-white text-shadow tracking-wider">
                {timetable.location}{" "}
              </p>
              <div className="vertical ml-2">
                {timetable.workshop ? <AiFillStar fill="white" /> : ""}
              </div>
              <div className="ml-2 mt-1">
                {timetable.opening || timetable.closing ? (
                  <AiOutlineCaretUp fill="white" />
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

TimetableLink.propTypes = {
  userState: PropTypes.oneOf(["build", "preview"]),
  currentFeatureObject: PropTypes.shape({
    timetable: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        workshop: PropTypes.bool.isRequired,
        opening: PropTypes.bool.isRequired,
        closing: PropTypes.bool.isRequired, 
      })
    ),
  }),
};

export default TimetableLink;
