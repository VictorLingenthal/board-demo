import axios from 'axios'
import useUsers from '../reducers/useUsers'

export default class UserService implements IUserService {

  public users
  public dispatcher

  constructor () {
    const [userArray, dispatcher] = (useUsers as any)()
    this.users = userArray
    this.dispatcher = dispatcher
  }

  // converts users into format for the dropdown
  private expandUsers = (u:ServerUser[]):User[] =>
    u.map(i => ({value:i.name, label:i.name, id: i._id}))

  // gets All Users from Server
  public getUsers = ():void => {
    axios.get('http://localhost:5000/users')
      .then(res => this.dispatcher.addUsers(this.expandUsers(res.data)))
      .catch(error => console.log(error))
  }

  // Adds a new Users
  public addUser = (name:string) =>
    axios.post('http://localhost:5000/users/add', {name: name})
      .then(res => this.dispatcher.addUser(this.expandUsers([res.data])))
      .catch(function (error) {
        console.log(error)})

    // Adds a new Users
    public deleteUser = (id:string) =>
      id ? axios.delete('http://localhost:5000/users/'+id)
        .then(res => this.dispatcher.deleteUser(this.expandUsers([res.data])))
        .catch(function (error) {
          console.log(error)})
          : null

}
