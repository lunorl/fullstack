import { createSlice } from "@reduxjs/toolkit";

const notiSlicer = createSlice({
    name:'notification',
    initialState:'',
    reducers: {
        addNoti(state, action) {
            return action.payload
        },
        removeNoti() {
            return ''
        }
    }
})
export default notiSlicer.reducer
export const { addNoti, removeNoti } = notiSlicer.actions
export const setNotification = (content, length) => {
    return async dispatch => {
        await dispatch(addNoti(content))
        setTimeout(async () => {await dispatch(removeNoti())}, length)
    }
}