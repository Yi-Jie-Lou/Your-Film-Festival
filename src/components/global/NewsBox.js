import { NavLink } from "react-router-dom";

function NewsBox(props) {
  return (
    <NavLink to={props.router}>
      <div className={props.className}>
        <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
          {props.text.split("\n").map((line, index) => (
            <p key={index} className="my-1">
              <span key={index}>
                {line}
                <br />
              </span>
            </p>
          ))}
        </div>
        <img
          className="w-full h-full object-cover object-center rounded-lg"
          src={props.img}
        />
      </div>
    </NavLink>
  );
}

export default NewsBox;
