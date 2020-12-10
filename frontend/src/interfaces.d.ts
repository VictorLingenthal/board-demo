
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

interface ICardService {
  cards: Card[]
  dispatcher: Object
  statusService: Class
  addCard: Function
  updateStatus: Function
  updateOwner: Function
  updateTitle: Function
  deleteCard: Function
}

interface IUserService {
  users: User[]
  getUsers: Function
  addUser: Function
  deleteUser: Function
}

interface IStatusService {
  statusTypes: CardStatus[]
  getStatusByValue: Function
}

interface IUserReducer {
  () : [User[],any]
}
