import { NavLink, Link } from "react-router-dom";

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

export const LoginNavLink = (props) => {
  return (
    <NavLink to={props.router}>
      <div className="relative top-[-10px] text-center leading-7 hover:top-[0px] w-20 | sm:text-sm  | md:w-24 md:text-base | xl:w-32">
        <img  src={props.cube} />
        <span className="absolute w-full left-0 text-white text-lg text-shadow-light tracking-wider top-5 | md:top-6 | xl:top-8 ">
          {props.children}
        </span>
      </div>
    </NavLink>
  );
};

export const LoginLink = (props) => {
  return (
    <Link target="_blank" to={props.router}>
      <div className="relative top-[-10px] text-center leading-7 hover:top-[0px] w-20 | sm:text-sm  | md:w-24 md:text-base | xl:w-32">
        <img  src={props.cube} />
        <span className="absolute w-full left-0 text-white text-lg text-shadow-light tracking-wider top-5 | md:top-6 | xl:top-8 ">
          {props.children}
        </span>
      </div>
    </Link>
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
  return (
    <NavLink className="vertical" to={props.router}>
      <div className="mx-5 py-2  text-center leading-7  text-1xl">
        {props.children}
      </div>
    </NavLink>
  );
};

export const MobileNavLink = (props) => {
  return (
    <NavLink className="flex justify-center w-full" to={props.router}>
      <div
        className={` opacity-90 hover:delay-[0ms] hover:scale-105 vertical rounded-3xl w-[90%] z-50 ${props.className}`}
      >
        <span className={` ${props.isActive ? "transition-all duration-[2000ms] opacity-100" : "opacity-0" }   text-white text-center text-xl text-shadow-light`}>
          {props.children}
        </span>
      </div>
    </NavLink>
  );
};
