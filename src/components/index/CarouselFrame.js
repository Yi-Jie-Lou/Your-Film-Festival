import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function CarouselFrame({ className, router, img }) {
  return (
    <NavLink to={router}>
      <img className={className} src={img} />
    </NavLink>
  );
}

CarouselFrame.propTypes = {
  className: PropTypes.string,
  router: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default CarouselFrame;
