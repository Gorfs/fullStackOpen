const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} />
      <Part name={props.parts[1].name} />
      <Part name={props.parts[2].name} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <h3>total number of exercises</h3>
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <h4> Name :</h4>
      <em>{props.name}</em>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
