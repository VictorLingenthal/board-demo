import axios from 'axios'

export default class UserService implements IUserService {

  public dispatcher:any

  constructor (dispatcher:any) {
    this.dispatcher = dispatcher
  }

  // converts users into format for the dropdown
  private expandUsers = (u:ServerUser[]):User[] =>
    u.map(i => ({value:i.name, label:i.name, id: i._id}))

  // gets All Users from Server
  public getUsers = ():any =>
    axios.get('/users')
      .then(res => this.dispatcher.addUsers(this.expandUsers(res.data)))
      .catch(error => console.log(error))

  // Adds a new Users
  public addUser = (name:string):Promise<any> =>
    axios.post('/users/add', {name})
      .then(res => this.dispatcher.addUser(this.expandUsers([res.data])))
      .catch(function (error) {
        console.log(error)})

  // Deletes a User
  public deleteUser = (id:string):Promise<void>|null =>
    id ? axios.delete('/users/'+id)
      .then(res => this.dispatcher.deleteUser(id))
      .catch(function (error) {
        console.log(error)})
        : null

}
