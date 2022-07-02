import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    console.log("RESPONSE DATA :", response.data)
    return response.data
  })
}

const addPerson = (person) => {
  const request = axios.post(baseUrl, person)
  return request.then((response) => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const updatePerson = (id, newPerson) => {
  console.log("UPDATING PERSON", id)
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then((response) => response.data)
}

export default { getAll, addPerson, deletePerson, updatePerson }
