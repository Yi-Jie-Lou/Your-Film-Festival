import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TimetableContainer() {
  const features = useSelector((state) => state.features);
  const period = useSelector((state) => state.festivalPeriod);
  const locations = useSelector((state) => state.festivalLocations);
  const [queryDate, setQureyDate] = useState("");
  const [queryTimetable, setQureyTimetable] = useState([]);
  const [Alltimetables, setAllTimetables] = useState("");
  //url.name.start.end.location >> uid 然後去set usestate

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
    if (period[0]) {
      setQureyDate(period[0].dates);
    }
  }, [period]);

  useEffect(() => {
    if (queryDate) {
      const queryOne = Alltimetables.filter((item) => queryDate === item.date);
      setQureyTimetable(queryOne);
    }
  }, [queryDate]);


  return (
    <>
      <div className="mt-28 mb-32">
        <select
          className="block  mb-0 mx-auto border-2"
          onChange={(event) => setQureyDate(event.target.value)}
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
            <div
              key={index}
              className=" my-4 mx-auto w-4/5 border-2 rounded-lg"
            >
              <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
                {item}
              </div>
              <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
                {queryTimetable.map((film, index) =>
                  film.location === item ? (
                    <div
                      key={index}
                      className="text-1xl w-32 h-32 m-4 border-2 rounded "
                    >
                      {film.name}
                      {film.start}-{film.end}
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          ))}
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
