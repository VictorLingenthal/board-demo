export {}
// import axios from 'axios'
//
// import { User } from '../reducers/useUsers'
//
// type ServerUser = {
//   _id: string
//   name: string
// }
//
// interface IUserServiceConst {
//   getUsers(addUsers:Function):Promise<any>
//   addUser(addUser:Function, name:string):Promise<string>
//   deleteUser(deleteUser:Function, id:string):Promise<void>|null
// }
//
//   // converts users into format for the dropdown
// const expandUsers = (u:ServerUser[]):User[] =>
//   u.map(i => ({value:i.name, label:i.name, id: i._id}))
//
// export const userService:IUserServiceConst  = {
//
//   // gets All Users from Server
//   getUsers : (addUsers:Function):Promise<void> =>
//     axios.get('/users')
//       .then(res => addUsers(expandUsers(res.data)))
//       .catch(error => console.log(error)),
//
//   // Adds a new Users
//   addUser : (addUser:Function, name:string):Promise<any> =>
//     axios.post('/users/add', {name})
//       .then(res => addUser(expandUsers([res.data])))
//       .catch(function (error) {
//         console.log(error)}),
//
//   // Deletes a User
//   deleteUser : (deleteUser:Function, id:string):Promise<void>|null =>
//     id ? axios.delete('/users/'+id)
//       .then(res => deleteUser(id))
//       .catch(function (error) {
//         console.log(error)})
//         : null
//
// }
