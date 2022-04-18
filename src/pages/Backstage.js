import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
} from "../actions";
import { useDispatch, useSelector } from "react-redux";

function BackstageContainer(props) {
  const dispatch = useDispatch();
  const festivalName = useSelector((state) => state.festivalName);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [theather, setTheather] = useState([{ name: "" }]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const saveToFirebase = () => {
    if (!props.userUID) return;
    updateDoc(doc(db, "users", props.userUID), {
      locations: theather.map((item) => item.name),
      festivalPeriod: getAvailableDates(),
      festivalPathName,
      festivalName,
    }).then(() => {
      dispatch(updatePeriod(getAvailableDates()));
      dispatch(updateLocations(theather.map((item) => item.name)));
      alert("儲存成功!");
    });
  };

  const handleChange = (i, e) => {
    const newTheather = [...theather];
    newTheather[i].name = e.target.value;
    setTheather(newTheather);
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
    setTheather([...theather, { name: "" }]);
    getAvailableDates();
  };

  const onChangeName = (e) => {
    dispatch(updateFestivalName(e.target.value));
  };
  const onChangePathName = (e) => {
    dispatch(updateFestivalPathName(e.target.value));
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex border-b-2">
        <DateRangePicker
          className="mx-auto mt-28"
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
      </div>

      <div className="flex flex-col content-center mx-auto my-8 border-b-2">
        <h2 className="text-center text-lg divide-y-4 divide-gray-400">
          播映戲院
        </h2>
        <div className="flex justify-center">
          <button
            className="mx-3 my-12 w-28 border-2 rounded-lg bg-blue-300"
            onClick={addTheather}
          >
            增加戲院
          </button>
        </div>
        {theather.map((item, index) => (
          <div className="flex justify-center mb-12" key={index}>
            <label className="mr-4  my-8">戲院{index + 1}</label>
            <input
              className="pl-2 my-8 border-2 rounded-lg"
              type="text"
              value={item.name || ""}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-16">
        <div className="flex  justify-between w-96  my-8 mx-auto">
          <h2 className=" text-center text-lg divide-y-4 divide-gray-400">
            影展名稱
          </h2>
          <input
            className="pl-2 border-2 rounded-lg"
            type="text"
            value={festivalName}
            onChange={(e) => onChangeName(e)}
          />
        </div>
        <div className="flex justify-between w-96 my-8  mx-auto">
          <h2 className=" text-center text-lg divide-y-4 divide-gray-400">
            影展英文名稱
          </h2>
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

function Backstage(props) {
  return (
    <>
      <Header userState={"editing"} />
      <BackstageContainer userUID={props.userUID} />
      <Footer />
    </>
  );
}

export default Backstage;
