import statusService, { CardStatus, CardStatusValue } from '../services/statusService'
import { Card, ICardDispatcher } from '../reducers/useCards'
import { User } from '../reducers/useUsers'

import { gql } from '@apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'


type ServerCard = {
  id: string
  title: string
  status: CardStatusValue
  owner: string | null
  creator: string
  date: Date
}

export interface ICardService {
  addCard(status:CardStatus):Promise<any>
  getCards():void
  updateStatus(id:string, status:CardStatus):Promise<void>
  updateOwner(id:string, owner:User):Promise<void>
  updateTitle(id:string, oldtitle:string, newtitle:string):Promise<void>
  deleteCard(id:string):Promise<void>
}

type TitleTimeout = {
  id: string
  oldTitle: string
  timeout: any
}

export class CardService implements ICardService {

  private static instance:ICardService

  private dispatcher:any
  private titleTimeouts:TitleTimeout[]
  private apolloClient:ApolloClient<NormalizedCacheObject>

  private constructor (dispatcher:any, apolloClient:ApolloClient<NormalizedCacheObject>) {
    this.dispatcher = dispatcher
    this.apolloClient = apolloClient
    this.titleTimeouts = []
  }

  public static getInstance(dispatcher?: ICardDispatcher, apolloClient?: ApolloClient<NormalizedCacheObject>): ICardService {
    if (!CardService.instance && apolloClient) {
        CardService.instance = new CardService(dispatcher, apolloClient)
    }

    return CardService.instance;
  }

  // converts the Card from the Server model to the client model
  private convertServerCard = (card:ServerCard):Card => {
    return {
      id: card.id,
      title: card.title,
      status: statusService.getInstance().getStatusByValue(card.status),
      owner: card.owner,
      creator: card.creator,
      date: card.date
    }
  }

  // gets All Cards from Server
  public getCards = ():Promise<any> =>
    this.apolloClient.query({
        query: gql`{
            cards {
              title
              id
              status
              owner
              creator
              date
            }
          }`,
      })
      .then(res =>
        this.dispatcher.addCards((res.data.cards as ServerCard[])
        .map(card => this.convertServerCard(card))))
      .catch(error => console.log(error))

  // Adds a new Cards
  public addCard = (status:CardStatus):Promise<void> => {
    return this.apolloClient.mutate({
        variables: {status: status.value},
        mutation: gql`
          mutation AddCard($status: String) {
            addCard(status: $status) {
              title
              id
              status
              owner
              creator
              date
            }
          }`,
      })
      .then(res => {
        return this.dispatcher.addCard(this.convertServerCard(res.data.addCard))
      })
      .catch(error => console.log("Error: " + error))
    }

  private update = (id:string, param:any):Promise<void> => {
    return this.apolloClient.mutate({
      variables: {id, card: param},
      mutation: gql`
        mutation UpdateCard($id: ID, $card:CardInput) {
          updateCard(id: $id, card:$card) {
            title
            id
            status
            owner
            creator
            date
          }
        }`,
    })
    .then(res => {
      // return this.dispatcher.addCard(this.convertServerCard(res.data.updateCard))
    })
    .catch(error => console.log("Error: " + error))
  }


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
    this.apolloClient.mutate({
      variables: {id},
      mutation: gql`
        mutation DeleteCard($id: ID) {
          deleteCard(id: $id)
        }`,
    })
    .then(() => this.dispatcher.deleteCard(id))
    .catch(error => console.log(error))

}
