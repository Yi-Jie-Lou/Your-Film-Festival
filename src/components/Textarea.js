import PropTypes from "prop-types";

function Textarea({
  attribute,
  className,
  children,
  isReadOnly,
  value,
  index,
  onChange,
}) {
  return (
    <label htmlFor={attribute} className={className}>
      <h2 className="ml-2 text-sm "> {children}</h2>
      <textarea
        id={attribute}
        className={`px-2 h-4/5 focus:outline-none  ${
          isReadOnly ? "text-slate-400" : "text-slate-600"
        }`}
        value={value}
        readOnly={isReadOnly}
        onChange={(e) => {
          onChange(e.target.value, attribute, index);
        }}
      ></textarea>
    </label>
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
  isReadOnly: PropTypes.bool,
  value: PropTypes.string,
  index: PropTypes.number,
  attribute: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Textarea;
