import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import uniqid from "uniqid";

import Creator from "../components/Creator";
import FilmContent from "../components/FilmContent";
import Booking from "../components/Booking";
import Note from "../components/Note";
import { firebase } from "../utils/firebase-config";
import { saveAlert, errorAlert } from "../utils/customAlert";
import { updateFeatures, switchTab } from "../actions";
import BlueCloudImg from "../img/BlueCloud.png";
import PuzzleImg from "../img/Puzzle.png";

function Features() {
  const dispatch = useDispatch();
  const features = useSelector((state) => state.features);
  const currentTab = useSelector((state) => state.currentTab);
  const userID = useSelector((state) => state.userID);
  const navigate = useNavigate();


  const addFeature = () => {
    const newID = uniqid();
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
          featureID: newID,
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

  const saveFeatures = () => {
    const newFeatures = [...features];
    let isError = false;

    newFeatures.forEach((film) => {
      if (
        !film.color.trim() ||
        !film.language.trim() ||
        !film.year.trim() ||
        !film.format.trim() ||
        !film.length.trim() ||
        !film.title.trim() ||
        !film.nation.trim() ||
        !film.commercialInfo.trim()
      ) {
        isError = true;
      }

      film.creators.forEach((creator) => {
        if (!creator.name.trim() || !creator.info.trim()) {
          isError = true;
        }
      });
    });

    if (isError) {
      errorAlert("必填欄位不可以是空白的噢", PuzzleImg);
      return;
    }

    newFeatures.forEach((film) => {
      film.timetable.forEach((timetable) => {
        timetable.name = film.title;
        timetable.featureID = film.featureID;
        timetable.img = film.featureImgs[2];
      });
    });

    dispatch(updateFeatures(newFeatures));
    firebase.saveFeatures(userID, features).then((_) => {
      saveAlert(
        "影片都上傳完畢了嗎\n接著我們來發布影展公告吧",
        BlueCloudImg
      ).then((res) => {
        if (res.isConfirmed) {
          navigate("/backstage/news");
        }
      });
    });
  };

  return (
    <div className="wrap ">
      <div className="w-9/12 mx-auto">
        <button className="w-36 button-blue mt-32 mb-3 ml-2" onClick={addFeature}>
          增加影片
        </button>
      </div>
      <div className="flex flex-wrap w-9/12 mx-auto justify-start ">
        {features.map((item, index) => (
          <button
            onClick={() => {
              dispatch(switchTab(item.featureID));
            }}
            className={`w-[calc((100%-96px)/6)] button-orange mx-2 mt-2 ${
              item.featureID === currentTab ? "bg-[#f4cd7f]" : "bg-[#eb9666]"
            } `}
            key={index}
          >
            電影 {index + 1}
          </button>
        ))}
      </div>
      <FilmContent />
      <Creator />
      <Booking />
      <Note />
      <div className="flex justify-center my-24">
        <button className="button-red w-28 p-2 mx-2" onClick={deleteFeature}>
          刪除影片
        </button>
        <button onClick={saveFeatures} className="button-blue w-28 p-2 mx-2">
          儲存本頁
        </button>
      </div>
    </div>
  );
}

export default Features;
