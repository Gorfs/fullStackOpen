import Note from "./components/Note"
import { useEffect, useState } from "react"
import noteService from "./services/notes"
import Notification from "./components/Notification"
import Footer from "./components/Footer"

import "./index.css"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    color: "green",
  })
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    noteService.getAll().then((notes) => {
      setNotes(notes)
    })
  }, [])

  const toggleImportanceOf = (id) => {
    console.log("importance of ", id, " needs to be toggled")
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage({
          message: ` the note ${note} no longer exists | error = ${error}`,
          color: "red",
        })
        setTimeout(() => {
          setErrorMessage({ message: "", color: "" })
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then((note) => {
      setNotes(notes.concat(note))
      setNewNote("")
      setErrorMessage({ message: `added ${note.content}`, color: "green" })
      setTimeout(() => setErrorMessage({ message: "", color: "" }), 5000)
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage.message} color={errorMessage.color} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.content}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit"> save </button>
      </form>
      <Footer />
    </div>
  )
}

export default App
