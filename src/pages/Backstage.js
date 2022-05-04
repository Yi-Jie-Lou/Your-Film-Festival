import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import Moment from "moment";
import { extendMoment } from "moment-range";
import {
  updateFestivalName,
  updateLocations,
  updatePeriod,
  updateFestivalPathName,
  updateFestivalPost,
  updateFestivalLogo,
} from "../actions";
import { firebase } from "../utils/firebase-config";
import { useDispatch, useSelector } from "react-redux";

function Backstage() {
  const dispatch = useDispatch();
  const festivalName = useSelector((state) => state.festivalName);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const festivalPost = useSelector((state) => state.festivalPost);
  const festivalLogo = useSelector((state) => state.festivalLogo);
  const festivalStart = useSelector((state) => state.festivalStart);
  const festivalEnd = useSelector((state) => state.festivalEnd);
  const locations = useSelector((state) => state.festivalLocations);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const userID = useSelector((state) => state.userID);
  const state = useSelector((state) => state.state);

  if (state === "logout"){
    alert("請先登入")
    window.location = "https://your-film-festival-d2cd4.web.app/"
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const saveToFirebase = () => {
    if (!userID) return;
    updateDoc(doc(db, "users", userID), {
      locations,
      festivalPeriod: getAvailableDates(),
      festivalPathName,
      festivalName,
      festivalPost,
      festivalLogo,
      festivalStart: startDate,
      festivalEnd: endDate,
    }).then(() => {
      dispatch(updatePeriod(getAvailableDates()));
      alert("儲存成功!");
    });
  };

  const handleChange = (i, e) => {
    const newLocations = [...locations];
    newLocations[i] = e.target.value;
    dispatch(updateLocations(newLocations));
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const getAvailableDates = () => {
    const moment = extendMoment(Moment);

    const dateRange = moment.range(moment(startDate), moment(endDate));
    const dateArray = Array.from(dateRange.by("days"));
    const availableDates = dateArray.map((item) => {
      return (item = {
        displayDates: item.format("ddd MM/DD"),
        dates: item.format("YYYY-MM-DD"),
      });
    });
    return availableDates;
  };

  const addTheather = () => {
    const newLocations = [...locations, ""];
    dispatch(updateLocations(newLocations));
  };

  const preview = async (e, key) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      switch (key) {
        case "logo":
          return dispatch(updateFestivalLogo(uploadUrl));
        case "post":
          return dispatch(updateFestivalPost(uploadUrl));
        default:
          return;
      }
    });
  };

  const onChangeName = (e) => {
    dispatch(updateFestivalName(e.target.value));
  };
  const onChangePathName = (e) => {
    dispatch(updateFestivalPathName(e.target.value));
  };

  return (
    <div className="w-11/12  mx-auto">
      <div className="flex flex-col flex-wrap border-b-2 mt-28 border-b-zinc-400">
        <h2 className="mx-auto mb-8 text-center text-lg  ">舉辦日期</h2>
        <DateRangePicker
          className="mx-auto mb-4"
          ranges={[selectionRange]}
          onChange={handleSelect}
          preview={{ startDate: new Date(festivalStart.seconds*1000), endDate: new Date(festivalEnd.seconds*1000)}}
        />
      </div>

      <div className="flex flex-col content-center mx-auto my-16 border-b-2 border-b-zinc-400">
        <h2 className="text-center text-lg">播映戲院</h2>
        <div className="flex justify-center">
          <button
            className="mx-3 my-12 w-28 border-2 rounded-lg bg-blue-300"
            onClick={addTheather}
          >
            增加戲院
          </button>
        </div>
        {locations &&
          locations.map((item, index) => (
            <div className="flex justify-center mb-12" key={index}>
              <label className="mr-4  my-8">戲院{index + 1}</label>
              <input
                className="pl-2 my-8 border-2 rounded-lg"
                type="text"
                value={item}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          ))}
      </div>

      <div className="flex flex-col mt-16">
        <div className="flex  justify-between w-96 my-8 mx-auto">
          <h2 className="flex flex-col justify-center w-32  text-2xl text-zinc-700">
            <span>LOGO</span>
          </h2>

          <label
            className={`block  w-60   cursor-pointer  border-2  rounded-lg  text-center align-middle  text-white ${
              festivalLogo ? "" : "bg-blue-400"
            } `}
            htmlFor={`festival_logo`}
          >
            {festivalLogo ? "" : "上傳"}
            {festivalLogo && (
              <img
                className="  border-0 object-cover mr-0"
                src={festivalLogo}
              />
            )}
            <input
              id={`festival_logo`}
              className="hidden border-1 "
              type="file"
              accept="image/*"
              onChange={(e) => preview(e, "logo")}
            />
          </label>
        </div>
        <div className="flex justify-between w-96 my-8  mx-auto">
          <h2 className="flex flex-col justify-center w-32  text-2xl text-zinc-700">
            <span>主視覺海報</span>
          </h2>

          <label
            className="block  w-60   cursor-pointer  border-2  rounded-lg  text-center align-middle  text-white bg-blue-400 "
            htmlFor={`festival_post`}
          >
            {festivalPost ? "" : "上傳"}
            {festivalPost && (
              <img
                className="  border-0 object-cover mr-0"
                src={festivalPost}
              />
            )}
            <input
              id={`festival_post`}
              className="hidden border-1 "
              type="file"
              accept="image/*"
              onChange={(e) => preview(e, "post")}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col mt-16">
        <div className="flex  justify-between w-96  my-8 mx-auto">
          <h2 className=" text-center text-lg ">影展名稱</h2>
          <input
            className="pl-2 border-2 rounded-lg"
            type="text"
            value={festivalName}
            onChange={(e) => onChangeName(e)}
          />
        </div>
        <div className="flex justify-between w-96 my-8  mx-auto">
          <h2 className=" text-center text-lg">影展英文名稱</h2>
          <input
            className="pl-2 border-2 rounded-lg"
            type="text"
            value={festivalPathName}
            onChange={(e) => onChangePathName(e)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className=" my-12 w-28 border-2 rounded-lg bg-blue-300"
            onClick={saveToFirebase}
          >
            儲存本頁
          </button>
        </div>
      </div>
    </div>
  );
}

export default Backstage;
