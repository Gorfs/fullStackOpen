import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import AddSection from "./components/AddSection"
import Numbers from "./components/Numbers"
import Details from "./components/Details"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newInfo, setNewInfo] = useState({ name: "", number: "" })
  const [filter, setFilter] = useState("")

  //function that fetches data from the db file
  const hook = () => {
    console.log("effect")
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fufilled")
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

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

  //function that returns a tons of Detail components of the people that have not been filtered
  const peopleToShow = () => {
    if (filter === "") {
      // no filter
      return persons.map((person) => (
        <Details key={person.id} person={person} />
      ))
    } else {
      // there is a filter
      return persons.map((person) =>
        person.name.toLowerCase().startsWith(filter.toLowerCase()) ? (
          <Details key={person.id} person={person} />
        ) : (
          <div display="None" key={person.name}></div>
        )
      )
    }
  }
  //running the function to get it to work
  let PeopleShow = peopleToShow()

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar filter={filter} handleChange={handleChange} />
      <AddSection
        handleSubmit={handleSubmit}
        newInfo={newInfo}
        handleChange={handleChange}
      />
      <Numbers people={PeopleShow} />
    </div>
  )
}

export default App
