import User from '../../models/user.model'

export const userResolvers = {
  Query: {
    user: async (__:any, args:any) => await User.findById(args.id),
    users: async () => await User.find(),
  },
  Mutation : {
    addUser: async (__:any, args:any) =>
      await new User({ name: args.name }).save(),
    deleteUser: async (__:any, args:any) =>
      await User.findByIdAndDelete(args.id)
  }
}
