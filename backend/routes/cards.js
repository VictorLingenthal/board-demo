const router = require('express').Router()
let Card = require('../models/card.model')

router.route('/').get((req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  console.log(req.body)

  const title = req.body.title || ''
  const status = req.body.status || 'todo'
  const owner = req.body.owner || null
  const creator = req.body.creator || 'oliver'
  const date = Date.parse(req.body.date) || Date.now()

  const newCard = new Card({ title, status, owner, creator, date })

  newCard.save()
    .then(() => res.json(newCard))
    .catch(err => res.status(400).json('Error ' + err))
})

router.route('/:id').get((req,res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req,res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.json('Card deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req,res) => {
  Card.findById(req.params.id)
    .then(card => {
      card.title = req.body.title || card.title
      card.status = req.body.status || card.status
      card.owner = req.body.owner || card.owner
      card.creator = req.body.creator || card.creator
      card.date = Date.parse(req.body.date) || card.date
      card.save()
        .then(() => res.json('Card updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
