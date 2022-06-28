import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [newInfo, setNewInfo] = useState({ name: "", number: "" })
  const [filter, setFilter] = useState("")

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
    } else if (event.target.name === "number") {
      console.log("changing the number")
      setNewInfo({ name: newInfo.name, number: event.target.value })
    } else {
      //handle the filtering
      console.log("changing the filter")
      setFilter(event.target.value)
    }
  }
  const peopleToShow = () => {
    if (filter === "") {
      // no filter
      return persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))
    } else {
      // there is a filter
      return persons.map((person) =>
        person.name.toLowerCase().startsWith(filter.toLowerCase()) ? (
          <div key={person.name}>
            <li>
              {" "}
              {person.name} {person.number}
            </li>
          </div>
        ) : (
          <div display="None" key={person.name}></div>
        )
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* here is where I am going to put the seach options */}
      <div>
        filter shown with <input value={filter} onChange={handleChange} />
      </div>
      <div>
        <h2>Add a new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name:
            <input value={newInfo.name} name="name" onChange={handleChange} />
          </div>
          <div>
            number:
            <input
              name="number"
              value={newInfo.number}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <ul>{peopleToShow()}</ul>
    </div>
  )
}

export default App
