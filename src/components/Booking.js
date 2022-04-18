import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { useSelector, useDispatch } from "react-redux";
import { getFeatures } from "../actions";
import "../css/TimePicker.css";

function Booking() {
  const dispatch = useDispatch();
  const period = useSelector((state) => state.festivalPeriod);
  const locations = useSelector((state) => state.festivalLocations);
  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);

  const emptyTimetable = {
    date: "default",
    start: "10:00",
    end: "12:00",
    location: "default",
    opening: false,
    closing: false,
    name: "",
    timetableID: "",
    workshop: false,
  };
  const [timetable, setTimetable] = useState([]);

  const addTimetable = () => {
    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex].timetable = [...timetable, emptyTimetable];
    dispatch(getFeatures(newFeatures));
  };

  const deleteTimetable = (index) => {
    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex].timetable.splice(index, 1);
    dispatch(getFeatures(newFeatures));
  };

  const handleChange = (value, index, key) => {
    const newFeatures = [...features];
    const newTimetable = [...timetable];
    newTimetable[index][key] = value;
    const editNum = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editNum].timetable = newTimetable;
    dispatch(getFeatures(newFeatures));
  };

  const check = (index) => {
    console.log(timetable[index]);
    alert("場次沒有重複!");
  };

  useEffect(() => {
    if (currentTab) {
      const current = features.filter((item) => item.featureID === currentTab);
      setTimetable(current[0].timetable);
    }
  }, [currentTab, features]);

  return (
    <div>
      <div className="w-11/12 mt-14 mx-auto">
        <div className="flex">
          <h2 className="my-1 text-lg ml-1">場次時刻表</h2>
          <button
            className="mx-3  w-28 border-2 rounded-lg bg-blue-300"
            onClick={addTimetable}
          >
            Add
          </button>
        </div>
        {timetable.map((item, index) => (
          <div
            className="flex justify-between flex-wrap w-2/3 mt-3 mx-auto"
            key={index}
          >
            <h2 className="w-full my-3 text-lg ml-1">場次{index + 1}</h2>
            <div className="flex flex-col">
              <select
                value={item.date}
                className="mb-2 w-32 h-10 border-2 rounded text-center"
                onChange={(event) =>
                  handleChange(event.target.value, index, "date")
                }
              >
                <option value={"default"}>請選擇時間</option>
                {period.map((item, index) => (
                  <option key={index} value={item.dates}>
                    {item.displayDates}
                  </option>
                ))}
              </select>
              <select
                className="w-32 h-10 border-2 rounded text-center"
                onChange={(event) =>
                  handleChange(event.target.value, index, "location")
                }
                value={item.location || ""}
              >
                <option value={"default"}>請選擇地點</option>
                {locations.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-around px-5">
              <p className="m1-2 ">開始時間:</p>
              <p className="mt-1 ">結束時間:</p>
            </div>
  

            <div className="flex flex-col">
            {/* <Select /> */}
              <TimePicker
                className={"mb-2  h-10 border-2 bor rounded text-center"}
                clearIcon={null}
                disableClock={true}
                onChange={(value) => handleChange(value, index, "start")}
                value={item.start || ""}
                locale={"en-EN"}
              />
              <TimePicker
                className={"h-10 border-2 bor rounded text-center"}
                clearIcon={null}
                disableClock={true}
                onChange={(value) => handleChange(value, index, "end")}
                value={item.end || ""}
                locale={"en-EN"}
              />
            </div>
            <div className="flex flex-col justify-around">
              <div className="flex justify-center">
                <button
                  className="mx-3 w-28 border-2 rounded-lg bg-blue-300"
                  onClick={() => {
                    check(index, item.timetableID);
                  }}
                >
                  Check
                </button>
                <button
                  className="mx-3 w-28 border-2 rounded-lg bg-red-300"
                  onClick={() => deleteTimetable(index)}
                >
                  Delete
                </button>
              </div>
              <div>
                <input
                  className="ml-2"
                  checked={item.opening}
                  onChange={(event) =>
                    handleChange(event.target.checked, index, "opening")
                  }
                  type="checkbox"
                />
                <label className="ml-2">開幕片</label>
                <input
                  className="ml-2"
                  checked={item.closing}
                  onChange={(event) =>
                    handleChange(event.target.checked, index, "closing")
                  }
                  type="checkbox"
                />
                <label className="ml-2">閉幕片</label>
                <input
                  className="ml-2"
                  checked={item.workshop}
                  onChange={(event) =>
                    handleChange(event.target.checked, index, "workshop")
                  }
                  type="checkbox"
                />
                <label className="ml-2">影人出席</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
