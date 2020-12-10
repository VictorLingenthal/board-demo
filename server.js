const express = require('express')
const cors =  require ('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(express.static(__dirname + "/frontend/build"))

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

const cardRouter = require('./routes/cards')
const usersRouter = require('./routes/users')

app.use('/cards', cardRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
