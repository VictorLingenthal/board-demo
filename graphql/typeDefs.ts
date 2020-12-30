import { gql } from 'apollo-server-express'
import { userDefs } from './Typedefs/user'
import { cardDefs } from './Typedefs/card'

export const typeDefs = gql`

  type Query {
    name: String
  }

  type Mutation {
    addName(name:String):String
  }

  ${userDefs}
  ${cardDefs}

`;
