const Input = (props) => {
  const { label, inputType, placeholder, setData } = props;
  return (
    <>
      <label>{label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => setData(e.target.value)}
      ></input>
    </>
  );
};

export default Input;
