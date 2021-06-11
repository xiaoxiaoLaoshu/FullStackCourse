import React, { useState, useEffect } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import Notification from "./component/Notification";
import {
    getAll,
    addPersonInfo,
    deletePersonInfo,
    updatePersonInfo,
} from "./server/phone_server";

import "./index.css";

const App_phone = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");
    const [filterPersons, setFilterPersons] = useState([]);
    const [notifiy, setNotifiy] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getAllInfo = async () => {
            const result = await getAll();
            setPersons(result);
        };

        getAllInfo();
    }, []);

    const handleChangeNewName = (event) => {
        setNewName(event.target.value.trim());
    };
    const handleChangeNewNumber = (event) => {
        setNewNumber(event.target.value.trim());
    };
    const handleFilterName = (event) => {
        setFilterName(event.target.value);
        setFilterPersons(
            persons.reduce((prev, curr) => {
                if (curr.name.includes(event.target.value.trim())) {
                    prev.push(curr);
                    return prev;
                }
                return prev;
            }, [])
        );
    };
    const addPhone = async (event) => {
        event.preventDefault();
        const newPersonInfo = {
            name: newName,
            number: newNumber,
        };
        const isExist = persons.some(
            (person) => person.name === newPersonInfo.name
        );

        if (isExist) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one`
                )
            ) {
                const person = persons.find((person) =>
                    person.name === newPersonInfo.name ? person : null
                );
                // 使用 await 关键字处理异步请求，出现报错使用 try catch 语句处理
                try {
                    const data = await updatePersonInfo(person.id, newPersonInfo)
                    setPersons(
                        persons.map((person) =>
                            person.id === data.id
                                ? { ...person, number: data.number }
                                : person
                        )
                    );
                    setNewName("");
                    setNewNumber("");
                    setNotifiy(newName);
                    setTimeout(() => {
                        setNotifiy(null);
                    }, 5000);
                } catch(error) {
                    setIsError(true);
                    setNotifiy(
                        `Infomation of ${newName} has already been removed from server`
                    );
                    setTimeout(() => {
                        setIsError(false);
                        setNotifiy(null);
                    }, 5000);
                    const result = await getAll();
                    setPersons(result);
                }
                return false;
            }
            return false;
        }
        // 没有使用 await 处理异步请求，使用原生的 promise 的.then()和 .catch()方法处理异步请求和处理报错
        addPersonInfo(newPersonInfo).then((returnPerson) => {
            setPersons(persons.concat(returnPerson));
            setNewName("");
            setNewNumber("");
            setNotifiy(newName);
            setTimeout(() => {
                setNotifiy(null);
            }, 5000);
        }).catch(error => console.log('error', error))
    };

    const deletePerson = async (person) => {
        const isDelete = window.confirm(`Delete ${person.name} ?`);
        if (isDelete) {
            await deletePersonInfo(person);
            const result = await getAll();
            setPersons(result);
        }
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification name={notifiy} isError={isError}></Notification>
            <Filter
                filterName={filterName}
                handleFilterName={handleFilterName}
            ></Filter>
            <h3>add new</h3>
            <PersonForm
                addPhone={addPhone}
                newName={newName}
                newNumber={newNumber}
                handleChangeNewName={handleChangeNewName}
                handleChangeNewNumber={handleChangeNewNumber}
            ></PersonForm>
            <h3>Number</h3>
            <Persons
                filterName={filterName}
                filterPersons={filterPersons}
                persons={persons}
                deletePerson={deletePerson}
            ></Persons>
        </div>
    );
};

export default App_phone;
