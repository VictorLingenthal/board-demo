import globalReducer from "./globalreducer";

export const reducer = {

  // Create a new user
  addUser: (state:User[], user:User) => [user, ...state],

  // Add a user Array
  addUsers: (state:User[], users:User[]) => [...users, ...state],

  // Delete a user by id
  deleteUser: (state:User[], id:string) => state.filter(i => i.id !== id),

};

export default globalReducer(
  // Load users from local storage
  // JSON.parse(localStorage.getItem("users") || "[]"),
  [],
  reducer,
  // On state change, persist to local storage
  // users => localStorage.setItem("users", JSON.stringify(users))
);
