import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
    const repsonse = await axios.get(baseUrl)
    return repsonse.data
}
const createNew = async (content) => {
    const object = { content, important: false}
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew }