import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

function TimetableContainer() {
  const initQureyDate = useParams();
  const features = useSelector((state) => state.features);
  const period = useSelector((state) => state.festivalPeriod);
  const locations = useSelector((state) => state.festivalLocations);
  const [queryDate, setQureyDate] = useState("");
  const [queryTimetable, setQureyTimetable] = useState([]);
  const [Alltimetables, setAllTimetables] = useState([]);

  useEffect(() => {
    const timetableArray = features.map((item) => {
      return item.timetable;
    });
    const timetables = timetableArray.reduce(
      (previousValue, currentValue) => [...previousValue, ...currentValue],
      []
    );
    setAllTimetables(timetables);
  }, [features]);

  useEffect(() => {
    if (!initQureyDate.id && period[0]) {
      setQureyDate(period[0].dates);
    }
  }, [period]);

  useEffect(() => {
    if (!Alltimetables) return;
    const queryOne = Alltimetables.filter((item) => queryDate === item.date);
    setQureyTimetable(queryOne);
  }, [queryDate]);

  useEffect(() => {
    if (!initQureyDate.id) return;
    const queryOne = Alltimetables.filter(
      (item) => initQureyDate.id === item.date
    );
    setQureyTimetable(queryOne);
    setQureyDate(initQureyDate.id);
  }, [Alltimetables]);

  return (
    <>
      <div className="mt-28 mb-32">
        <select
          className="block  mb-0 mx-auto border-2"
          onChange={(event) => setQureyDate(event.target.value)}
          value={queryDate}
        >
          {period &&
            period.map((item, index) => (
              <option key={index} value={item.dates}>
                {item.displayDates}
              </option>
            ))}
        </select>

        {locations &&
          locations.map((item, index) => (
            <div key={index} className=" my-4 mx-auto w-4/5  rounded-lg">
              <div className=" flex mx-auto w-4/5 p-1 rounded-lg text-xl">
                {item}
              </div>
              <div className=" flex mx-auto w-4/5 h-72   border-t-2 border-stone-700 ">
                {queryTimetable.map((film, index) =>
                  film.location === item ? (
                    <NavLink
                      key={index}
                      to={`/preview/feature-information/${film.featureID}`}
                    >
                      <div
                        key={index}
                        className="relative text-1xl w-64 h-64 mr-4 my-4 border-2 rounded "
                      >
                        <div className="absolute flex flex-col justify-center h-full  w-full  text-white  opacity-0 hover:opacity-100 backdrop-blur-sm  ">
                          <p className="w-3/4 mx-auto mt-2 text-lg text-center text-shadow">
                            {" "}
                            {film.name} {film.start}-{film.end}
                          </p>
                        </div>
                        <img
                          className="w-full h-full object-cover"
                          src={film ? film.img : ""}
                        />
                      </div>
                    </NavLink>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          ))}
        <div className="w-2/3 mt-10 mx-auto">
          <div className="flex my-2">
            <div className="w-6 h-6 mr-2 bg-lime-500 text-center text-shadow-light text-white rounded-md">
              普
            </div>
            <p>一般觀眾皆可觀賞。</p>
          </div>
          <div className="flex my-2">
            <div className="w-6 h-6 mr-2 bg-blue-500 text-center text-shadow-light text-white rounded-md">
              護
            </div>
            <p>未滿六歲之兒童不得觀賞，六歲以上十二歲未滿之兒童須父母、師長或成年親友陪伴輔導觀賞。</p>
          </div>
          <div className="flex my-2">
            <div className="w-6 h-6 mr-2 bg-orange-500 text-center text-shadow-light text-white rounded-md">
              輔
            </div>
            <p>未滿十五歲之人不得觀賞。</p>
          </div>
          <div className="flex my-2">
            <div className="w-6 h-6 mr-2 bg-red-500 text-center text-shadow-light text-white rounded-md  ">
              限
            </div>
            <p>未滿十八歲之人不得觀賞。</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Timetable(props) {
  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      <TimetableContainer userUID={props.userUID} />
      <Footer />
    </>
  );
}

export default Timetable;
