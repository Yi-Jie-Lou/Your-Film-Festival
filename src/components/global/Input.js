import PropTypes from 'prop-types';

function Input({
  attribute,
  className,
  children,
  isReadOnly,
  type,
  onChange,
  value,
  index,
}) {
  return (
    <label htmlFor={attribute} className={className}>
      <div className="flex">
        <h2 className="ml-2 text-sm "> {children}</h2>
      </div>
      <input
        id={attribute}
        className={`pl-2 focus:outline-none ${
          isReadOnly ? 'text-slate-400' : 'text-slate-600'
        }`}
        type={type}
        value={value}
        readOnly={isReadOnly}
        onChange={(e) => {
          onChange(e.target.value, attribute, index);
        }}
      />
    </label>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  isReadOnly: PropTypes.bool,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  attribute: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number']),
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  onChange: PropTypes.func.isRequired,
};

export default Input;
