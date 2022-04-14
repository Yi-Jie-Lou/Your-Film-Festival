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


function BackstageContainer(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [theather, setTheather] = useState([{ name: "" }]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  async function saveToFirebase() {
    if (props.userUID) {
      await updateDoc(doc(db, "users", props.userUID), {
        locations: theather.map( (item) => (item.name)),
        festivalPeriod: getAvailableDates()
      }).then(() => {
        alert("儲存成功!");
      });
    }
  }

  const handleChange = (i, e) => {
    const newTheather = [...theather];
    newTheather[i].name = e.target.value;
    setTheather(newTheather);
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    
  };

  const getAvailableDates = () =>{
    const moment = extendMoment(Moment);

    const dateRange = moment.range(moment(startDate), moment(endDate));
    const dateArray = Array.from(dateRange.by("days"));
    const availableDates = dateArray.map((item) => {
      return (item = {
       displayDates: item.format("ddd MM/DD"),
       dates: item.format("YYYY-MM-DD"),
      });
    });
    return availableDates
  }

  const addTheather = () =>{
    setTheather([...theather, { name: ""}])
    getAvailableDates()
  }

  return (
    <div>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />

      {theather.map((item, index) => (
        <div key={index}>
          <label>戲院{index + 1}</label>
          <input
            type="text"
            value={item.name || ""}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
      <button onClick={addTheather}>增加戲院</button>
      <button onClick={saveToFirebase}>儲存本頁</button>
    </div>
  );
}



function Backstage(props) {
  return (
    <>
      <Header userState={"editing"}  />
      <BackstageContainer userUID={props.userUID} />
      <Footer />
    </>
  );
}


export default Backstage;
