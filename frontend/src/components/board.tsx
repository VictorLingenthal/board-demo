import React, { FC, useEffect } from 'react';
import './scss/board.scss';

import useCards, { Card, ICardDispatcher } from '../reducers/useCards'
import useUsers, { User, IUserDispatcher } from '../reducers/useUsers'

import CardService, { ICardService } from '../services/cardService'
import { userService } from '../services/userService'
import StatusService, { CardStatus } from '../services/statusService'

import Header from './header'
import Column from './column'

var cardService:ICardService

let Board: FC = () => {

  const [cards, cardDispatcher]:[cards:Card[], dispatcher:ICardDispatcher] = (useCards as any)()
  const [users, { addUsers }]:[User[], IUserDispatcher] = (useUsers as any)()

  useEffect(() => {
    cardService = new CardService(cardDispatcher)
    cardService.getCards()
    userService.getUsers(addUsers)
  },[])

  let Columns = StatusService.getInstance().statusTypes.map(((status:CardStatus) =>
    <Column
      key={status.label}
      status={status}
      users={users}
      cards={cards}
      cardService={cardService}
    ></Column>
  ))

  return (
    <div className="board">
      <Header/>
      <main className="boardmain">
        {Columns}
      </main>
    </div>
  );
}

export default Board;
