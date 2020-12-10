import axios from 'axios'
import useCards from '../reducers/useCards'
import statusService from '../services/statusService'

export default class CardService implements ICardService {

  public cards
  public dispatcher
  public statusService

  constructor () {
    const [cards, dispatcher] = (useCards as any)()
    this.cards = cards
    this.dispatcher = dispatcher
    this.statusService = new statusService()
  }

  // converts the Card from the Server model to the client model
  private convertServerCard = (card:ServerCard):Card => ({
      id: card._id,
      title: card.title,
      status: this.statusService.getStatusByValue(card.status),
      owner: card.owner,
      creator: card.creator,
      date: card.date
    })

  // gets All Cards from Server
  public getCards = ():void => {
    let cards:ServerCard[] = []
    axios.get('http://localhost:5000/cards')
      .then(res => {
        cards = res.data
        this.dispatcher.addCards(cards.map(card => this.convertServerCard(card))
      )})
      .catch(error => console.log(error))
  }

  // Adds a new Cards
  public addCard = (status:CardStatus) =>
    axios.post('http://localhost:5000/cards/add', {status: status.value})
      .then(res => this.dispatcher.addCard(this.convertServerCard(res.data)))
      .catch(function (error) {
        console.log(error);
      })

  private update = (id:string, param:any) =>
    axios.post('http://localhost:5000/cards/update/'+id, param)
        .then(res => {
            console.log(res)
        }).catch(function (error) {
          console.log(error)
        })

  public updateStatus = (id: string, selectedDropdown:any) => {
    this.dispatcher.setStatus(id, selectedDropdown)
    this.update(id, {status: selectedDropdown.value})
  }

  public updateOwner = (id: string, selectedDropdown:any) => {
    var newOwner = selectedDropdown ? selectedDropdown.value : null
    this.dispatcher.setOwner(id, newOwner)
    this.update(id, {owner: newOwner})
  }

  public updateTitle = (id: string, e:React.ChangeEvent<HTMLTextAreaElement>) => {
    this.dispatcher.setTitle(id, e.currentTarget.value)
    this.update(id, {title: e.currentTarget.value})
  }

  public deleteCard = (id:string) => {
    this.dispatcher.deleteCard(id)
    axios.delete('http://localhost:5000/cards/'+id)
        .then(res => {
            console.log(res)
        }).catch(function (error) {
          console.log(error)
        })
  }

}
