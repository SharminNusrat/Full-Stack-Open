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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}