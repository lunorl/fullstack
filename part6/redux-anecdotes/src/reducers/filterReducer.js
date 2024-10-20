import { createSlice } from '@reduxjs/toolkit'
const initialState = ''
const filterReducer = createSlice({
    name:"filter",
    initialState,
    reducers: {
    newFilter(state, action) {
        console.log(action.payload)
        return action.payload
    }

    }



})
export default filterReducer.reducer