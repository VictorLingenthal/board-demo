import { gql } from 'apollo-server-express'
import Card, { ICard } from '../models/card.model'

export const cardDefs = gql`

type Card {
  title: String!
  id: ID!
  status: String
  owner: String
  creator: String
  date: String
}

input CardInput {
  title: String
  status: String
  owner: String
  creator: String
  date: String
}

extend type Query {
  card(id:ID): Card
  cards: [Card]
}

extend type Mutation {
  addCard(status:String):Card
  deleteCard(id:ID):String
  updateCard(id:ID, card:CardInput):Card
}

`

export const cardResolvers = {
  Query: {
    cards: async () => await Card.find()
      .then((cards:ICard[]) => cards)
      .catch((err) => console.log('Error: ' + err)),
    card: async (id:string) => await Card.findById(id)
      .then((card:ICard|null) => card)
      .catch((err) => console.log('Error: ' + err))
  },
  Mutation : {
    addCard: async (__:any, args:any) => {

        const title = args.title || ''
        const status = args.status || 'todo'
        const owner = args.owner || null
        const creator = args.creator || 'victor'
        const date = Date.parse(args.date) || Date.now()

        const newCard:ICard = new Card({ title, status, owner, creator, date })

        return await newCard.save()
          .then(() => newCard)
          .catch((err:string) => 'Error ' + err)
    },
    deleteCard: async (__:any, args:any) => {
      Card.findByIdAndDelete(args.id)
        .then(() => 'Card deleted.')
        .catch((err:string) => `Error: ${err}`)
    },
    updateCard: async (__:any, args:any) => {
      Card.findById(args.id)
        .then((card:ICard|null) => {
          if (card) {
          card.title = args.card.title || card.title
          card.status = args.card.status || card.status
          card.owner = args.card.owner || card.owner
          card.creator = args.card.creator || card.creator
          card.date = args.card.date || card.date
          // card.date = Date.parse(args.card.date) || card.date
          card.save()
            .then(() => card)
            .catch((err:string) => `Error: ${err}`)
          } else return 'There was no card with this id'
        })
        .catch((err:string) => `Error: ${err}`)
    }
  }
}
