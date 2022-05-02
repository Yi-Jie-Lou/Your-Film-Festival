import { NavLink } from "react-router-dom";

export const CubeNavLink = (props) => {
  return (
    <NavLink to={props.router}>
      <div className="relative top-[-10px] w-28   text-center leading-7  text-1xl hover:top-[0px]">
        <img src={props.cube} />
        <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
          {props.children}
        </span>
      </div>
    </NavLink>
  );
};

export const SwitchCubeNavLink = (props) => {
  return (
    <NavLink to={props.router}>
      <div
        id={props.id}
        className="relative top-[-10px] w-40   text-center leading-7  text-1xl hover:top-[0px]"
      >
        <img src={props.cube} />
        <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider">
          {props.children}
        </span>
      </div>
    </NavLink>
  );
};

export const SwitchReloadData = (props) => {
  return (
    <a href={props.router}>
      <div
        id={props.id}
        className="relative top-[-10px] w-40    text-center leading-7  text-1xl hover:top-[0px]  "
      >
        <img src={props.cube} />
        <span className="absolute w-full top-6 left-0 text-white text-shadow-light tracking-wider ">
          {props.children}
        </span>
      </div>
    </a>
  );
};

export const CustomerNavLink = (props) => {
  return(
    <NavLink className="vertical" to={props.router}>
    <div className="w-28 py-2  text-center leading-7  text-1xl">
    {props.children}
    </div>
  </NavLink>
  )
}
