const Details = ({ person, handleDelete }) => {
  return (
    <div>
      <li>
        {person.name} {person.number}
      </li>
      <button onClick={handleDelete} id={person.id} name={person.name}>
        {" "}
        delete{" "}
      </button>
    </div>
  )
}

export default Details
