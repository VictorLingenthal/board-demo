import React, { FC, useEffect } from 'react';
import './board.scss';

import useCards from '../reducers/useCards'
import useUsers from '../reducers/useUsers'

import CardService from '../services/cardService'
import UserService from '../services/userService'

import Header from './header'
import Column from './column'

var cardService:CardService
var userService:UserService

let Board: FC = () => {

  const [cards, cardDispatcher]:[cards:Card[], dispatcher:ICardDispatcher] = (useCards as any)()
  const [users, userDispatcher]:[User[], IUserDispatcher] = (useUsers as any)()

  useEffect(() => {
    cardService = new CardService(cardDispatcher)
    userService = new UserService(userDispatcher)
    cardService.getCards()
    userService.getUsers()
  },[])

  let Columns = cardService ? cardService.statusService.statusTypes.map((status =>
    <Column
      key={status.label}
      status={status}
      users={users}
      cards={cards}
      cardService={cardService}
    ></Column>
  )) : 'Loading'

  return (
    <div className="board">
      {userService &&
        <Header
          users={users}
          userService={userService}
      />}
      <main className="boardmain">
        {Columns}
      </main>
    </div>
  );
}

export default Board;
