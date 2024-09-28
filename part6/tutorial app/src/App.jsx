import { useEffect } from 'react'
import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './VisibilityFilter'
import noteService from '../services/notes'
import { setNotes} from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [])
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
export default App