import { userResolvers } from './Resolvers/user'
import { cardResolvers } from './Resolvers/card'

import merge from "lodash/merge.js"

const initResolvers = {
  Query: {
    name: () => 'Peter',
  },
  Mutation : {
    addName: (__:any, args:any) => args.name,
  }
}

export const resolvers = merge(
  initResolvers,
  userResolvers,
  cardResolvers
)
