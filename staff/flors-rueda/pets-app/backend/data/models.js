import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    following: [{
        type: ObjectId,
        ref: 'User'
    }]
});

export const User = model('User', userSchema);

const postSchema = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
}, { timestamps: true });

export const Post = model('Post', postSchema)

