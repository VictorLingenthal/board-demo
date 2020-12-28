import { User } from '../reducers/useUsers'

import { gql } from '@apollo/client';
import { apolloClient } from '../services/apolloClient'

type ServerUser = {
  id: string
  name: string
}

interface IUserServiceConst {
  getUsers(addUsers:Function):Promise<any>
  addUser(addUser:Function, name:string):Promise<string>
  deleteUser(deleteUser:Function, id:string):Promise<void>|null
}

// converts users into format for the dropdown
const expandUsers = (u:ServerUser[]):User[] =>
  u.map(i => ({value:i.name, label:i.name, id: i.id}))

export const userService:IUserServiceConst  = {

  // gets All Users from Server
  getUsers : (addUsers:Function):Promise<void> =>
    apolloClient.query({
      query: gql`{
          users {
            name
            id
          }
        }`,
    })
    .then(res => addUsers(expandUsers(res.data.users)))
    .catch(err => console.log(err)),

  // Adds a new Users
  addUser : (addUser:Function, name:string):Promise<any> =>
    apolloClient.mutate({
      variables: {name},
      mutation: gql`
        mutation AddUser($name: String) {
          addUser(name: $name) {
            id
            name
          }
        }`,
    })
    .then(res => addUser(expandUsers([res.data.addUser])))
    .catch(err => console.log(err)),

  // Deletes a User
  deleteUser : (deleteUser:Function, id:string):Promise<void>|null =>
    id ? apolloClient.mutate({
        variables: {id},
        mutation: gql`
          mutation DeleteUser($id: ID) {
            deleteUser(id: $id)
          }`,
      })
      .then(res => deleteUser(id))
      .catch(err => console.log(err)) : null

}
