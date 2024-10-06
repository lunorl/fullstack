import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    console.log('creds', credentials)
    const login = await axios.post(baseUrl, credentials)
    console.log('data', login.data)
    return login.data
}
export default { login }