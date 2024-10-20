import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const addNew = async (stuff) => {
    console.log('mmmm')
    const response = await axios.post(baseUrl, stuff)
    return response.data
}
const changeVote = async (content) => {
    const response = await axios.put(`${baseUrl}/${content.id}`, {content: content.content, votes: content.votes+1, id: content.id})
}

export default { getAll, addNew, changeVote }