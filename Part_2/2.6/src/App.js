import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("the submit button was pressed", event.target)
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName("")
    console.log("pushed a new person into the list")
    console.log("set the newName to nothing")
  }

  const handleChange = (event) => {
    console.log("setting a new name", event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" value={newName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
