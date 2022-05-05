function MovieRating(props) {
  return (
    <div className="flex my-2">
      <div className={props.className}>
        {props.rank}
      </div>
      <p>{props.text}</p>
    </div>
  );
}
export default MovieRating;
