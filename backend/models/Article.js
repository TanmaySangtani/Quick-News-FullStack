const mongoose = require('mongoose')

const { Schema } = mongoose

const ArticleSchema = new Schema({
    title: {
        type: String, 
        default: null   
    }, 
    description: {
        type: String, 
        default: null 
    }, 
    imageUrl: {
        type: String,
        default: null
    },
    newsUrl: {
        type: String,
        required: true,
        default: null
    },
    publishedAt: {
        type: Date, 
        default: null 
    },
    source: {
        type: String, 
        default: null 
    },
    category: {
        type: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    dislikeCount: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('article', ArticleSchema)