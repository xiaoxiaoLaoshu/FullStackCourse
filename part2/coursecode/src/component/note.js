import React from 'react'

const note = ({note, index, toggleImportance}) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
        <li className="note">
            {note.content}
                &nbsp;&nbsp;&nbsp;<button onClick={() => toggleImportance(note.id)}>{label}</button>
        </li>
    )
}

export default note
