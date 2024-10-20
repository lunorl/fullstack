import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { postAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const addNewAnecdotes = useMutation({
    mutationFn: postAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      dispatch({ type: 'NEW', payload:`anecdote '${anecdote.content}' added`})
      setTimeout(() => dispatch({ type: 'REMOVE'}), 5000)
    },
    onError: () =>  {     dispatch({ type: 'NEW', payload:`too short anecdote, must have length 5 or more`})
    setTimeout(() => dispatch({ type: 'REMOVE'}), 5000)}
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addNewAnecdotes.mutate({content, votes: 0})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' required/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
