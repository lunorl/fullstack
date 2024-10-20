import { useDispatch } from 'react-redux'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Notification from './components/Notification'
import Filter from './Filter'
import { useEffect } from 'react'
import { fakeAnecdotes, makeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fakeAnecdotes())
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App