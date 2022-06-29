const Button = ({ text, handleClick, name }) => {
  return (
    <button id={name} onClick={handleClick}>
      {" "}
      {text}
    </button>
  )
}
export default Button
