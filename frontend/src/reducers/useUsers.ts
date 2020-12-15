import globalReducer from "./globalreducer";

export type User = {
  value: string
  label: string
  id: string
}

interface IUserReducer {
  addUser(state:User[],user:User):User[]
  addUsers(state:User[], users:User[]):User[]
  deleteUser(state:User[], id:string):User[]
}

export const reducer:IUserReducer = {

  // Create a new user
  addUser: (state:User[], user:User):User[] => [user, ...state],

  // Add a user Array
  addUsers: (state:User[], users:User[]):User[] => [...users, ...state],

  // Delete a user by id
  deleteUser: (state:User[], id:string):User[] => state.filter(i => i.id !== id),

};

export interface IUserDispatcher {
  addUser(user:User[]):void
  addUsers(users:User[]):void
  deleteUser(id:string):void
}

export default globalReducer(
  // Load users from local storage
  // JSON.parse(localStorage.getItem("users") || "[]"),
  [],
  reducer,
  // On state change, persist to local storage
  // users => localStorage.setItem("users", JSON.stringify(users))
);
