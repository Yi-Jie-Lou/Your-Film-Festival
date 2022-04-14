import React from "react";

function Select(props) {
  return (
    <select className={props.className}
      onChange={(event) => props.onChange(event.target.value)}
    >
      {props.options &&
        props.options.map((item, index) => (
          <option key={index} value={item.dates}>
            {item.displayDates}
          </option>
        ))}
    </select>
  );
}
export default Select;
