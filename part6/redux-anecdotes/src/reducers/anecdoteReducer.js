import { createSlice } from '@reduxjs/toolkit'
import { useDispatch  } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
const anecdoteSlicer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      console.log('nn', action.payload)
      let bar = state.find(anecdote => anecdote.id === action.payload)
      if (bar) {
        bar.votes += 1
      }
    },
    addAnec(state, action) {
      console.log(action.payload)
      return state.concat(action.payload)
    },
    makeAnecdotes(state, action) {
      return action.payload
    }
  }
})
export default anecdoteSlicer.reducer
export const { addVote, addAnec, makeAnecdotes } = anecdoteSlicer.actions
export const fakeAnecdotes = () => {
  return async dispatch => {
    const thing = await anecdoteService.getAll()
    dispatch(makeAnecdotes(thing))
  }
}
export const newAnecdote = content => {
  return async dispatch => {
    anecdoteService.addNew(content)
    dispatch(addAnec(content))
    dispatch(setNotification(`you added '${content.content}'`, 5000))
  }
}
export const addnVote = id => {
  return async (dispatch, getState) => {
    console.log('lla')
    const state = getState().anecdotes
    console.log('state', state)
    const content = state.find(anecdote => anecdote.id === id)
    console.log('content', content)
    await anecdoteService.changeVote(content)
    await dispatch(addVote(content.id))
  }
}
export { asObject, getId }