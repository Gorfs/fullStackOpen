import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ])
  const [newInfo, setNewInfo] = useState({ name: "", number: "" })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("the submit button was pressed!")
    //checking to see if the name already exists
    console.log("checking if ", newInfo.name, " is in the array")
    if (persons.map((person) => person.name).indexOf(newInfo.name) !== -1) {
      console.log(
        "Name already in the Array, please dont use the same name again!"
      )
      alert("Name is already in the array!")
    } else {
      const personObject = {
        name: newInfo.name,
        number: newInfo.number,
      }
      setPersons(persons.concat(personObject))
      setNewInfo({ name: "", number: "" })
      console.log("pushed a new person into the list")
      console.log("set the newName to nothing")
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "name") {
      console.log("changing the name")
      setNewInfo({ name: event.target.value, number: newInfo.number })
    } else {
      console.log("changing the number")
      setNewInfo({ name: newInfo.name, number: event.target.value })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newInfo.name} name="name" onChange={handleChange} />
        </div>
        <div>
          number:{" "}
          <input name="number" value={newInfo.number} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
