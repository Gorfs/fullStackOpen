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

const Total = ({ total }) => {
  return (
    <div>
      <h3>total number of {total} exercises</h3>
    </div>
  )
}

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

  return (
    <div>
      <Course course={course} />
      <Total
        total={course.parts
          .map((part) => part.exercises) //creates an array with all the values of exercises in it
          .reduce(
            //uses reduce to calculate the sum of all the exercises
            (previousValue, currentValue) => previousValue + currentValue
          )}
      />
    </div>
  )
}

export default App
