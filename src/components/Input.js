function Input(props) {

  return (
    <label
      htmlFor={props.attribute}
      className={props.className}
    >
      <h2 className="ml-2 text-sm "> {props.children}</h2>
      <input
        id={props.attribute}
        className="pl-2 focus:outline-none "
        type="text"
        value={props.value}
        onChange={e => {props.onChange(e.target.value, props.attribute, props.index)}}
      />
    </label>
  );
}

export default Input;
