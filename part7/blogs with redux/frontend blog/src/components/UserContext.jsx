import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children, initialUser = null }) => {
    const [user, setUser] = useState(initialUser)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

    )
}
export const useUserContext = () => useContext(UserContext)