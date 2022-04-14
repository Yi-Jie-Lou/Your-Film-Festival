import React, { useState, useEffect } from "react";
import { firebase } from "../utils/firebase-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Select from "../components/Select";

function TimetableContainer(props) {
  const [queryDate, setQureyDate] = useState("");
  const [festivalData, setFestivalData] = useState("");
  const [timetable, setTimetable ]= useState("");

  

  //url.name.start.end.location >> uid 然後去set usestate

  useEffect(() => {
    if (props.userUID) {
      firebase.readFestivalData(props.userUID).then((res) => {
        console.log("keep mind!");

        const festivalData = {
          locations: res.locations,
          dates: res.festivalPeriod,
        };
        setFestivalData(festivalData);
        setQureyDate(festivalData.dates[0].dates);
      });
    }
  }, [props.userUID]);

  useEffect(() => {
    if (queryDate) {
      firebase.queryFeatures(queryDate).then((res)=>{
        setTimetable(res)
      })
    }
  }, [queryDate]);

  return (
    <>
      <div className="mt-28 mb-32">
        <Select
          className="block  mb-0 mx-auto border-2"
          options={festivalData.dates}
          onChange={setQureyDate}
        />
        {festivalData &&
          festivalData.locations.map((item, index) => (
            <div
              key={index}
              className=" my-4 mx-auto w-4/5 border-2 rounded-lg"
            >
              <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
                {item}
              </div>
              <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
              {timetable && timetable.map((film ,index)=>(
                film.location === item ? <div key={index} className="text-1xl w-32 h-32 m-4 border-2 rounded ">
                {film.name}{film.start}-{film.end}
                </div> : ""
              ))}

              </div>
            </div>
          ))}

        {/* <div className=" my-4 mx-auto w-4/5 border-2 rounded-lg">
          <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
            華山光點
          </div>
          <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
            <div className="text-1xl w-32 h-32 m-4 border-2 rounded ">
              Hello
            </div>
            <div className="text-1xl w-32 h-32 m-4 border-2 rounded ">
              Hello
            </div>
          </div>
        </div>
        <div className=" my-4 mx-auto w-4/5 border-2 rounded-lg">
          <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
            華山光點
          </div>
          <div className=" flex mx-auto w-4/5 border-2 rounded-lg">
            <div className="text-1xl w-32 h-32 m-4 border-2 rounded ">
              Hello
            </div>
            <div className="text-1xl w-32 h-32 m-4 border-2 rounded ">
              Hello
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

function Timetable(props) {
  return (
    <>
      <Header />
      <TimetableContainer userUID={props.userUID} />
      <Footer />
    </>
  );
}

export default Timetable;
