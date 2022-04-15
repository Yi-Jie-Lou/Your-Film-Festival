import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, firebase } from "../utils/firebase-config";
import "../css/TimePicker.css";

function Booking(props) {
  const emptyTimetable = {
    date: "",
    start: "10:00",
    end: "12:00",
    location: "",
    opening: false,
    closing: false,
    name: "",
    timetableID: "",
    workshop: false,
  };
  const [timetable, setTimetable] = useState([emptyTimetable]);
  const [festivalLocations, setFestivalLocations] = useState([]);
  const [festivalPeriod, setFestivalPeriod] = useState();
  const [currentFeature, setCurrentFeature] = useState();
  const [allFeatures, setAllFeatures] = useState();

  const addTimetable = () => {
    setTimetable([...timetable, emptyTimetable]);
  };

  const deleteTimetable = (index) =>{
    const newTimetable = [...timetable];
    newTimetable.splice(index,1)
    setTimetable(newTimetable);

    const newFeatures = [...allFeatures]
    const editNum = newFeatures.findIndex(item => item.featureID === currentFeature )
    newFeatures[editNum].timetable.splice(index,1)
    setAllFeatures(newFeatures)
  }

  const check = (index, timetableID) => {
    console.log(timetable[index]);
    if (props.userUID) {
      // firebase.updateTimetable(props.userUID, timetable[index], timetableID);
      alert("場次沒有重複!")
    }
  };

  const handleChange = (value, index, key) => {
    const newTimetable = [...timetable];
    newTimetable[index][key] = value;
    setTimetable(newTimetable);

    const newFeatures = [...allFeatures]
    const editNum = newFeatures.findIndex(item => item.featureID === currentFeature )
    newFeatures[editNum].timetable = newTimetable
    setAllFeatures(newFeatures)
  };

  async function saveToFirebase() {
    if (props.userUID) {
      const newFeatureRef = doc(
        collection(db, `users/${props.userUID}/features`)
      );
      await setDoc(newFeatureRef, {
        featureID: newFeatureRef,
      })
        .then(() => {
          alert("儲存成功!");
        })
        .catch((rej) => {
          console.log(rej);
        });
    }
  }
  useEffect(() => {

    if (props.userUID) {
      console.log(props.allFeatures, props.locations, props.current);
      setFestivalLocations(props.locations);
      setFestivalPeriod(props.period);
      setCurrentFeature(props.current);
    }
  }, [props]);

  useEffect(() => {
    if (props.userUID) {
      console.log(props.allFeatures);
      setAllFeatures(props.allFeatures);
    }
  }, [props.allFeatures]);

  useEffect(() => {
    if (props.userUID) {
      const current = allFeatures.filter(
        (item) => item.featureID === currentFeature
      );
      setTimetable(current[0].timetable);
    }
  }, [currentFeature]);

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
                defaultValue={item.date}
                className="w-32 h-10 border-2 rounded text-center"
                onChange={(event) =>
                  handleChange(event.target.value, index, "date")
                }
              >
                {festivalPeriod &&
                  festivalPeriod.map((day, index) => (
                    <option key={index} value={day.dates}>
                      {day.displayDates}
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
                {festivalLocations &&
                  festivalLocations.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col justify-around px-5">
              <p>開始時間:</p>
              <p>結束時間:</p>
            </div>

            <div className="flex flex-col">
              <TimePicker
                className={"h-10 border-2 bor rounded text-center"}
                clearIcon={null}
                disableClock={true}
                onChange={(value) => handleChange(value, index, "start")}
                value={item.start || ""}
              />
              <TimePicker
                className={"h-10 border-2 bor rounded text-center"}
                clearIcon={null}
                disableClock={true}
                onChange={(value) => handleChange(value, index, "end")}
                value={item.end || ""}
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
                  onClick={()=>deleteTimetable(index)}
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
