import Card, { ICard } from '../../models/card.model'

export const cardResolvers = {
  Query: {
    cards: async () => await Card.find(),
    card: async (id:string) => await Card.findById(id)
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
    },
    deleteCard: async (__:any, args:any) => await Card.findByIdAndDelete(args.id),
    updateCard: async (__:any, args:any) => {
      const card = await Card.findById(args.id)
      if (card) {
        card.title = args.card.title || card.title
        card.status = args.card.status || card.status
        card.owner = args.card.owner || card.owner
        card.creator = args.card.creator || card.creator
        card.date = args.card.date || card.date
        // card.date = Date.parse(args.card.date) || card.date
        return await card.save()
      } else return 'There was no card with this id'
    }
  }
}
