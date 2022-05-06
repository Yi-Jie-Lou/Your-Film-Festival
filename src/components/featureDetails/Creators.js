function Creators(props) {
  return (
    <>
      {props.currentFeatureObject.creators.map((creator, index) => (
        <div key={index} className="flex justify-center">
          <div className="mx-4 w-1/4">
            <p className="mb-6 text-xl">{creator.name}</p>
            <img className="w-600 rounded-3xl" src={creator.img} />
          </div>
          <div className="vertical mx-4 w-1/2">
            <p className="mt-12"> {creator.info}</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default Creators;
