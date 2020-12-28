import { gql } from 'apollo-server-express'
import User, { IUser } from '../models/user.model'

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

export const userResolvers = {
  Query: {
    user: async (__:any, args:any) => await User.findById(args.id)
        .then((user:IUser|null) => user)
        .catch((err:string) => 'Error: ' + err),
    users: async () => await User.find()
      .then((users:IUser[]) => users)
      .catch((err:string) => console.log('Error: ' + err)),
  },
  Mutation : {
    addUser: async (__:any, args:any) => {
      const newUser = new User({ name: args.name })
      return await newUser.save()
        .then(() => newUser)
        .catch((err:string) => 'Error ' + err)
    },
    deleteUser: async (__:any, args:any) => {
      return await User.findByIdAndDelete(args.id)
        .then(() => true)
        .catch((err:string) => false)
    },
  }
}