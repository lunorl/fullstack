import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "./reducers/noteReducer";

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => {
        console.log('s', state)
        if (state.filter === 'ALL') {
            console.log('ALL', state.notes)
            return state.notes
        }
        return state.filter === 'IMPORTANT'
        ? state.notes.filter(note => note.important)
        : state.notes.filter(note => !note.important)
    })
    console.log('notes', notes)
    return (
        <ul>
            {notes.map(note => 
                <Note
                key={note.id}
                note={note}
                handleClick={() => 
                    dispatch(toggleImportanceOf(note.id))
                }
                />
            )}
        </ul>
    )
}

export default Notes