import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DateRangePicker } from "react-date-range";
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
import useRoutePush from "../hooks/useRoutePush";
import PuzzleImg from "../img/Puzzle.png";
import { errorAlert } from "../utils/customAlert";

function Backstage() {
  const dispatch = useDispatch();
  const routerHandler = useRoutePush();
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

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const checkInputValue = () => {
    let isError = false;
    locations.forEach((loaction) => {
      if (!loaction.trim()) {
        isError = true;
      }
    });

    if (isError) {
      errorAlert("舉辦地點不可以是空白的噢", PuzzleImg);
      return isError;
    }

    if (!festivalName.trim() || !festivalPathName.trim()) {
      errorAlert("請填寫影展名稱", PuzzleImg);
      isError = true;
      return isError;
    }
    return isError;
  };

  const saveToFirebase = () => {
    if (!userID) return;
    const isError = checkInputValue();
    if (isError) return;

    const festivalObj = {
      locations,
      festivalPeriod: getAvailableDates(),
      festivalPathName,
      festivalName,
      festivalPost,
      festivalLogo,
      festivalStart: startDate,
      festivalEnd: endDate,
    };

    firebase
      .saveFestivalDetail(userID, festivalObj)
      .then(() => {
        dispatch(updatePeriod(getAvailableDates()));
      })
      .then((_) => {
        routerHandler(
          "您已經完成第一步囉\n接著來上傳影片吧",
          "/backstage/features"
        );
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

  const deleteTheather = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
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
    <div className="w-11/12  mx-auto mt-40">
      <div className="flex flex-col flex-wrap border-b-2  border-b-zinc-400 ">
        <h2 className="mx-auto mb-8 text-center text-2xl text-slate-600 ">
          舉辦日期
        </h2>
        <DateRangePicker
          className="mx-auto mb-4"
          ranges={[selectionRange]}
          onChange={handleSelect}
          preview={{
            startDate: new Date(festivalStart.seconds * 1000),
            endDate: new Date(festivalEnd.seconds * 1000),
          }}
        />
      </div>

      <div className="flex flex-col content-center mx-auto my-16 border-b-2 border-b-zinc-400">
        <h2 className="mx-auto mb-4 text-center text-2xl text-slate-600 ">
          播映戲院
        </h2>
        <div className="flex justify-center">
          <button
            className="button-blue w-48 mx-3 my-12 "
            onClick={addTheather}
          >
            增加戲院
          </button>
        </div>
        {locations &&
          locations.map((item, index) => (
            <div className="flex justify-center mb-12" key={index}>
              <div className="vertical">
                <label className="mr-6 text-xl my-8 text-slate-600 ">
                  戲院{index + 1}
                </label>
              </div>
              <input
                className="pl-2 h-12 my-8 border-4 rounded-lg border-[#94bed1] outline-none"
                type="text"
                value={item}
                onChange={(e) => handleChange(index, e)}
              />
              <div className="vertical ml-2">
                <button
                  className="button-red"
                  onClick={() => {
                    deleteTheather(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-col mt-16">
        <div className="flex  justify-between w-96 my-8 mx-auto">
          <h2 className="flex flex-col justify-center w-32  text-2xl text-slate-600  ">
            <span>LOGO</span>
          </h2>

          <label
            className={`vertical w-48   text-center align-middle cursor-pointer ${
              festivalLogo ? "" : "button-blue"
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
          <h2 className="flex flex-col justify-center w-32  text-2xl text-slate-600 ">
            <span>主視覺海報</span>
          </h2>

          <label
            className={`vertical w-48 text-center align-middle cursor-pointer ${
              festivalPost ? "" : "button-blue"
            }`}
            htmlFor={`festival_post`}
          >
            {festivalPost ? "" : <span>上傳</span>}
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
        <div className="flex  justify-between w-96  my-8 mx-auto ">
          <h2 className="vertical text-center  text-2xl text-slate-600">
            <span>影展名稱</span>
          </h2>
          <input
            className="pl-2 border-4 h-12 rounded-lg border-[#94bed1] outline-none "
            type="text"
            value={festivalName}
            onChange={(e) => onChangeName(e)}
          />
        </div>
        <div className="flex justify-between w-96 my-8  mx-auto ">
          <h2 className="vertical text-center text-2xl text-slate-600">
            <span>影展英文名稱</span>
          </h2>
          <input
            className="pl-2 border-4 h-12 rounded-lg border-[#94bed1] outline-none"
            type="text"
            value={festivalPathName}
            onChange={(e) => onChangePathName(e)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className=" my-24 w-28 button-blue  mx-0"
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
