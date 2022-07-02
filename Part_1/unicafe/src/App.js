import { useState } from "react"

//here I am making the component for the Title
const Header = () => (
  <div>
    {" "}
    <h1>Give feedback</h1>
  </div>
)

//making the button component
const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>
}

//making the Statitic Line component
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} :</td>
      <td>{value}</td>
    </tr>
  )
}

//making history component
const Stats = ({ good, neutral, bad }) => {
  if (good + bad + neutral === 0) {
    //testing to see if some feedback has been given
    return (
      <div>
        <h1>statistics</h1>No feedback given
      </div>
    )
  }
  return (
    //the previous check did not return therefore there is feedback to give
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good + bad) / 2} />
        <StatisticLine
          text="Positive"
          value={(good * 100) / (bad + neutral + good) + " %"}
        />
        <StatisticLine text="score" value={good - bad} />
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // making the handler function
  const review = (value) => {
    if (value === 0) {
      //the review was neutral
      console.log("neutral feedback")
      setNeutral(neutral + 1)
    } else if (value === 1) {
      // the review was good
      console.log("Good feedback")
      setGood(good + 1)
    } else {
      console.log("bad review")
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <Header />
      <Button text="Good" handler={() => review(1)} />
      <Button text="Neutral" handler={() => review(0)} />
      <Button text="Bad" handler={() => review(2)} />
      <Stats good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
