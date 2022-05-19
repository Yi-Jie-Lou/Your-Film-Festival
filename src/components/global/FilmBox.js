import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function FilmBox({ className, router, title, text, img }) {
  return (
    <NavLink className={className} to={router}>
      <div className="relative w-full h-full">
        <div className="absolute flex flex-col justify-center h-full  w-full  text-white  opacity-0 hover:opacity-100 backdrop-blur-sm  ">
          <h4 className="w-3/4 mx-auto text-shadow text-xl ">{title}</h4>
          <p className="w-3/4 mx-auto mt-2 text-shadow">{text}</p>
        </div>
        <img className="w-full h-full object-cover" src={img} />
      </div>
    </NavLink>
  );
}

FilmBox.propTypes = {
  className: PropTypes.string,
  router: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default FilmBox;
