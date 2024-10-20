import { useDispatch } from "react-redux"
import anecdoteService from './services/anecdotes'
import { newAnecdote } from "./reducers/anecdoteReducer"
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnec = async (event) => {
      event.preventDefault()
      const anec = event.target.anec.value
      const l = {
        content: anec,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0
      }
      dispatch(newAnecdote(l))
      event.target.anec.value = ''
    }
    
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={handleAddAnec}>
          <div><input name="anec"/></div>
          <button>create</button>
        </form>
      </div>
    )
}
export default AnecdoteForm