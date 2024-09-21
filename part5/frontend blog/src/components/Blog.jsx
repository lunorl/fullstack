import React, { useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useBlogContext } from './BlogContext'
import { useUserContext } from './UserContext'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  marginBottom: 5
}
const Blog = ({ bloge, index, click }) => {
  const { blogs, setBlogs } = useBlogContext()
  const { user, setUser } = useUserContext()
  const changeVisibility = useRef([])
  console.log('all', bloge)
  if (changeVisibility.current.length !== blogs.length) {
    changeVisibility.current = Array(blogs.length).fill().map((_, i) => changeVisibility.current[i] || React.createRef());
  }
  const handleHide = (index) => {
    if (changeVisibility.current[index] && changeVisibility.current[index].current) {
      changeVisibility.current[index].current.m();
    }
  };
  return (
  <div key={bloge.id} style={blogStyle}>
  <Togglable extratext={`${bloge.title} ${bloge.author} `} text='view' ref={changeVisibility.current[index]}> 
    <p>{bloge.title} {bloge.author} <button onClick={() => handleHide(index)}>hide</button> <br /> 
    {bloge.url} <br />
    likes {bloge.likes} <button placeholder='liking' onClick={ async () => {
      if (click != null) {
        console.log('hey')
        click('hi')
      } else {
      console.log(click, 'mgnbmgnmgfh')
      const updatedBlogs = blogs.map((blog, i) => {
        if (i === index) {  
          return { ...blog, likes: blog.likes+1}
        } else {
          return blog
        }})
      const updated = updatedBlogs[index]
      const blog = updated
      console.log(index, 'asdas;kifjhsdaflkjsdfhjsdkjlfhsdlkf', blog)
      await blogService.updateLikes(updated)
      setBlogs(updatedBlogs)}}}>
        like</button> <br />
      {console.log('blog ', bloge)}
    {bloge.user.name}<br />
    {bloge.user.id === user.id ? <button onClick={ async () => {
      if (window.confirm(`Remove blog ${bloge.title} by ${bloge.author}`)) { 
        console.log('hihihi')
        await blogService.remove(user, bloge)
        const stuff = blogs.filter(blog => blog !== bloge)
        setBlogs(stuff)
      } 
    }}>remove</button>  : null} </p>
  </Togglable>
  </div>)
}

export default Blog