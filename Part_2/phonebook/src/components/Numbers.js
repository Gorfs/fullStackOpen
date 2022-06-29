import Details from "./Details"

const Numbers = ({ people, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {people.map((person) => (
          <Details handleDelete={handleDelete} person={person} />
        ))}
      </ul>
    </div>
  )
}

export default Numbers
