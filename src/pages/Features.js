import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import { collection, doc, setDoc} from "firebase/firestore";
import { db, firebase } from "../utils/firebase-config";
import ReactPaginate from "react-paginate";


function Features(props) {
  const emptyTimetable = {
    date: "",
    start: "10:00",
    end: "12:00",
    location: "",
    opening: false,
    closing: false,
    name:"",
    timetableID: ""
  };
  const [timetable, setTimetable] = useState([emptyTimetable]);
  const [festivalData, setFestivalData] = useState([]);
  const [festivalPeriod, setFestivalPeriod] = useState();

  const addTimetable = () => {
    firebase.getNewTimetableID(props.userUID).then(res => {
      emptyTimetable.timetableID = res
    })
    setTimetable([...timetable, emptyTimetable]);
  };

  const booking = (index, timetableID) => {
    console.log(timetable[index])
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
      firebase.readTimetables(props.userUID, "D1un6IeOE3k2cv3Vglo3").then((res) => {
        setTimetable(res)})

   

    }
  }, [props.userUID]);



  return (
    <div>
      {timetable.map((item, index) => (
        <div className="wrap" key={index}>
          <select
            onChange={(event) =>
              handleChange(event.target.value, index, "date")
            }
          >
            {festivalPeriod &&
              festivalPeriod.map((item, index) => (
                <option key={index} value={item.dates}>
                  {item.displayDates}
                </option>
              ))}
          </select>
          <TimePicker
            clearIcon={null}
            disableClock={true}
            onChange={(value) => handleChange(value, index, "start")}
            value={item.start || ""}
          />
          <TimePicker
            clearIcon={null}
            disableClock={true}
            onChange={(value) => handleChange(value, index, "end")}
            value={item.end || ""}
          />
          <select
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
          <button
            onClick={() => {
              booking(index, item.timetableID);
            }}
          >
            booking
          </button>
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
