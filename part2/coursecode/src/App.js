import React, {useState, useEffect} from 'react'
import Note from './component/note'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3002/notes')
    .then(response => {
      console.log('promise fulfilled');
      setNotes(response.data)
    })
  }, [])

  console.log('render', notes.length, 'notes');

  const addNote = (event) => {
    event.preventDefault()
    const newNoteObj = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNewNote('')
    setNotes(notes.concat(newNoteObj))
  }
  const handleInput = (event) => {
    setNewNote(event.target.value)
  }

  const showToImpor = showAll ? notes : notes.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {showToImpor.map((note) => <Note note={note} key={note.id}></Note>)}
      </ul>
      <form onSubmit={(event) => {
        addNote(event)
      }}>
        <input value={newNote} onChange={(event) => handleInput(event)}></input>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
