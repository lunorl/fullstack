import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
  name: "noti",
  initialState: { notification: null, type: null },
  reducers: {
    createNotification(state, action) {
      return {
        type: action.payload.type,
        notification: action.payload.notification,
      };
    },
    deleteNotification() {
      return { notification: null, type: null };
    },
  },
});

export const { createNotification, deleteNotification } = notiSlice.actions;
export default notiSlice.reducer;
export const tempNoti = (noti, type) => {
  return (dispatch) => {
    dispatch(createNotification({ notification: noti, type: type }));
    setTimeout(() => dispatch(deleteNotification()), 5000);
  };
};
