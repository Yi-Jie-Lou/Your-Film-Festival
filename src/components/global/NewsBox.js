import { NavLink } from "react-router-dom";
import PropTypes from "prop-types"

function NewsBox({className, router, title, img}) {
  return (
    <NavLink className={className} to={router}>
      <div className="relative w-full h-full">
        <div className="absolute m-7 bottom-0  text-white text-shadow text-xl">
          {title.split("\n").map((line, index) => (
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
          src={img}
        />
      </div>
    </NavLink>
  );
}

NewsBox.propTypes = {
  className: PropTypes.string,
  router: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}

export default NewsBox;
