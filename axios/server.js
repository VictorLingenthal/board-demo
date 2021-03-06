"use strict";
// import express, { Application, Request } from 'express'
// import cors from 'cors'
// import mongoose from 'mongoose'
//
// require('dotenv').config()
//
// const app: Application = express()
//
// const port = process.env.PORT || 3000
//
// app.use(cors<Request>())
// app.use(express.json())
//
// app.use(express.static(__dirname + "/frontend/build"))
//
// const uri:any = process.env.ATLAS_URI
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
//
// const connection = mongoose.connection
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully")
// })
//
// import cardRouter from './routes/cards'
// import usersRouter from './routes/users'
//
// app.use('/cards', cardRouter)
// app.use('/users', usersRouter)
//
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`)
// })
