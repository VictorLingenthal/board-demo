import React, { FC } from 'react'
import './column.scss'

import Card from './card'

let Column: FC<{
  status:CardStatus,
  users:Object[]
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
        {props.cardService.cards.filter(
          card => card.status.value === props.status.value).map((
            cardModel =>
              <Card
                key={cardModel.id}
                model={cardModel}
                cardService={props.cardService}
                users={props.users}
              ></Card>
        ))}
      </main>
    </div>
  )
}

export default Column
