import PropTypes from 'prop-types'

function PriceTable({className, title, text}) {
  return (
    <div  className={className}>
      <div className="vertical min-h-[40px] w-2/12 border-r-2 border-stone-500 text-center ">
        {title}
      </div>
      <div className="vertical w-10/12 ml-2">{text}</div>
    </div>
  );
}

PriceTable.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default PriceTable
