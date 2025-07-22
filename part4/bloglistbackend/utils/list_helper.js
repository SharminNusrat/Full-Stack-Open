const Blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 
        ? 0
        : blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
        ? null
        : blogs.reduce((favBlog, blog) => {
            return blog.likes > favBlog.likes ? blog : favBlog
        }, blogs[0])
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    blogsInDb
}