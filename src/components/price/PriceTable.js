function PriceTable(props) {
  return (
    <div  className={props.className}>
      <div className="vertical min-h-10 w-2/12 border-r-2 border-stone-700 text-center ">
        {props.title}
      </div>
      <div className="vertical w-10/12 ml-2">{props.text}</div>
    </div>
  );
}

export default PriceTable
