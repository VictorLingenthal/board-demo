import express, { Application, Request, Response, NextFunction } from 'express'

let User = require('../models/user.model')

const router = express.Router()


router.route('/').get((req:Request, res:Response<any>) => {
  User.find()
    .then((users:any[]) => res.json(users))
    .catch((err:string) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {

  const name = req.body.name
  const newUser = new User({ name })

  newUser.save()
    .then(() => res.json('User added!'))
    .catch((err:Response) => res.status(400).json('Error ' + err))
})

router.route('/:id').get((req,res) => {
  User.findById(req.params.id)
    .then((user:any) => res.json(user))
    .catch((err:string) => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req,res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch((err:string) => res.status(400).json('Error: ' + err))
})

module.exports = router
