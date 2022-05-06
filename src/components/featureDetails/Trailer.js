function Trailer (props) {
    return (
        <video
        className="border-2 mx-auto w-4/5  "
        src={props.currentFeatureObject.trailer}
        type="video/mp4"
        controls
      />
    )
}

export default Trailer