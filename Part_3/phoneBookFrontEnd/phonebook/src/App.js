import { useState, useEffect } from "react"

import SearchBar from "./components/SearchBar"
import AddSection from "./components/AddSection"
import Numbers from "./components/Numbers"
import personService from "./services/numbers"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newInfo, setNewInfo] = useState({ name: "", number: "" })
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)

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
      setNotification({
        message: `Deleted ${event.target.name} from the list`,
        color: "green",
      })
      setTimeout(() => {
        setNotification(null)
      }, 10000)
    } else {
      console.log("cancelling the deletion")
      setNotification({
        message: `Cancelling the delete`,
        color: "red",
      })
      setTimeout(() => {
        setNotification(null)
      }, 10000)
    }
  }

  useEffect(hook, [])

  const handleSubmit = (event) => {
    console.log("FROM HANDLESUBMIT | START OF FUCNTION | persons = ", persons)
    const personObject = {
      name: newInfo.name,
      number: newInfo.number,
    }
    event.preventDefault()
    console.log("the submit button was pressed!")
    //checking to see if the name already exists
    console.log("checking if ", newInfo.name, " is in the array")
    if (persons.map((person) => person.name).indexOf(newInfo.name) !== -1) {
      if (
        window.confirm(
          ` ${newInfo.name} is already in the arr, do you want to update his phone number?`
        )
      ) {
        console.log(
          "person who they are looking for is ",
          persons.find((person) => person.name === personObject.name).id
        )
        personService
          .updatePerson(
            persons.find((person) => person.name === personObject.name).id,
            personObject
          )
          .then((response) => console.log(response.data))
          .catch((error) => {
            console.log("there was an error")
            setNotification({
              message: `name seems to be gone from the database | ${error}`,
              color: "red",
            })
            setTimeout(() => setNotification(null), 10000)
          })
        setPersons(
          persons.map((person) =>
            person.name === newInfo.name ? personObject : person
          )
        )
        setNotification({
          message: `updated information for ${personObject.name}`,
          color: "green",
        })
        setTimeout(() => setNotification(null), 10000)
      } else {
        console.log("canceling the update")
        setNotification({ message: `canceled the update`, color: "red" })
        setTimeout(() => setNotification(null), 5000)
      }
    } else {
      console.log(
        "FROM HANDLESUBMIT | person does not exist in the array | persons = ",
        persons
      )
      const personObject = {
        name: newInfo.name,
        number: newInfo.number,
      }
      personService
        .addPerson(personObject)
        .then((person) => {
          const tempArr = persons.concat(person)
          console.log(
            "FROM HANDLE SUBMIT | pushing persons to persons array | persons =",
            persons,
            "new proposition = ",
            tempArr
          )
          setNotification({
            message: `Added information for ${personObject.name}`,
            color: "green",
          })
          setTimeout(() => setNotification(null), 10000)
          setNewInfo({ name: "", number: "" })
          console.log("pushed a new person into the list")
          console.log("set the newName to nothing")
          console.log(persons)

          setPersons(tempArr)
        })
        .catch((err) => {
          console.log("error is ", err.response.data)
          setNotification({
            message: err.response.data.error.message,
            color: "red",
          })
          setTimeout(() => setNotification(null), 10000)
        })
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
      console.log("FROM peopleToShow | persons=", persons)
      return persons
    } else {
      // there is a filter
      console.log("FROM peopleToShow | persons=", persons)
      return persons.filter((person) =>
        person.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    }
  }

  //running the function to get it to work
  let PeopleShow = peopleToShow()
  console.log(
    "people to show are ",
    peopleToShow(),
    " with filter ",
    filter,
    " from the main list which is ",
    persons
  )

  console.log("current notification is ", notification)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
