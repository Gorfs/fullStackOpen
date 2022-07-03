const Hello = (props) => {
  return (
    <div>
      <h1>
        Hi there {props.name} and you are {props.age} years old
      </h1>
    </div>
  )
}

const App = () => {
  const age = 18
  const name = "Archie"
  return (
    <div>
      <p>Grettings</p>
      <p>
        <Hello name={name} age={age} />
      </p>
    </div>
  )
}

export default App
