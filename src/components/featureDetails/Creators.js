import PropTypes from 'prop-types';

function Creators({ currentFeatureObject }) {
  const { creators } = currentFeatureObject;
  return (
    <>
      {creators.map((creator, index) => (
        <div key={index} className="flex justify-center">
          <div className="mx-4 w-1/4">
            <p className="mb-6 text-xl">{creator.name}</p>
            <img className="w-[500px] rounded-3xl" src={creator.img} />
          </div>
          <div className="vertical mx-4 w-1/2">
            <p className="mt-12"> {creator.info}</p>
          </div>
        </div>
      ))}
    </>
  );
}

Creators.propTypes = {
  currentFeatureObject: PropTypes.shape({ creators: PropTypes.array }),
};

export default Creators;
