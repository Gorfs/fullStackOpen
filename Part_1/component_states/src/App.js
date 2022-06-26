import { useState } from "react"

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftCLick = () => {
    setAll(allClicks.concat("L"))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat("R"))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftCLick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>You have not pressed any buttons yet</div>
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text}</button>
)

export default App
