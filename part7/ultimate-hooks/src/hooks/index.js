import axios from 'axios'
export const useResource = async (server) => {
    const stuff = await axios.get(server)
    const post = async (one) => {
        await axios.post(server, one)
    }
    const big = {create : post}
    return [stuff, big]
}