import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({filterName, handleFilterName}) => {
    return (
        <>
            filter show with    <input value={filterName} onChange={(event) => handleFilterName(event)}></input>
        </>
    )
}

const PersonForm = ({addPhone, newName, newNumber, handleChangeNewName, handleChangeNewNumber}) => {
    return (
        <form onSubmit={(event) => addPhone(event)}>
                <div>
                name : <input value={newName} onChange={(event) => handleChangeNewName(event)}></input>
                number: <input value={newNumber} onChange={(event) => handleChangeNewNumber(event)}></input>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

const Persons = ({filterName, filterPersons, persons}) => {
    return (
        <>
            {filterName ? filterPersons.map(person => <p key={person.number}>{person.name} {person.number}</p>) : persons.map(person => <p key={person.number}>{person.name} {person.number}</p>)}
        </>
    )
}

const App_submit = () =>{
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [filterPersons, setFilterPersons] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3002/persons')
        .then(response => {
            setPersons(response.data)
        })
    }, [])

    const handleChangeNewName = (event) => {
        setNewName(event.target.value)
    }
    const handleChangeNewNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterName = (event) => {
        setFilterName(event.target.value)
        setFilterPersons(persons.reduce((prev, curr) => {
            if(curr.name.includes(event.target.value)) {
                prev.push(curr)
                return prev
            }
            return prev
        }, []))
    }
    const addPhone = (event) => {
        const newPhoneObj = {
            name: newName,
            number: newNumber
        }
        const isExist = persons.some(person => person.name === newPhoneObj.name)

        if(isExist) {
            alert(`${newName} is already added to phonebook`)
            return false
        }

        setPersons(persons.concat(newPhoneObj))
        setNewName('')
        setNewNumber('')
        event.preventDefault()
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterName={filterName} handleFilterName={handleFilterName}></Filter>
            <h3>add new</h3>
            <PersonForm addPhone={addPhone} newName={newName} newNumber={newNumber} handleChangeNewName={handleChangeNewName} handleChangeNewNumber={handleChangeNewNumber}></PersonForm>
            <h3>Number</h3>
            <Persons filterName={filterName} filterPersons={filterPersons} persons={persons}></Persons>
        </div>
    )
}

export default App_submit
