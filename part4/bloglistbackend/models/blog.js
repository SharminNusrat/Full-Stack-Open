const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returndedObject) => {
    returndedObject.id = returndedObject._id.toString()
    delete returndedObject._id
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog