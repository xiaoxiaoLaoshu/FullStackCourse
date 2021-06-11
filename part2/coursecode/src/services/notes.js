import axios from 'axios'

const baseUrl = 'http://localhost:3002/notes'

const getAll = () => {
    const request =  axios.get(baseUrl)
    return request.then(response => response.data).catch(error => console.log(error))
}

const create = (newNoteObj) => {
    const request =  axios.post(baseUrl, newNoteObj)
    return request.then(response => response.data).catch(error => console.log(error))
}

const update = (newNoteObj) => {
    const request =  axios.put(`${baseUrl}/${newNoteObj.id}`, newNoteObj)
    return request.then(response =>response.data).catch(error => {
        console.log('error', error)
    })
}

export default {
    getAll,
    create,
    update
}