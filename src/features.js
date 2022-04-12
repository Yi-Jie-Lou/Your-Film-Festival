import React, { useState } from "react";
import TimePicker from "react-time-picker";
import styles from "./css/features.module.css";
import { collection, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./utils/firebase-config";

function Features(props) {
  const firebaseTimetable = {
    start: "10:00",
    end: "12:00",
    loaction: "",
    opening: false,
    closing: false,
  };
  const [timetable, setTimetable] = useState([firebaseTimetable]);

  const addTimetable = () => {
    setTimetable([...timetable, firebaseTimetable]);
  };

  const handleChangeStartTime = (value, index) => {
    const newTimetable = [...timetable];
    newTimetable[index].start = value;
    setTimetable(newTimetable);
  };
  const handleChangeEndTime = (value, index) => {
    const newTimetable = [...timetable];
    newTimetable[index].end = value;
    setTimetable(newTimetable);
  };

  async function saveToFirebase() {
    if (props.userUID) {
      const newFeatureRef = doc(collection(db, `users/${props.userUID}/features`));
      await setDoc(
        newFeatureRef,
        {
          timetable: timetable,
          featureID: newFeatureRef
        }
      )
        .then(() => {
          alert("儲存成功!");
        })
        .catch((rej) => {
          console.log(rej);
        });
    }
  }
  return (
    <div>
      {timetable.map((item, index) => (
        <div className="wrap" key={index}>
          <TimePicker
            clearIcon={null}
            disableClock={true}
            onChange={(value) => handleChangeStartTime(value, index)}
            value={item.start || ""}
          />
          <TimePicker
            clearIcon={null}
            disableClock={true}
            onChange={(value) => handleChangeEndTime(value, index)}
            value={item.end || ""}
          />
        </div>
      ))}
      <div className="wrap">
        <button onClick={saveToFirebase}>儲存本頁</button>
        <button onClick={addTimetable}>增加場次</button>
      </div>
    </div>
  );
}
export default Features;
