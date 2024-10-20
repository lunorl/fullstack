import { createContext, useReducer } from 'react'
const NotificationContext = createContext()
const notificationReducer = (state, action) => {
    switch (action.type) {
        case "NEW":
            return action.payload
        case "REMOVE":
            return ''
    }
}

export const NotificationContextProvider = (props) => {
    const [counter, counterDispatch] = useReducer(notificationReducer, 0)

    return (
        <NotificationContext.Provider value={[counter, counterDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}
export default NotificationContext