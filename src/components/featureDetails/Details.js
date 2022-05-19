import PropTypes from "prop-types"

function Details({currentFeatureObject}) {
  const {title, year, nation, language, longInfo, length, format, creators, color} = currentFeatureObject
  console.log(typeof(year))
  return (
    <div className="max-h-[500px]">
      <h1 className="mt-4 text-3xl">{title}</h1>
      {creators.map((creator, index) => (
        <p key={index} className="my-4">
          {creator.name}
        </p>
      ))}

      <p>
        {year} | {nation}
      </p>
      <p>
        {format} | {color}{" "}
        | {length}分 | {language}
      </p>
      <p className="my-4">{longInfo}</p>
    </div>
  );
}

Details.propTypes = {
  currentFeatureObject: PropTypes.shape({
    color: PropTypes.string.isRequired,
    creators: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    longInfo: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  })
}

export default Details;
