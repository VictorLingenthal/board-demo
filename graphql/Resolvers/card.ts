import Card, { ICard } from '../../models/card.model'

export const cardResolvers = {
  Query: {
    cards: async () => await Card.find()
      .then((cards:ICard[]) => cards)
      .catch((err) => console.log('Error: ' + err)),
    card: async (id:string) => await Card.findById(id)
      .then((card:ICard|null) => card)
      .catch((err) => console.log('Error: ' + err))
  },
  Mutation : {
    addCard: async (__:any, args:any) => {

        const title = args.title || ''
        const status = args.status || 'todo'
        const owner = args.owner || null
        const creator = args.creator || 'victor'
        const date = Date.parse(args.date) || Date.now()

        const newCard:ICard = new Card({ title, status, owner, creator, date })

        return await newCard.save()
          .then(() => {
            console.log('newCard')
            console.log(newCard)
            return newCard
          })
          .catch((err:string) => 'Error ' + err)
    },
    deleteCard: async (__:any, args:any) => {
      return Card.findByIdAndDelete(args.id)
        .then(() => 'Card deleted.')
        .catch((err:string) => `Error: ${err}`)
    },
    updateCard: async (__:any, args:any) => {
      return Card.findById(args.id)
        .then((card:ICard|null) => {
          if (card) {
          card.title = args.card.title || card.title
          card.status = args.card.status || card.status
          card.owner = args.card.owner || card.owner
          card.creator = args.card.creator || card.creator
          card.date = args.card.date || card.date
          // card.date = Date.parse(args.card.date) || card.date
          return card.save()
            .then(() => {
              return card
            })
            .catch((err:string) => `Error: ${err}`)
          } else return 'There was no card with this id'
        })
        .catch((err:string) => `Error: ${err}`)
    }
  }
}
