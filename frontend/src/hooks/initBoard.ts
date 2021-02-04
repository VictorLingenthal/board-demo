
import { useEffect, useState } from 'react'

import { apolloClient } from '../services/apolloClient'

import useCards, { Card, ICardDispatcher } from '../reducers/useCards'
import useUsers, { User, IUserDispatcher } from '../reducers/useUsers'

import { CardService } from '../services/cardService'
import { UserService } from '../services/userService'

export const InitBoard = () => {

  const [cards, { addCards }]:[Card[], ICardDispatcher] = (useCards as any)()
  const [users, { addUsers }]:[User[], IUserDispatcher] = (useUsers as any)()

  const [status, setStatus] = useState({loading: true })

  useEffect(() => {
    let cardService = CardService.getInstance(apolloClient)
    cardService.getCards(addCards)
      .then(() => setStatus({ ...status, loading: false }))
    let userService = UserService.getInstance(apolloClient)
    userService.getUsers(addUsers)
  },[])

  return status
}
