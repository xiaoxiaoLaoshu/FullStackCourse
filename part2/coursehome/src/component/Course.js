import React from 'react'
const Course = ({course}) => {
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
            <h3>total of {course.parts.reduce((prev, curr) => { return prev + curr.exercises }, 0)} exercises</h3>
        </div>
    )
}

export default Course