import React, { createContext, useContext, useState } from 'react'

const WordsContext = createContext()

export const WordsProvider = ({ children, initialWords = null }) => {
    const [words, setWords] = useState(initialWords)

    return (
        <WordsContext.Provider value={{ words, setWords }}>
            {children}
        </WordsContext.Provider>

    )
}
export const useWordsContext = () => useContext(WordsContext)