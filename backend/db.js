//Using common js in this
const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/quicknews"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, 
        console.log("Connected to Mongo successfully")
    )
}

module.exports = connectToMongo
