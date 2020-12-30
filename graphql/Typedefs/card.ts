import { gql } from 'apollo-server-express'

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
