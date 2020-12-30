import { gql } from 'apollo-server-express'

export const userDefs = gql`

  type User {
    name: String!
    id: ID
  }

  extend type Query {
    users: [User]
    user(id:ID): User
  }

  extend type Mutation {
    addUser(name:String):User
    deleteUser(id:ID):Boolean
  }

`
