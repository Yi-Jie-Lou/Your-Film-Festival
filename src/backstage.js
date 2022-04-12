import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./utils/firebase-config";

function Backstage(props) {
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
        festivalStart: startDate,
        festivalEnd: endDate,
        locations: theather.map( (item) => (item.name))
      }).then(() => {
        alert("儲存成功!");
      });
    }
  }

  const handleChange = (i, e) => {
    const newTheather = [...theather];
    console.log(newTheather[i].name)
    newTheather[i].name = e.target.value;
    setTheather(newTheather);
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const addTheather = () =>{
    setTheather([...theather, { name: ""}])
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

export default Backstage;

// const [formValues, setFormValues] = useState([{ name: "", email : ""}])

// return (
//     <form  onSubmit={handleSubmit}>
//       {formValues.map((element, index) => (
//         <div className="form-inline" key={index}>
//           <label>Name</label>
//           <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
//           <label>Email</label>
//           <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
//           {
//             index ?
//               <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
//             : null
//           }
//         </div>
//       ))}
//       <div className="button-section">
//           <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
//           <button className="button submit" type="submit">Submit</button>
//       </div>
//   </form>
// )
