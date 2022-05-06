import { NavLink } from "react-router-dom";

function FilmBox(props) {
  return (
    <NavLink className="w-full | sm:w-fit" to={props.router}>
      <div className={props.className}>
        <div className="absolute flex flex-col justify-center h-full  w-full  text-white  opacity-0 hover:opacity-100 backdrop-blur-sm  ">
          <h4 className="w-3/4 mx-auto text-shadow text-xl ">{props.title}</h4>
          <p className="w-3/4 mx-auto mt-2 text-shadow">{props.text}</p>
        </div>
        <img className="w-full h-full object-cover" src={props.img} />
      </div>
    </NavLink>
  );
}

export default FilmBox;
