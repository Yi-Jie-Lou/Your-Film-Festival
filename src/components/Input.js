function Input(props) {

  return (
    <label
      htmlFor={props.attribute}
      className="flex flex-col justify-around w-full h-16 my-2  mx-auto border-2 rounded-lg border-zinc-900"
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
