import Note from "./components/Note"
import { useEffect, useState } from "react"
import axios from "axios"
import noteService from "./services/notes"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

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
        alert(`the note ${note} is not in the server anymore`)
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
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App
