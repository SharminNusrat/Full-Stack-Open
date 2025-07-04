const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nusrat_215:${password}@cluster0.avt1gtq.mongodb.net/testBloglist?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

if(process.argv.length > 3) {
    const blog = new Blog({
        title: process.argv[3],
        author: process.argv[4],
        url: process.argv[5],
        likes: process.argv[6]
    })
    blog.save().then(result => {
        console.log(`added ${blog.title} to testBloglist`)
        mongoose.connection.close()
    })
} else {
    console.log('bloglist:')
    Blog.find({}).then(result => {
        result.forEach(blog => {
            console.log(`${blog.title} ${blog.author} ${blog.url} ${blog.likes}`)
        })
        mongoose.connection.close()
    })
}