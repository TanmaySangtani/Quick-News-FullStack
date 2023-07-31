const connectToMongo = require('./db')
connectToMongo()

// to load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const port = 5000

var cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const cookieParser = require('cookie-parser')

//API payload size limit
app.use(express.json({limit: '100mb'}))

app.use(cookieParser())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//To use req.body, we need to use this middleware
app.use(express.json())

//Available Routes
app.use('/api/article', require('./routes/articles'))
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

