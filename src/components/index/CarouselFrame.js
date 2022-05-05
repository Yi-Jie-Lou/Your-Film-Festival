import { NavLink } from "react-router-dom";

function CarouselFrame(props) {
  return (
    <NavLink to={props.router}>
      <img
        className={props.className}
        src={props.img}
      />
    </NavLink>
  );
}

export default CarouselFrame;
