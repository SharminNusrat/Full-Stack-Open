const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.title || !blog.url) {
    response.status(400).json({message: 'Title or url missing'})
  }

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const {likes} = request.body

  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    return response.status(404).end()
  }
  
  blog.likes = likes

  const updatedBlog = await blog.save()
  if(updatedBlog) {
    response.status(200).json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter