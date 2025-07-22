const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {blogsInDb} = require('../utils/list_helper')

const api = supertest(app)

const testBlogs = [
    {
        title: "React Patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 10
    },
    {
        title: "My First Blog",
        author: "Nusrat Sharmin",
        url: "http://blog.messycoder.com/shamapuu/first-blog",
        likes: 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(testBlogs[0])
    await blogObject.save()
    blogObject = new Blog(testBlogs[1])
    await blogObject.save()
})

test.only('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('all blogs are returend', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, testBlogs.length)
})

test.only('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)

    const titles = response.body.map(blog => blog.title)
    console.log('titles ', titles)
    assert.strictEqual(titles.includes('My First Blog'), true)
})

test.only('id exists in each blog', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert.ok(blog.id)
    })
})

test.only('all ids are unique', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(blog => blog.id)
    assert.strictEqual(ids.length, new Set(ids).size)
})

test.only('total number of blogs is increased by one after post request', async () => {
    const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://test.com',
        likes: 2
    }

    let response = await api.get('/api/blogs')
    const totalBlogsBefore = response.body.length

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    response = await api.get('/api/blogs')

    const totalBlogsAfter = response.body.length

    const titles = response.body.map(r => r.title)

    assert.strictEqual(totalBlogsAfter, totalBlogsBefore + 1)

    assert(titles.includes('Test blog'))
})

test.only('without likes field will default to the likes value 0', async () => {
    const newBlog = {
        title: 'Test blog without likes',
        author: 'test author',
        url: 'http://nolikes.com'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.likes, 0)
})

test.only('fails with status 400 if title is missing', async () => {
    const newBlog = {
        author: 'No author',
        url: 'http://test.com'
    }

    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test.only('fails with status 400 if url is missing', async () => {
    const newBlog = {
        title: 'No url blog',
        author: 'No author',
    }

    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test.only('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api   
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test.only('returns updated blog', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 3
    }

    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
    
    assert.strictEqual(response.body.likes, blogToUpdate.likes + 3)
})

after(async () => {
    await mongoose.connection.close()
})