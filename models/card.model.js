const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cardSchema = new Schema({
  title: { type: String },
  status: { type: String },
  owner: { type: String },
  creator: { type: String },
  date: { type: Date },
}, {
  timestamps: true
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card
