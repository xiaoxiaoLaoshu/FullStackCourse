import React from 'react'
const Notification = ({name, isError}) => {
    if(name === null) {
        return null
    }
    if(isError) {
        return (
            <div className="error">
                {name}
            </div>
        )
    }
    return (
        <div className="notification">
            add {name}
        </div>
    )
}

export default Notification