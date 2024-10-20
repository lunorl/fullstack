import { useSelector, useDispatch } from "react-redux"
import anecdoteService from './services/anecdotes'
import { addnVote } from "./reducers/anecdoteReducer"
import { setNotification } from "./reducers/notificationReducer"

const AnecdoteList = () => {
  console.log('state', useSelector(state => state.filter))
    const anecdotes = useSelector(({anecdotes, filter}) => anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
    console.log('anecdotes', anecdotes)
    const dispatch = useDispatch()
    const handleVote = async (anecdote) => {
      dispatch(addnVote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }
    return (
        <div>
        {anecdotes.sort((a, b)=> b.votes-a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
          </div>
    )
}
export default AnecdoteList