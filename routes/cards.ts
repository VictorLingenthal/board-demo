import express, { Application, Request, Response, NextFunction } from 'express'
let CardModel = require('../models/card.model')

const router = express.Router()

router.route('/').get((req, res:Response<any>) => {
  CardModel.find()
    .then((cards:any[]) => res.json(cards))
    .catch((err:string) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {

  const title = req.body.title || ''
  const status = req.body.status || 'todo'
  const owner = req.body.owner || null
  const creator = req.body.creator || 'oliver'
  const date = Date.parse(req.body.date) || Date.now()

  const newCard = new CardModel({ title, status, owner, creator, date })

  newCard.save()
    .then(() => res.json(newCard))
    .catch((err:string) => res.status(400).json('Error ' + err))
})

router.route('/:id').get((req,res) => {
  CardModel.findById(req.params.id)
    .then((card:any) => res.json(card))
    .catch((err:string) => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req,res) => {
  CardModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Card deleted.'))
    .catch((err:string) => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req,res) => {
  CardModel.findById(req.params.id)
    .then((card:any) => {
      card.title = req.body.title || card.title
      card.status = req.body.status || card.status
      card.owner = req.body.owner || card.owner
      card.creator = req.body.creator || card.creator
      card.date = Date.parse(req.body.date) || card.date
      card.save()
        .then(() => res.json('Card updated!'))
        .catch((err:string) => res.status(400).json('Error: ' + err))
    })
    .catch((err:string) => res.status(400).json('Error: ' + err))
})

module.exports = router
