import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function TimetableFilmBox({ className, router, title, text, img }) {
  return (
    <NavLink className={className} to={router}>
      <div className="relative w-full h-full">
        <div className="absolute flex flex-col justify-center  bottom-0  w-full  text-white  opacity-100 backdrop-blur-sm h-1/4 sm:h-1/3  ">
          <h4 className="w-3/4 mx-auto text-shadow | text-sm | md:text-xl ">{title}</h4>
          <p className="w-3/4 mx-auto  text-shadow | mt-0 text-sm | md:mt-2 md:text-xl">{text}</p>
        </div>
        <img className="w-full h-full object-cover" src={img} />
      </div>
    </NavLink>
  );
}

TimetableFilmBox.propTypes = {
  className: PropTypes.string,
  router: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default TimetableFilmBox;
