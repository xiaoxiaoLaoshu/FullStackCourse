import React, { useState, useEffect } from "react";
import Note from "./component/Note";
import Notification from "./component/Notification";
import noteService from "./services/notes";
import "./index.css";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState("some error happened...");

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    const addNote = (event) => {
        event.preventDefault();
        const newNoteObj = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        };
        noteService.create(newNoteObj).then((returnedNote) => {
            setNotes(notes.concat(returnedNote));
            setNewNote("");
        });
    };
    const handleInput = (event) => {
        setNewNote(event.target.value);
    };

    const toggleImportance = (id) => {
        const note = notes.find((n) => n.id === id);
        const changeNote = { ...note, important: !note.important };
        noteService
            .update(changeNote)
            .then((returnedNote) => {
                // 修改完数据后，发送给后台，后台返回修改后的对象元素，使用 map 实现对象数组指定对象元素修改
                setNotes(
                    notes.map((note) => (note.id === id ? returnedNote : note))
                );
            })
            .catch((error) => {
                setErrorMessage(
                    `Note '${changeNote.content}' was already removed from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter((n) => n.id !== id));
            });
    };

    const showToImpor = showAll
        ? notes
        : notes.filter((note) => note.important);
    console.log("notes", notes);
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}></Notification>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {showToImpor.map((note, index) => (
                    <Note
                        note={note}
                        toggleImportance={toggleImportance}
                        key={note.id}
                    ></Note>
                ))}
            </ul>
            <form
                onSubmit={(event) => {
                    addNote(event);
                }}
            >
                <input
                    value={newNote}
                    onChange={(event) => handleInput(event)}
                ></input>
                &nbsp;&nbsp;&nbsp;
                <button type='submit'>save</button>
            </form>
        </div>
    );
};

export default App;
