import React from 'react'

const Filter = ({filterName, handleFilterName}) => {
    return (
        <>
            filter show with    <input value={filterName} onChange={(event) => handleFilterName(event)}></input>
        </>
    )
}
export default Filter