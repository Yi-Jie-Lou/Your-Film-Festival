function Details(props) {
  return (
    <div>
      <h1 className="mt-6 text-3xl">{props.currentFeatureObject.title}</h1>
      {props.currentFeatureObject.creators.map((creator, index) => (
        <p key={index} className="my-4">
          {creator.name}
        </p>
      ))}

      <p>
        {props.currentFeatureObject.year} | {props.currentFeatureObject.nation}
      </p>
      <p>
        {props.currentFeatureObject.format} | {props.currentFeatureObject.color}{" "}
        | {props.currentFeatureObject.length}分 | {props.currentFeatureObject.language}
      </p>
      <p className="my-4">{props.currentFeatureObject.longInfo}</p>
    </div>
  );
}

export default Details;
