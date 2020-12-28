import React, { FC } from 'react'
import './column.scss'

import CardComp from './card'
import { CardStatus } from '../services/statusService'
import { Card } from '../reducers/useCards'
import { User } from '../reducers/useUsers'
import { ICardService } from '../services/cardServiceGraphQL'

let Column: FC<{
  status:CardStatus
  users:User[]
  cards:Card[]
  cardService:ICardService
}> = (props) => {

  let _onClick = () =>
    props.cardService.addCard(props.status)

  return (
    <div className="column">
      <header className="columnHeader">
        {props.status.label}
        <button onClick={_onClick}>+</button>
      </header>
      <main className="columnMain">
        {props.cards.filter(
          card => card.status.value === props.status.value).map((
            cardModel =>
              <CardComp
                key={cardModel.id}
                model={cardModel}
                cardService={props.cardService}
                users={props.users}
              ></CardComp>
        ))}
      </main>
    </div>
  )
}

export default Column
