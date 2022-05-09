import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { useSelector, useDispatch } from "react-redux";
import { updateFeatures } from "../actions";
import "../css/TimePicker.css";

function Booking() {
  const dispatch = useDispatch();
  const period = useSelector((state) => state.festivalPeriod);
  const locations = useSelector((state) => state.festivalLocations);
  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [timetable, setTimetable] = useState([]);

  const addTimetable = () => {
    const emptyTimetable = {
      date: "default",
      start: "10:00",
      end: "12:00",
      location: "default",
      opening: false,
      closing: false,
      name: "",
      workshop: false,
      featureID: currentTab,
    };

    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex].timetable = [...timetable, emptyTimetable];
    dispatch(updateFeatures(newFeatures));
  };

  const deleteTimetable = (index) => {
    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex].timetable.splice(index, 1);
    dispatch(updateFeatures(newFeatures));
  };

  const handleChange = (value, index, key) => {
    const newFeatures = [...features];
    const newTimetable = [...timetable];
    newTimetable[index][key] = value;
    const editNum = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editNum].timetable = newTimetable;
    dispatch(updateFeatures(newFeatures));
  };

  useEffect(() => {
    if (!currentTab) return;
    const current = features.filter((item) => item.featureID === currentTab);
    setTimetable(current[0].timetable);
  }, [currentTab, features]);

  return (
    <div>
      <div className="w-11/12 mt-14 mx-auto  pb-16 border-b-2 border-b-zinc-400">
        <div className="flex mb-8">
          <h2 className="vertical "> <span className="text-2xl text-slate-600 ml-1">場次時刻表</span></h2>
          <button
            className="button-blue mx-3 h-10 w-24 "
            onClick={addTimetable}
          >
            Add
          </button>
        </div>
        {timetable.map((item, index) => (
          <div
            className="flex justify-between flex-wrap w-3/4 mt-6 mx-auto"
            key={index}
          >
            <h2 className="w-full my-3 text-lg ml-1">場次{index + 1}</h2>
            <div className="flex flex-col">
              <select
                value={item.date}
                className="mb-2 w-32 h-10 border-4 rounded-xl text-center border-[#94bed1]"
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
                className="w-32 h-10 border-4 rounded-xl text-center border-[#94bed1]"
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
                className={"mb-2  h-10 border-4 rounded-xl text-center border-[#94bed1]"}
                clearIcon={null}
                disableClock={true}
                onChange={(value) => handleChange(value, index, "start")}
                value={item.start || ""}
                locale={"en-EN"}
              />
              <TimePicker
                className={"h-10 border-4 rounded-xl text-center border-[#94bed1]"}
                clearIcon={null}
                disableClock={true}
                onChange={(value) => handleChange(value, index, "end")}
                value={item.end || ""}
                locale={"en-EN"}
              />
            </div>
            <div className="flex">
              <div className="vertical">
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
              <div className="vertical mx-4">
                <button
                  className="button-red  h-10 w-24 "
                  onClick={() => deleteTimetable(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
