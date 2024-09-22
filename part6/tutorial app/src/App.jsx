import { createNote, toggleImportanceOf} from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './NewNote'
import Notes from './Notes'
const App = () => {

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}
export default App