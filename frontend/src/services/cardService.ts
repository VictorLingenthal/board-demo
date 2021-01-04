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
  addCard(addCard:Function, status:CardStatus):Promise<any>
  getCards(addCard:Function):void
  updateStatus(setTatus:Function, id:string, status:CardStatus):Promise<void>
  updateOwner(setOwner:Function, id:string, owner:User):Promise<void>
  updateTitle(setTitle:Function, id:string, oldtitle:string, newtitle:string):Promise<void>
  deleteCard(deleteCard:Function, id:string):Promise<void>
}

type TitleTimeout = {
  id: string
  oldTitle: string
  timeout: any
}

export class CardService implements ICardService {

  private static instance:ICardService

  private titleTimeouts:TitleTimeout[]
  private apolloClient:ApolloClient<NormalizedCacheObject>

  private constructor (apolloClient:ApolloClient<NormalizedCacheObject>) {
    this.apolloClient = apolloClient
    this.titleTimeouts = []
  }

  public static getInstance = (apolloClient?: ApolloClient<NormalizedCacheObject>): ICardService => {
    if (!CardService.instance && apolloClient) {
        CardService.instance = new CardService(apolloClient)
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
  public getCards = (addCards:Function):Promise<any> =>
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
      .then(res => addCards((res.data.cards as ServerCard[])
        .map(card => this.convertServerCard(card))))
      .catch(error => console.log(error))

  // Adds a new Cards
  public addCard = (addCard:Function, status:CardStatus):Promise<void> => {
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
      .then(res => addCard(this.convertServerCard(res.data.addCard)))
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


  public updateStatus = (setStatus:Function, id: string, selectedDropdown:CardStatus):Promise<void> => {
    setStatus(id, selectedDropdown)
    return this.update(id, {status: selectedDropdown.value})
  }

  public updateOwner = (setOwner:Function, id: string, selectedDropdown:any):Promise<void> => {
    var owner = selectedDropdown ? selectedDropdown.value : null
    setOwner(id, owner)
    return this.update(id, {owner})
  }

  public updateTitle = (setTitle:Function, id:string, oldTitle:string, title:string):any => {

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

    setTitle(id, title)
  }

  public deleteCard = (deleteCard:Function ,id:string):Promise<void> =>
    this.apolloClient.mutate({
      variables: {id},
      mutation: gql`
        mutation DeleteCard($id: ID) {
          deleteCard(id: $id)
        }`,
    })
    .then(() => deleteCard(id))
    .catch(error => console.log(error))

}
