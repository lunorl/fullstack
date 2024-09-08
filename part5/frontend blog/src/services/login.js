import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    console.log(credentials)
    const login = await axios.post(baseUrl, credentials)
    return login.data
}
export default { login }