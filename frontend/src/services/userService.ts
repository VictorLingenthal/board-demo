import { User } from '../reducers/useUsers'
import { gql } from '@apollo/client';

import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

type ServerUser = {
  id: string
  name: string
}

export interface IUserService {
  getUsers(addUsers:Function):Promise<any>
  addUser(addUser:Function, name:string):Promise<string>
  deleteUser(deleteUser:Function, id:string):Promise<void>|null
}

// converts users into format for the dropdown
const expandUsers = (u:ServerUser[]):User[] =>
  u.map(i => ({value:i.name, label:i.name, id: i.id}))


export class UserService implements IUserService {

  private static instance:IUserService
  apolloClient:ApolloClient<NormalizedCacheObject>

  private constructor (apolloClient:ApolloClient<NormalizedCacheObject>) {
    this.apolloClient = apolloClient
  }

  public static getInstance(apolloClient?: ApolloClient<NormalizedCacheObject>): IUserService {
    if (!UserService.instance && apolloClient) {
        UserService.instance = new UserService(apolloClient)
    }

    return UserService.instance;
  }

  // gets All Users from Server
  public getUsers = (addUsers:Function):Promise<void> =>
    this.apolloClient.query({
      query: gql`{
          users {
            name
            id
          }
        }`,
    })
    .then(res => addUsers(expandUsers(res.data.users)))
    .catch(err => console.log(err))

  // Adds a new Users
  public addUser = (addUser:Function, name:string):Promise<any> =>
    this.apolloClient.mutate({
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
    .catch(err => console.log(err))

  // Deletes a User
  public deleteUser = (deleteUser:Function, id:string):Promise<void>|null =>
    id ? this.apolloClient.mutate({
        variables: {id},
        mutation: gql`
          mutation DeleteUser($id: ID) {
            deleteUser(id: $id)
          }`,
      })
      .then(res => deleteUser(id))
      .catch(err => console.log(err)) : null

}
