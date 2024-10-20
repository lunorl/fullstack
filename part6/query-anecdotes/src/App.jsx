import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, changeAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'
const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const addAnecdoteVotes = useMutation({
    mutationFn: changeAnecdote,
    onSuccess: queryClient.invalidateQueries({ queryKey: ['anecdotes']})
  })
  const handleVote = (anecdote) => {
    addAnecdoteVotes.mutate(anecdote) 
    dispatch({ type: 'NEW', payload:`anecdote '${anecdote.content}' voted`})
    setTimeout(() => dispatch({ type: 'REMOVE'}), 5000)
    console.log('vote')
  }
  const query = useQuery({
    queryKey: ['anecdotes'], 
    queryFn: getAnecdotes,
    retry: false
  })
  const anecdotes = query.data
  if (query.isLoading) {
    return <div>loading data...</div>
  }
  if (query.isError) {
  return <p>anecdote service not available due to problems in server</p>}
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
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

export default App
