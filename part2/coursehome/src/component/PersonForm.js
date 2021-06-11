import React from 'react'
const PersonForm = ({addPhone, newName, newNumber, handleChangeNewName, handleChangeNewNumber}) => {
    return (
        <form onSubmit={(event) => addPhone(event)}>
                <div>
                name : <input value={newName} onChange={(event) => handleChangeNewName(event)}></input> <br />
                number: <input value={newNumber} onChange={(event) => handleChangeNewNumber(event)}></input>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

export default PersonForm