import React, { FC, useEffect } from 'react';
import './board.scss';

import useCards from '../reducers/useCards'
import useUsers from '../reducers/useUsers'

import CardService from '../services/cardService'
import { userService } from '../services/userServiceConst'

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
      <Header/>
      <main className="boardmain">
        {Columns}
      </main>
    </div>
  );
}

export default Board;
