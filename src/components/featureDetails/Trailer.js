import PropTypes from "prop-types";

function Trailer({ currentFeatureObject }) {
  const { trailer } = currentFeatureObject;
  return (
    <video
      className="border-2 mx-auto w-4/5  "
      src={trailer}
      type="video/mp4"
      controls
    />
  );
}

Trailer.propTypes = {
  currentFeatureObject: PropTypes.shape({
    trailer: PropTypes.string.isRequired,
  }),
};

export default Trailer;
