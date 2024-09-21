import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { useBlogContext } from './components/BlogContext'
import { useUserContext } from './components/UserContext'
import { useMaybeContext } from './components/MaybeContext'
import { useWordsContext } from './components/WordsContext'
import loginService from './services/login'
import './index.css'
import CreateForm from './components/CreateForm'
const App = () => {
  console.log('context', useBlogContext())
  const { blogs, setBlogs } = useBlogContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useUserContext()
  const {words, setWords} = useWordsContext()
  const {maybe, setMaybe} = useMaybeContext()
  const changeVisibility = useRef([])
  useEffect(() => {
    const saved = window.localStorage.getItem('localguy')
    if (saved) {
      const guy = JSON.parse(saved)
      setUser(guy)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, [setBlogs]);
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const guy = await loginService.login({ username, password })
      window.localStorage.setItem('localguy', JSON.stringify(guy))
      console.log('hi')
      console.log(guy)
      await setUser(guy)
      setPassword('')
      setUsername('')
    } catch (exception) {
      console.log('hiss')
      setMaybe(true) 
      setWords('wrong username or password')
      setTimeout(() => {
        setWords(null)}, 5000)
    }
  }
  const resete = async () => {
    window.localStorage.removeItem('localguy')
    setUser(null)
  }
  const loginForm = () => (
    <div>
    <h2>log in to application</h2>
    {notification(words, maybe)}
      <form onSubmit={handleLogin}>
        <div>
        username
        <input 
        name="username" 
        type="text" 
        value={username} 
        onChange={({ target }) => setUsername(target.value)}
        placeholder="type username here"
        />
        </div>
        <div>
        password
        <input 
        name="password" 
        type="password"   
        value={password} 
        placeholder="type password here"
        onChange={({ target }) => setPassword(target.value)}
        />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
  )
  const notification = (text, red) => {
    if (text === null) {
      return null
    }
    if (red) {
      console.log('hi')
      return (
      <div className='red'>
        {text}
      </div>)
    } else {
      console.log('mmm')
      return (
      <div className='green'>
      {text}
    </div>
      )
    }
  }
  if (changeVisibility.current.length !== blogs.length) {
    changeVisibility.current = Array(blogs.length).fill().map((_, i) => changeVisibility.current[i] || React.createRef());
  }
  const handleHide = (index) => {
    if (changeVisibility.current[index] && changeVisibility.current[index].current) {
      changeVisibility.current[index].current.m();
    }
  };
  const blog = () => (
    <div>
    <h2>blogs</h2>
    {notification(words, maybe)}
    <p>{user.name} logged in <button onClick={() => resete()}>logout</button></p>
    <h2>create new </h2>  
      <CreateForm/>
      {blogs.sort((n, b) => n.likes <= b.likes).map((bloge, index) =>
      <Blog bloge={bloge} index={index} key={bloge.id} handleHide={handleHide} />
    )}
  </div>
  )
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
    {user === null ? loginForm() : blog()}
    </div>
  )
}

export default App