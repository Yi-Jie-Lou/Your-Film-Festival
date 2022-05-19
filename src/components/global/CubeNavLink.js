import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CubeNavLink({ router, cube, children, className }) {
  return (
    <NavLink to={router}>
      <div
        className={`relative top-[-10px] hover:top-[0px] text-center leading-7 w-20 ${className}`}
      >
        <img src={cube} />
        <span className="top-5 lg:top-6 xl:top-7 absolute w-full left-0 text-white text-shadow-light tracking-wider">
          {children}
        </span>
      </div>
    </NavLink>
  );
}

CubeNavLink.propTypes = {
  className: PropTypes.string.isRequired,
  router: PropTypes.string.isRequired,
  cube: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

function LoginNavLink({ router, cube, children }) {
  return (
    <NavLink to={router}>
      <div className="relative top-[-10px] text-center leading-7 hover:top-[0px] w-20 | sm:text-sm  | lg:w-24 lg:text-base | xl:w-32">
        <img src={cube} />
        <span className="absolute w-full left-0 text-white text-lg text-shadow-light tracking-wider top-5 | lg:top-6 | xl:top-8 ">
          {children}
        </span>
      </div>
    </NavLink>
  );
}

LoginNavLink.propTypes = {
  router: PropTypes.string.isRequired,
  cube: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

function LoginLink({ router, cube, children, id }) {
  return (
    <Link id={id} target="_blank" to={router}>
      <div className="relative top-[-10px] text-center leading-7 hover:top-[0px] w-20 | sm:text-sm  | lg:w-24 lg:text-base | xl:w-32">
        <img src={cube} />
        <span className="absolute w-full left-0 text-white text-lg text-shadow-light tracking-wider top-5 | lg:top-6 | xl:top-8 ">
          {children}
        </span>
      </div>
    </Link>
  );
}

LoginLink.propTypes = {
  router: PropTypes.string.isRequired,
  cube: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function SwitchCubeNavLink({ router, cube, children }) {
  return (
    <NavLink to={router}>
      <div className="w-28 sm:text-sm lg:w-36 lg:text-base xl:w-40 relative top-[-10px] text-center leading-7 hover:top-[0px]">
        <img src={cube} />
        <span className="top-5 lg:top-6 xl:top-7 absolute w-full  left-0 text-white text-shadow-light tracking-wider">
          {children}
        </span>
      </div>
    </NavLink>
  );
}

SwitchCubeNavLink.propTypes = {
  router: PropTypes.string.isRequired,
  cube: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

function CustomerNavLink({ router, children }) {
  return (
    <NavLink className="vertical" to={router}>
      <div className=" py-2  text-center leading-7 text-xl tracking-wider text-shadow-light hover:text-amber-200  md:mx-3 | xl:mx-5">
        {children}
      </div>
    </NavLink>
  );
}

CustomerNavLink.propTypes = {
  router: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired,
  ]),
};

function MobileNavLink({ router, children, className, color, isActive }) {
  return (
    <NavLink className="flex justify-center w-full" to={router}>
      <div
        style={{
          background: color,
        }}
        className={` opacity-90 hover:delay-[0ms] hover:scale-105 vertical  w-[90%] z-50 ${className}`}
      >
        <span
          className={` ${
            isActive
              ? 'transition-all duration-[2000ms] opacity-100'
              : 'opacity-0 pointer-events-none'
          }   text-white text-center text-xl text-shadow-light`}
        >
          {children}
        </span>
      </div>
    </NavLink>
  );
}

MobileNavLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  router: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

function MobileBuild({ children, className, color, isActive, onClick }) {
  return (
    <div
      style={{
        background: color,
      }}
      className={` opacity-90 hover:delay-[0ms] hover:scale-105 vertical  w-[90%] z-50 ${className}`}
      onClick={onClick}
    >
      <span
        className={` ${
          isActive
            ? 'transition-all duration-[2000ms] opacity-100'
            : 'opacity-0 pointer-events-none'
        }   text-white text-center text-xl text-shadow-light`}
      >
        {children}
      </span>
    </div>
  );
}

MobileBuild.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export {
  CubeNavLink,
  LoginNavLink,
  LoginLink,
  SwitchCubeNavLink,
  CustomerNavLink,
  MobileNavLink,
  MobileBuild,
};
