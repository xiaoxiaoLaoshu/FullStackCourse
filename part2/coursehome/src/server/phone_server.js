import axios from 'axios'

const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(error => console.log('error', error))
}

const addPersonInfo = (phone) => {
    const request = axios.post(baseUrl, phone)
    return request.then(response => response.data).catch(error => console.log('error', error))
}

const deletePersonInfo = (person) => {
    const request = axios.delete(baseUrl + `/${person.id}`)
    return request.then(response => response.data).catch(error => console.log('error', error))
}

const updatePersonInfo = (id, newPerson) => {
    const request = axios.put(baseUrl + `/${id}`, newPerson)
    return request.then(response => response.data).catch(error => console.log('error', error))
}

export  {
    getAll,
    addPersonInfo,
    deletePersonInfo,
    updatePersonInfo
}