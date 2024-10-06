import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        }
    }
})
export const { setUser, removeUser } = UserReducer.actions
export default UserReducer.reducer