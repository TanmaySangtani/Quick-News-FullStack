const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true  
    }, 
    email: {
        type: String, 
        unique: true,
        required:true, 
    }, 
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    likedArticles: {
        type: [String],
        default: []
    },
    dislikedArticles: {
        type: [String],
        default: []
    },
    savedArticles: {
        type: [String],
        default: []
    },
    createdArticles: {
        type: [{
            cartid: {
                type: String,
                default: ''
            }
        }]
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", UserSchema)

module.exports = User