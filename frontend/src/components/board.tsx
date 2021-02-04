import React, { FC} from 'react';
import './scss/board.scss';

import StatusService, { CardStatus } from '../services/statusService'
import { InitBoard } from '../hooks/initBoard'

import Header from './header'
import Column from './column'

let Board: FC = () => {

  const loadStatus = InitBoard();

  let Columns = StatusService.getInstance().statusTypes.map(((status:CardStatus) =>
    <Column
      key={status.label}
      status={status}
    ></Column>
  ))

  return (
    <div className="board">
      <Header/>
      <main className="boardmain">
        {
          loadStatus.loading ?
          "Loading" :
          Columns
        }
      </main>
    </div>
  );
}

export default Board;
