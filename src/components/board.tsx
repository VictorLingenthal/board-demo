import React, { FC, useEffect } from 'react';
import './board.scss';

import CardService from '../services/cardService'
import UserService from '../services/userService'

import Header from './header'
import Column from './column'

let Board: FC = () => {

  let cardService = new CardService()
  let userService = new UserService()

  useEffect(() => cardService.getCards(), [])
  useEffect(() => userService.getUsers(), [])

  let Columns = cardService.statusService.statusTypes.map((status =>
    <Column
      key={status.label}
      status={status}
      users={userService.users}
      cardService={cardService}
    ></Column>
  ))

  return (
    <div className="board">
      <Header userService={userService}/>
      <main className="boardmain">
        {Columns}
      </main>
    </div>
  );
}

export default Board;
