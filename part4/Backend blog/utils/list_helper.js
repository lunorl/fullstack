const _ = require('lodash');
const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => likes += blog.likes)
    return likes
}
const favoriteBlog = (blogs) => {
    let highest = 0
    let returned = null
    blogs.forEach(blog => {
        if (blog.likes > highest) {
            returned = blog
            highest = blog.likes
        }
    })
    return returned
}
const mostBlogs = (blogs) => {
    const long = _.groupBy(blogs, 'author')
    const longest = _.maxBy(Object.keys(long), (author) => long[author].length)
    return longest
}
const mostLikes = (blogs) => {
    const long = _.groupBy(blogs, 'author')
    const longest = _.maxBy(Object.keys(long), (author) => long[author].reduce((sum, blog) => sum+blog.likes, 0))
    return {author: longest, likes: long[longest].reduce((sum, blog) => sum+blog.likes, 0)}
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}