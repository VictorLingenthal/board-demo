import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

require('dotenv').config()

const app: Application = express()

const port = process.env.PORT || 5000

app.use(cors<any>())
app.use(express.json())

app.use(express.static(__dirname + "/frontend/build"))

const uri:any = process.env.ATLAS_URI
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
