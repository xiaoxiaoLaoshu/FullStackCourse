import React from "react";
const Persons = ({ filterName, filterPersons, deletePerson, persons }) => {
    return (
        <>
            {filterName
                ? filterPersons.map((person) => (
                      <p key={person.id}>
                          {person.name} {person.number}
                      </p>
                  ))
                : persons.map((person) => (
                      <p key={person.id}>
                          {person.name} {person.number}
                          <button onClick={() => deletePerson(person)}>
                              delete
                          </button>
                      </p>
                  ))}
        </>
    );
};

export default Persons;
