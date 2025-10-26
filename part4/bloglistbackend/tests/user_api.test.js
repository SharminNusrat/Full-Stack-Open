const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({username: 'root', passwordHash: passwordHash})
    await user.save()
})

test.only('success with valid user', async () => {
    const usersBefore = await User.find({})

    const newuser = {
        username: 'mary',
        name: 'Rita Mary',
        password: '123456'
    }

    await api
        .post('/api/users')
        .send(newuser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const usersAfter = await User.find({})
    assert.strictEqual(usersAfter.length, usersBefore.length + 1)
})

test.only('should fail with existing username', async () => {
    const newuser = {
        username: 'root',
        name: 'Rita Mary',
        password: '123456'
    }

    const result = await api
        .post('/api/users')
        .send(newuser)
        .expect(400)
    
    assert.ok(result.body.error.includes('username must be unique'))
})

test.only('should fail creation with username less than 3 chars', async () => {
    const newuser = {
        username: 'ab',
        name: 'Rita Mary',
        password: '123456'
    }

    const result = await api
        .post('/api/users')
        .send(newuser)
        .expect(400)
    
    assert.ok(result.body.error.includes('username and password must be at least 3 characters'))
})

test.only('should fail creation with password less than 3 chars', async () => {
    const newuser = {
        username: 'abcd',
        name: 'Rita Mary',
        password: '12'
    }

    const result = await api
        .post('/api/users')
        .send(newuser)
        .expect(400)
    
    assert.ok(result.body.error.includes('username and password must be at least 3 characters'))
})

after(async () => {
  await mongoose.connection.close()
})