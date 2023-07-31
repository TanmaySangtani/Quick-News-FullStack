const mongoose = require('mongoose')

const { Schema } = mongoose

const UserArticleSchema = new Schema({
    userid: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: 'Untitled'
    },
    dateupdated: {
        type: String,
        default: 'NA'
    },
    author: {
        name: {
            type: String,
            default: 'Anonymous'
        },
        image: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: 'NA'
        }
    },
    articleData: {
        type: [Schema.Types.Mixed],
        default: []
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedId: {
        type: String,
        default: ''
    }
})

const UserArticle = mongoose.models.userarticles || mongoose.model("userarticles", UserArticleSchema)

module.exports = UserArticle