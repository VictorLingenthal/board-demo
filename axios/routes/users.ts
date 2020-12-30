// import express, { Request, Response } from 'express'
// import UserModel, { IUser } from '../models/user.model'
//
// const router = express.Router()
//
// router.route('/').get((req:Request, res:Response<IUser[]|string>) => {
//   UserModel.find()
//     .then((users:IUser[]) => res.json(users))
//     .catch((err:string) => res.status(400).json('Error: ' + err))
// })
//
// router.route('/add').post((req, res) => {
//
//   const name = req.body.name
//   const newUser = new UserModel({ name })
//
//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch((err:string) => res.status(400).json('Error ' + err))
// })
//
// router.route('/:id').get((req,res) => {
//   UserModel.findById(req.params.id)
//     .then((user:IUser|null) => res.json(user))
//     .catch((err:string) => res.status(400).json('Error: ' + err))
// })
//
// router.route('/:id').delete((req,res) => {
//   UserModel.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User deleted.'))
//     .catch((err:string) => res.status(400).json('Error: ' + err))
// })
//
// export default router
