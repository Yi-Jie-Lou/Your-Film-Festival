function Textarea(props) {
  return (
    <label
      htmlFor={props.attribute}
      className={props.className}
    >
      <h2 className="ml-2 text-sm "> {props.children}</h2>
      <textarea
        id={props.attribute}
        className={`px-2 h-4/5 focus:outline-none  ${props.isReadOnly? "text-slate-400" : "text-slate-900"}`}
        value={props.value}
        readOnly={props.isReadOnly}
        onChange={(e) => {
          props.onChange(e.target.value, props.attribute, props.index);
        }}
      ></textarea>
    </label>
  );
}

export default Textarea;
