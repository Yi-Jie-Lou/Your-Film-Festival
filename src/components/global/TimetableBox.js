import { NavLink } from "react-router-dom";

function TimetableFilmBox(props) {
  return (
    <NavLink className={props.className} to={props.router}>
      <div className="relative w-full h-full">
        <div className="absolute flex flex-col justify-center h-1/3 bottom-0  w-full  text-white  opacity-100 backdrop-blur-sm  ">
          <h4 className="w-3/4 mx-auto text-shadow text-xl ">{props.title}</h4>
          <p className="w-3/4 mx-auto mt-2 text-shadow">{props.text}</p>
        </div>
        <img className="w-full h-full object-cover" src={props.img} />
      </div>
    </NavLink>
  );
}

export default TimetableFilmBox;