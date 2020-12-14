
declare type CardStatusValue = 'backlog' | 'todo' | 'inprogress' | 'resolved' | 'won\'t fix'
declare type CardStatusLabel = 'Backlog' | 'To Do' | 'In Progress' | 'Resolved' | 'Won\'t Fix'

type CardStatus = {
  value: CardStatusValue
  label: CardStatusLabel
}

type Card = {
  id: string
  title: string
  status: CardStatus
  owner: string | null
  creator: string
  date: Date
}

type ServerCard = {
  _id: string
  title: string
  status: CardStatusValue
  owner: string | null
  creator: string
  date: Date
}

type User = {
  value: string
  label: string
  id: string
}

type ServerUser = {
  _id: string
  name: string
}

type TitleTimeout = {
  id: string
  oldTitle: string
  timeout: any
}

interface ICardService {
  // dispatcher: ICardDispatcher
  statusService: IStatusService
  addCard(CardStatus):Promise<any>
  getCards():void
  updateStatus(id:string, status:CardStatus):Promise<void>
  updateOwner(id:string, owner:User):Promise<void>
  updateTitle(id:string, oldtitle:string, newtitle:string):Promise<void>
  deleteCard(id:string):Promise<void>
}

interface IUserService {
  dispatcher: IUserDispatcher
  getUsers():Promise<any>
  addUser(name:string):Promise<string>
  deleteUser(id:string):Promise<void>|null
}

interface IStatusService {
  statusTypes: CardStatus[]
  getStatusByValue(value:CardStatusValue):CardStatus
}

interface IUserReducer {
  addUser(state:User[],user:User):User[]
  addUsers(state:User[], users:User[]):User[]
  deleteUser(state:User[], id:string):User[]
}

interface IUserDispatcher {
  addUser(user:User[]):void
  addUsers(users:User[]):void
  deleteUser(id:string):void
}

interface ICardReducer {
  deleteCard(state:Card[], id:string)
  addCard(state:Card[], card:Card):Card[]
  addCards(state:Card[], cards:Card[]):Card[]
  setStatus(state:Card[], id:string, status:CardStatus):Card[]
  setTitle(state:Card[], id:string, title:string):Card[]
  setOwner(state:Card[], id:string, owner:string):Card[]
}

interface ICardDispatcher {
  deleteCard(id:string):void
  addCard(card:Card):void
  addCards(cards:Card[]):void
  setStatus(id:string, status:CardStatus):void
  setTitle(id:string, title:string):void
  setOwner(id:string, owner:string):void
}
