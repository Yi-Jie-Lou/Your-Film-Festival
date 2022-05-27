import PropTypes from 'prop-types';

function Creators({ currentFeatureObject }) {
  const { creators } = currentFeatureObject;
  return (
    <>
      {creators.map((creator, index) => (
        <div key={index} className="flex justify-center | flex-col | md:flex-row ">
          <div className=" w-[65%] mx-auto | md:w-1/4 md:mx-4">
            <p className="mb-6 text-xl">{creator.name}</p>
            <img className="w-[500px] rounded-3xl" src={creator.img} />
          </div>
          <div className="vertical w-[80%] mx-auto | md:w-1/2 md:mx-4 ">
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
