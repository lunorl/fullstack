import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import PromisePolyfill from 'promise-polyfill'
const useNotes = (url) => {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        axios.get(url).then(response => {
            setNotes(response.data)
        })
    }, [url])
    return notes
} 
const App = () => {
    const [counter, setCounter] = useState(0)
    const [values, setValues] = useState([])
    const url = 'https://notes2023.fly.dev/api/notes'
    const notes = useNotes(backend_url)
    if (!window.Promise) {
        window.Promise = PromisePolyfill
    }
    const handleClick = () => {
        setCounter(counter+1)
        setValues(values.concat(counter))
    }
    return (
        <div className="container">
            hello webpack {counter} clicks
            <button onClick={handleClick}>
                press
                </button>
        <div>{notes.length} notes on server {backend_url}</div>
        </div>
    )
}

export default App