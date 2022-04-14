import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import { collection, doc, setDoc} from "firebase/firestore";
import { db, firebase } from "../utils/firebase-config";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ReactPaginate from "react-paginate";

const moment = extendMoment(Moment);

function Features(props) {
  const emptyTimetable = {
    date: "",
    start: "10:00",
    end: "12:00",
    location: "",
    opening: false,
    closing: false,
  };
  const [timetable, setTimetable] = useState([emptyTimetable]);
  const [festivalData, setFestivalData] = useState([]);
  const [festivalPeriod, setFestivalPeriod] = useState();

  const addTimetable = () => {
    setTimetable([...timetable, emptyTimetable]);
  };

  const booking = (index) => {
    if (props.userUID) {
      firebase.updateFeaturesData(props.userUID, timetable[index], "D1un6IeOE3k2cv3Vglo3"/*props.featureID*/);
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
        timetable: timetable,
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
    if (festivalData.start) {
      const startDate = moment(festivalData.start.toDate());
      const endDate = moment(festivalData.end.toDate());
      const dateRange = moment.range(startDate, endDate);
      const dateArray = Array.from(dateRange.by("days"));
      const availableDates = dateArray.map((item) => {
        return (item = [
          item.format("YYYY ddd MM/DD"),
          item.format("YYYY-MM-DD"),
        ]);
      });

      setFestivalPeriod(availableDates);
    }
  }, [festivalData]);

  useEffect(() => {
    if (props.userUID) {
      firebase.readFestivalData(props.userUID).then((res) => {
        console.log("keep mind!");
        const festivalData = {
          start: res.festivalStart,
          end: res.festivalEnd,
          locations: res.locations,
        };
        setFestivalData(festivalData);
      });
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
                <option key={index} value={item[1]}>
                  {item[0]}
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
              booking(index);
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
