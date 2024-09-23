import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import noteReducer, { setNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'
import noteService from '../services/notes'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

noteService.getAll().then(notes => (setNotes(notes))
)
console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)