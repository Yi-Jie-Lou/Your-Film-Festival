import React, { useEffect, useState } from "react";
import { firebase } from "../utils/firebase-config";
import Booking from "../components/Booking";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Features(props) {
  const [festivalLocations, setFestivalLocations] = useState([]);
  const [festivalPeriod, setFestivalPeriod] = useState();
  const [allFeatures, setAllFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState();

  const addFeature = () => {
    const emptyFeature = {
      featureID: "featureC",
      timetable: [ {date: "",
      start: "10:00",
      end: "12:00",
      location: "",
      opening: false,
      closing: false,
      name: "",
      timetableID: "",
      workshop: false}] 
    }
    const newFeatures = [...allFeatures, emptyFeature]
 
    setAllFeatures(newFeatures)
  }

  useEffect(() => {
    if (props.userUID) {
      firebase.readFestivalData(props.userUID).then((res) => {
        console.log("keep mind!");
        setFestivalLocations(res.locations);
        setFestivalPeriod(res.festivalPeriod);
        setAllFeatures(res.features);
        setCurrentFeature(res.features[0].featureID);
      });
    }
  }, [props.userUID]);

  const allTabs = (
    <div className="flex justify-center mt-32">
      {allFeatures.map((item, index) => (
        <button
          onClick={() => {
            setCurrentFeature(item.featureID);
          }}
          className={`w-32 border-2 rounded-lg text-center ${
            item.featureID === currentFeature ? "bg-slate-400" : "bg-slate-600"
          } `}
          key={index}
        >
          Feature{index + 1}
        </button>
      ))}
      <button
        className="absolute right-40 mx-3  w-28 border-2 rounded-lg bg-blue-300"
        onClick={addFeature}
      >
        增加影片
      </button>
    </div>
  );

  return (
    <div className="wrap">
      <Header userState={"editing"} />
      {allTabs}
      <Booking
        userUID={props.userUID}
        locations={festivalLocations}
        period={festivalPeriod}
        allFeatures={allFeatures}
        current={currentFeature}
      />
      <div className="flex justify-center my-8">
        <button className="w-28 p-2 mx-2 border-2 rounded-lg bg-red-300">
          刪除影片
        </button>
        <button className="w-28 p-2 mx-2 border-2 rounded-lg bg-blue-300">
          儲存本頁
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Features;
