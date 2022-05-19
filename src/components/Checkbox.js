import PropTypes from 'prop-types';

function Checkbox({ attribute, className, children, onChange, value, index }) {
  return (
    <label htmlFor={attribute} className={className}>
      <h2 className="ml-2 text-sm "> {children}</h2>
      <input
        id={attribute + index}
        className="ml-2 mt-1 pl-2 "
        type="checkbox"
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked, attribute, index);
        }}
      />
    </label>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  attribute: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number,
};
export default Checkbox;
