import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./utils/firebase-config";

function Backstage(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  async function saveToFirebase() {
    if (props.userUID) {
      await updateDoc(doc(db, "users", props.userUID), {
        festivalStart: startDate,
        festivalEnd: endDate
      }).then(()=>{
          alert("儲存成功!")
      })
    }
  }

  // console.log(`start: ${startDate}`,`end: ${endDate}`)

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  return (
    <div>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <button onClick={saveToFirebase}>儲存本頁</button>
    </div>
  );
}

export default Backstage;
