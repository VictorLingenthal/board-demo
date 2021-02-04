import React, { FC } from 'react'
import './scss/column.scss'

import CardComp from './card'
import { CardStatus } from '../services/statusService'
import useCards, { Card, ICardDispatcher} from '../reducers/useCards'
import { CardService } from '../services/cardService'

let Column: FC<{
  status:CardStatus
}> = (props) => {
  
  const [cards, { addCard }]:[Card[], ICardDispatcher] = (useCards as any)()
  let _onClick = () => CardService.getInstance().addCard(addCard, props.status)

  return (
    <div className="column">
      <header className="columnHeader">
        {props.status.label}
        <button onClick={_onClick}>+</button>
      </header>
      <main className="columnMain">
        {cards.filter(
          card => card.status.value === props.status.value).map((
            cardModel =>
              <CardComp
                key={cardModel.id}
                model={cardModel}
              ></CardComp>
        ))}
      </main>
    </div>
  )
}

export default Column
