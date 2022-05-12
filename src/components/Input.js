function Input(props) {

  return (
    <label
      htmlFor={props.attribute}
      className={props.className}
    >
    <div className="flex">
      <h2 className="ml-2 text-sm "> {props.children}</h2>
      {props.errorMessage ?  <p className="ml-2 text-sm text-[#f08074]"> {props.errorMessage}</p> :""}
      </div>
      <input
        id={props.attribute}
        className={`pl-2 focus:outline-none ${props.isReadOnly? "text-slate-400" : "text-slate-600"}`}
        type={props.type || "text"}
        value={props.value}
        readOnly={props.isReadOnly}
        onChange={e => {props.onChange(e.target.value, props.attribute, props.index)}}
      />
    </label>
  );
}

export default Input;
