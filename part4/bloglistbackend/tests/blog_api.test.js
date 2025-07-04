const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

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

    const title = response.body.map(e => e.title)
    assert.strictEqual(title.includes('My First Blog'), true)
})

after(async () => {
    await mongoose.connection.close()
})