const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, unique: true},
    name: String,
    passwordHash: {type: String, required: true},
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returedObject) => {
        returedObject.id = returedObject._id.toString()
        delete returedObject._id
        delete returedObject.__v
        delete returedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User