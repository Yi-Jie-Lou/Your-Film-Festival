import React from "react";
import Creator from "../components/Creator";
import FilmContent from "../components/FilmContent";
import Booking from "../components/Booking";
import Note from "../components/Note";
import { firebase } from "../utils/firebase-config";
import { updateFeatures } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { switchTab } from "../actions";
import uniqid from "uniqid";

function Features() {
  const dispatch = useDispatch();
  const features = useSelector((state) => state.features);
  const currentTab = useSelector((state) => state.currentTab);
  const userID = useSelector((state) => state.userID);
  const state = useSelector((state) => state.state);

  if (state === "logout"){
    alert("請先登入")
    window.location = "https://your-film-festival-d2cd4.web.app/"
  }

  const addFeature = () => {
    const newID = uniqid() 
    const emptyFeature = {
      featureID: newID,
      timetable: [
        {
          date: "",
          start: "10:00",
          end: "12:00",
          location: "",
          opening: false,
          closing: false,
          name: "",
          img: "",
          workshop: false,
          featureID: newID
        },
      ],
      creators: [{ img: "", info: "", name: "" }],
      featureImgs: ["", "", ""],
      format: "",
      color: "",
      nation: "",
      year: "",
      language: "",
      length: "",
      title: "",
      shortInfo: "",
      longInfo: "",
      commercialInfo: "",
      note: "",
      important: false,
    };
    const newFeatures = [...features, emptyFeature];
    dispatch(updateFeatures(newFeatures));
  };

  const deleteFeature = () => {
    if (features.length === 1) return;
    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures.splice(editIndex, 1);
    dispatch(updateFeatures(newFeatures));
    dispatch(switchTab(newFeatures[0].featureID));
  };

  const saveFeatures = () =>{
    const newFeatures = [...features]
    newFeatures.forEach(film =>{
      film.timetable.forEach(timetable =>{
        timetable.name = film.title
        timetable.featureID = film.featureID
        timetable.img = film.featureImgs[2]
      })
    })
    dispatch(updateFeatures(newFeatures));
    firebase.saveFeatures(userID, features)
  }



  return (
    <div className="wrap">

      <div className="flex flex-wrap justify-center mt-32 ">
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
          className="absolute right-10 mx-3  w-28 border-2 rounded-lg bg-blue-300"
          onClick={addFeature}
        >
          增加影片
        </button>
      </div>
      <FilmContent />
      <Creator />
      <Booking />
      <Note />
      <div className="flex justify-center my-8">
        <button
          className="w-28 p-2 mx-2 border-2 rounded-lg bg-red-300"
          onClick={deleteFeature}
        >
          刪除影片
        </button>
        <button
          onClick={saveFeatures}
          className="w-28 p-2 mx-2 border-2 rounded-lg bg-blue-300"
        >
          儲存本頁
        </button>
      </div>
    </div>
  );
}

export default Features;
