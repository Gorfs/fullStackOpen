import { useState } from "react"

//making the section about the quote with the most votes

//main stats component that uses 2 smaller components and checks if there is data or not
const Stats = ({ show, anecdote, votes }) => {
  if (show === 1) {
    return (
      <div>
        <StatsHeader />
        <StatsContent anecdote={anecdote} votes={votes} />
      </div>
    )
  } else {
    return (
      <div>
        <StatsHeader />
        No anecdote has been voted for
      </div>
    )
  }
}
//simple header for the stats section
const StatsHeader = () => <h1>Anecdote with the most votes:</h1>

//the actual content for the stats section, contains the anecdote and the amount of votes it has
const StatsContent = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <p>has {votes} votes</p>
    </div>
  )
}

//the component that shows the anecdotes, it's votes and also the buttons
const Display = ({ anecdote, handler, votes, voteHandler }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
      <Button text="next anecdote" handler={handler} />
      <Button text="Vote for this anecdote" handler={voteHandler} />
    </div>
  )
}

//simple button component
const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ]

  const [selected, setSelected] = useState(0)
  //using a state to store the votes
  const [votes, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  })
  const handler = () => {
    let number = Math.floor(Math.random() * 7)
    //this section is to avoid falling on the same citation mutliple times in a row
    for (
      number;
      number === parseInt(selected);
      number = Math.floor(Math.random() * 7)
    ) {
      console.log("doing some cool stuff") // my equivalent of the pass function in python
    }
    //sets the state of the object to a random number between 0 and 6
    setSelected(Math.floor(Math.random() * 7))
  }
  const voteHandler = () => {
    //generate copy of the votes object
    let copy = { ...votes }
    copy[parseInt(selected)] += 1

    //update the state
    setVote(copy)
  }
  let anecdote = anecdotes[selected]

  //we need to find the largest number/index in the list of votes
  let max = 0
  let show = 0
  for (let i = 0; i < anecdotes.length; i++) {
    if (votes[i] > max) {
      max = i
      show = 1
    }
  }

  return (
    <div>
      {/* shows the main content */}
      <Display
        anecdote={anecdote}
        votes={votes[parseInt(selected)]}
        handler={handler}
        voteHandler={voteHandler}
      />
      {/* shows the stats section asked for in 1.14 */}
      <Stats anecdote={anecdotes[max]} votes={votes[max]} show={show} />
    </div>
  )
}

export default App
