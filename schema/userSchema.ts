import { buildSchema } from 'graphql'

var userSchema = buildSchema(`
  type Query {
    name: String
  }
`);
