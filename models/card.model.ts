import { model, Schema, Document, Model } from 'mongoose'

export interface ICard extends Document {
  title: string
  status: string
  owner: string
  creator: string
  date: Date
}

const cardSchema = new Schema({
  title: { type: String },
  status: { type: String },
  owner: { type: String },
  creator: { type: String },
  date: { type: Date },
}, {
  timestamps: true
})

const Card: Model<ICard> = model('Card', cardSchema)

export default Card
