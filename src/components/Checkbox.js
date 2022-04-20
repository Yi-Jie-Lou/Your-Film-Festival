function Checkbox(props) {

    return (
      <label
        htmlFor={props.attribute}
        className="flex  w-full  mx-auto my-2 "
      >
        <h2 className="ml-2 text-sm "> {props.children}</h2>
        <input
          id={props.attribute}
          className="ml-2 mt-1 pl-2 "
          type="checkbox"
          checked = {props.value}
          onChange={e => {props.onChange(e.target.checked, props.attribute, props.index)}}
        />
      </label>
    );
  }
  
  export default Checkbox;
  