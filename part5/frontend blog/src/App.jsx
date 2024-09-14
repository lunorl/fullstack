import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [words, setWords] = useState(null)
  const [maybe, setMaybe] = useState(false)
  const changeVisibility = useRef([])
  useEffect(() => {
    const saved = window.localStorage.getItem('localguy')
    if (saved) {
      const guy = JSON.parse(saved)
      setUser(guy)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const guy = await loginService.login({ username, password })
      window.localStorage.setItem('localguy', JSON.stringify(guy))
      console.log('hi')
      setUser(guy)
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
  const handleCreation = async (event) => {
    event.preventDefault()
    if (user) {
      console.log('m', user)
      try {
      await blogService.post({title, author, url, user})
      blogService.getAll().then(blogs => setBlogs( blogs ))  
      setWords(`a new blog ${title} by ${author} added`)
      setMaybe(false)
      setTimeout(() => setWords(null), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      } catch {
        setWords('text fields not completed properly')
        setMaybe(true)
        setTimeout(() => setWords(null), 5000)
      }
    }
  }
  const resete = async () => {
    window.localStorage.removeItem('localguy')
    setUser(null)
  }
  const createForm = () => (
    <Togglable text='new note' text2='cancel'>
    <form onSubmit={handleCreation}>
      <div>
        title:
        <input
        name="title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
        name="author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        name="url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </Togglable>
  )
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
        />
        </div>
        <div>
        password
        <input 
        name="password" 
        type="password"   
        value={password} 
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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  const blog = () => (
    <div>
    <h2>blogs</h2>
    {notification(words, maybe)}
    <p>{user.name} logged in <button onClick={() => resete()}>logout</button></p>
    <h2>create new </h2>  
      {createForm()}
      {blogs.sort((n, b) => n.likes <= b.likes).map((bloge, index) =>
    <div key={bloge.id} style={blogStyle}>
      <Togglable extratext={`${bloge.title} ${bloge.author} `} text='view' ref={changeVisibility.current[index]}> 
        <p>{bloge.title} {bloge.author} <button onClick={() => handleHide(index)}>hide</button> <br /> 
        {bloge.url} <br />
        likes {bloge.likes} <button onClick={() => {
          const updatedBlogs = blogs.map((blog, i) => {
            if (i === index) {
              return { ...blog, likes: blog.likes+1}
            }
          return blog})
          setBlogs(updatedBlogs)
          blogService.updateLikes(blogs[index])

          }}>like</button> <br />
          {console.log('blog ', bloge)}
        {bloge.user.name}<br />
        <button onClick={() => {
          if (window.confirm(`Remove blog ${bloge.title} by ${bloge.author}`)) {
            blogService.remove(user, bloge)
            const stuff = blogs.filter(blog => blog !== bloge)
            setBlogs(stuff)
          } 
        }}>remove</button> </p>
      </Togglable>
      </div>
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