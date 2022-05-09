function Input(props) {

  return (
    <label
      htmlFor={props.attribute}
      className={props.className}
    >
      <h2 className="ml-2 text-sm "> {props.children}</h2>
      <input
        id={props.attribute}
        className={`pl-2 focus:outline-none ${props.isReadOnly? "text-slate-400" : "text-slate-600"}`}
        type="text"
        value={props.value}
        readOnly={props.isReadOnly}
        onChange={e => {props.onChange(e.target.value, props.attribute, props.index)}}
      />
    </label>
  );
}

export default Input;
