
import { useEffect, useState } from 'react'

import { apolloClient } from '../services/apolloClient'

import { CardService, ICardService } from '../services/cardService'
import { UserService, IUserService } from '../services/userService'

var cardService:ICardService
var userService:IUserService

export const initState = ( addUsers:Function, addCards:Function ) => {
  const [status, setStatus] = useState({loading: true })

  useEffect(() => {
    cardService = CardService.getInstance(apolloClient)
    cardService.getCards(addCards)
    userService = UserService.getInstance(apolloClient)
    userService.getUsers(addUsers)
  },[])

  return status
}
