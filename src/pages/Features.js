import React from "react";
import Booking from "../components/Booking";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { firebase } from "../utils/firebase-config";
import { getFeatures } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { switchTab } from "../actions";

function Features(props) {
  const dispatch = useDispatch();
  const features = useSelector((state) => state.features);
  const currentTab = useSelector((state) => state.currentTab);
  const period = useSelector((state) => state.festivalPeriod);
  const locations = useSelector((state) => state.festivalLocations);
  const userID = useSelector(state => state.userID)
  
  const addFeature = () => {
    const emptyFeature = {
      featureID: "featureC",
      timetable: [
        {
          date: "",
          start: "10:00",
          end: "12:00",
          location: "",
          opening: false,
          closing: false,
          name: "",
          timetableID: "",
          workshop: false,
        },
      ],
    };
    const newFeatures = [...features, emptyFeature];
    dispatch(getFeatures(newFeatures));
  };

  return (
    <div className="wrap">
      <Header userState={"editing"} />
      <div className="flex justify-center mt-32">
        {features.map((item, index) => (
          <button
            onClick={() => {
              dispatch(switchTab(item.featureID));
            }}
            className={`w-32 border-2 rounded-lg text-center ${
              item.featureID === currentTab ? "bg-slate-400" : "bg-slate-600"
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
      <Booking
        userUID={props.userUID}
        locations={locations}
        period={period}
        allFeatures={features}
        current={currentTab}
      />
      <div className="flex justify-center my-8">
        <button className="w-28 p-2 mx-2 border-2 rounded-lg bg-red-300">
          刪除影片
        </button>
        <button onClick={() => firebase.saveFeatures(userID, features)} className="w-28 p-2 mx-2 border-2 rounded-lg bg-blue-300">
          儲存本頁
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Features;
