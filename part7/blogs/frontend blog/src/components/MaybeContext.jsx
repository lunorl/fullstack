import React, { createContext, useContext, useState } from 'react'

const MaybeContext = createContext()

export const MaybeProvider = ({ children, initialMaybe = false }) => {
    const [maybe, setMaybe] = useState(initialMaybe)

    return (
        <MaybeContext.Provider value={{ maybe, setMaybe }}>
            {children}
        </MaybeContext.Provider>

    )
}
export const useMaybeContext = () => useContext(MaybeContext)