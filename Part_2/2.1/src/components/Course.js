import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts
          .map((part) => part.exercises)
          .reduce((p, s) => p + s)}
      />
    </div>
  )
}
export default Course
