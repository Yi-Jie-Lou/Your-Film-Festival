import PropTypes from 'prop-types';

function MovieRating({ className, rank, text }) {
  return (
    <div className="flex my-2">
      <div className={className}>{rank}</div>
      <p>{text}</p>
    </div>
  );
}

MovieRating.propTypes = {
  className: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MovieRating;
