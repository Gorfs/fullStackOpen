const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}
/*  not used for now so I commented it out
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
*/
const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Archie s course on how to be a good at parenting",
        exercises: 3,
        id: 4,
      },
    ],
  }

  return <Course course={course} />
}

export default App
