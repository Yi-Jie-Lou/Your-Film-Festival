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
  const [festivalData, setFestivalData] = useState([]);
  const [festivalPeriod, setFestivalPeriod] = useState();

  const addTimetable = () => {
    firebase.getNewTimetableID(props.userUID).then((res) => {
      emptyTimetable.timetableID = res;
    });
    setTimetable([...timetable, emptyTimetable]);
  };

  const booking = (index, timetableID) => {
    console.log(timetable[index]);
    if (props.userUID) {
      firebase.updateTimetable(props.userUID, timetable[index], timetableID);
    }
  };

  const handleChange = (value, index, key) => {
    const newTimetable = [...timetable];
    newTimetable[index][key] = value;
    setTimetable(newTimetable);
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
      firebase.readFestivalData(props.userUID).then((res) => {
        console.log("keep mind!");
        const festivalData = {
          locations: res.locations,
        };
        setFestivalData(festivalData);
        setFestivalPeriod(res.festivalPeriod);
      });
      firebase
        .readTimetables(props.userUID, "D1un6IeOE3k2cv3Vglo3")
        .then((res) => {
          setTimetable(res);
        });
    }
  }, [props.userUID]);

  return (
    <div>
      <div className="w-11/12 mt-28 mx-auto">
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
                  {festivalData.locations &&
                    festivalData.locations.map((item, index) => (
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
                      booking(index, item.timetableID);
                    }}
                  >
                    Booking
                  </button>
                  <button
                    className="mx-3 w-28 border-2 rounded-lg bg-red-300"
                    onClick={addTimetable}
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
