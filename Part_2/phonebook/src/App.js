import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import AddSection from "./components/AddSection"
import Numbers from "./components/Numbers"
import personService from "./services/numbers"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newInfo, setNewInfo] = useState({ name: "", number: "" })
  const [filter, setFilter] = useState("")

  //function that fetches data from the db file
  const hook = () => {
    console.log("effect")
    personService.getAll().then((people) => setPersons(people))
  }

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${event.target.name}`)) {
      console.log("Deleting the person with the ID ", event.target.id)
      console.log(
        "list should be after ",
        persons.filter((person) => person.name !== event.target.name)
      )
      personService
        .deletePerson(event.target.id)
        .then((people) =>
          setPersons(
            persons.filter((person) => person.name !== event.target.name)
          )
        )
      console.log("AFTER DELETE PEOPLE ARE ", persons)
    } else {
      console.log("cancelling the deletion")
    }
  }

  useEffect(hook, [])

  const handleSubmit = (event) => {
    const personObject = {
      name: newInfo.name,
      number: newInfo.number,
    }
    event.preventDefault()
    console.log("the submit button was pressed!")
    //checking to see if the name already exists
    console.log("checking if ", newInfo.name, " is in the array")
    if (persons.map((person) => person.name).indexOf(newInfo.name) !== -1) {
      console.log(
        "Name already in the Array, please dont use the same name again!"
      )
      if (
        window.confirm(
          ` ${newInfo.name} is already in the arr, do you want to update his phone number?`
        )
      ) {
        personService.updatePerson(
          persons.find((person) => person.name === personObject.name).id,
          personObject
        )
        setPersons(
          persons.map((person) =>
            person.name === newInfo.name ? personObject : person
          )
        )
      } else {
        console.log("canceling the update")
      }
    } else {
      const personObject = {
        name: newInfo.name,
        number: newInfo.number,
      }
      personService
        .addPerson(personObject)
        .then((person) => setPersons(persons.concat(person)))
      setNewInfo({ name: "", number: "" })
      console.log("pushed a new person into the list")
      console.log("set the newName to nothing")
      console.log(persons)
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
      return persons
    } else {
      // there is a filter
      return persons.filter((person) =>
        person.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    }
  }

  //running the function to get it to work
  let PeopleShow = peopleToShow()
  console.log("people to show are ", PeopleShow, " with filter ", filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar filter={filter} handleChange={handleChange} />
      <AddSection
        handleSubmit={handleSubmit}
        newInfo={newInfo}
        handleChange={handleChange}
      />
      <Numbers
        handleDelete={handleDelete}
        key={peopleToShow}
        people={PeopleShow}
      />
    </div>
  )
}

export default App
