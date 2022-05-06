import { NavLink } from "react-router-dom";

export const CubeNavLink = (props) => {
  return (
    <NavLink to={props.router}>
      <div className="w-20 md:w-24 xl:w-28  relative top-[-10px]   text-center leading-7 sm:text-sm md:text-base  hover:top-[0px]">
        <img src={props.cube} />
        <span className="top-5 md:top-6 xl:top-7 absolute w-full left-0 text-white text-shadow-light tracking-wider">
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
        className="w-28 sm:text-sm md:w-36 md:text-base xl:w-40 relative top-[-10px] text-center leading-7 hover:top-[0px]"
      >
        <img src={props.cube} />
        <span className="top-5 md:top-6 xl:top-7 absolute w-full  left-0 text-white text-shadow-light tracking-wider">
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
        className="w-28 sm:text-sm md:w-36 md:text-base xl:w-40 relative top-[-10px] text-center leading-7 hover:top-[0px]"
      >
        <img src={props.cube} />
        <span className="top-5 md:top-[23px]  xl:top-[28px] absolute w-full  left-0 text-white text-shadow-light tracking-wider ">
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
