import axios from 'axios'
import statusService from '../services/statusService'

export default class CardService implements ICardService {

  public statusService:IStatusService

  private dispatcher:any
  private titleTimeouts:TitleTimeout[]

  constructor (dispatcher:any) {
    this.statusService = new statusService()
    this.dispatcher = dispatcher
    this.titleTimeouts = []
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
    axios.get('/cards')
      .then(res =>
        this.dispatcher.addCards((res.data as ServerCard[])
        .map(card => this.convertServerCard(card))))
      .catch(error => console.log(error))}

  // Adds a new Cards
  public addCard = (status:CardStatus):Promise<void> =>
    axios.post('/cards/add', {status: status.value})
      .then(res => this.dispatcher.addCard(this.convertServerCard(res.data)))
      .catch(error => console.log(error))

  private update = (id:string, param:any):Promise<void> =>
    axios.post('/cards/update/'+id, param)
      .then(res => console.log(res))
      .catch(error => console.log(error))

  public updateStatus = (id: string, selectedDropdown:CardStatus):Promise<void> => {
    this.dispatcher.setStatus(id, selectedDropdown)
    return this.update(id, {status: selectedDropdown.value})
  }

  public updateOwner = (id: string, selectedDropdown:any):Promise<void> => {
    var owner = selectedDropdown ? selectedDropdown.value : null
    this.dispatcher.setOwner(id, owner)
    return this.update(id, {owner})
  }

  public updateTitle = (id: string, oldTitle:string, title:string):any => {

    let timeout = this.titleTimeouts.filter(timeouts => timeouts.id === id)[0]
    let newTimeout = () => setTimeout(() => {
      this.titleTimeouts = this.titleTimeouts.filter(timeouts => !(timeouts.id === id))
      return this.update(id, {title})
    }, 2000)

    if (timeout) {
      clearTimeout(timeout.timeout)
      timeout.timeout = newTimeout()
    } else {
      let newTitleTimeout = {
        id, oldTitle,
        timeout: newTimeout()
      }
      this.titleTimeouts = [newTitleTimeout, ...this.titleTimeouts]
    }

    this.dispatcher.setTitle(id, title)
  }

  public deleteCard = (id:string):Promise<void> =>
    axios.delete('/cards/'+id)
      .then(() => this.dispatcher.deleteCard(id))
      .catch(error => console.log(error))

}
