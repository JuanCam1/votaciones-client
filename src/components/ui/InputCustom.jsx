const InputCustom = ({ type = "text", placeholder = null, classStyle = null, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`text-sm outline-none block w-full border border-gray-300 rounded-lg shadow-sm p-2 ${classStyle}`}
      {...props}
    />
  );
};

export default InputCustom;
