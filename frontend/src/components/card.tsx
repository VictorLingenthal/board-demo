import React, { FC, useState } from 'react'

import './card.scss'

import Select from 'react-select'
import TextareaAutosize from 'react-textarea-autosize'
import capitalize from "../utils/utils"

let Card: FC<{
  model:Card
  cardService:ICardService
  users:Object[]
}> = (props) => {

  let [editTitle, setEditTitle] = useState<boolean>(false)
  let _toggleTitle = () => setEditTitle(!editTitle)

  let cardService = props.cardService
  let _onChangeStatus = (selectedDropdown:any) =>
    cardService.updateStatus(props.model.id, selectedDropdown)
  let _onChangeOwner = (selectedDropdown:any) =>
    cardService.updateOwner(props.model.id, selectedDropdown)
  let _onChangeInput = (e:React.ChangeEvent<HTMLTextAreaElement>) =>
    cardService.updateTitle(props.model.id, e)
  let _onDeleteButton = () =>
    cardService.deleteCard(props.model.id)

  return (
    <div className="card">

      <header>
        <Select
          className="selectOwner"
          options={props.users}
          value={{
            value: props.model.owner,
            label: capitalize(props.model.owner)
          }}
          placeholder="Owner"
          isClearable={true}
          onChange={_onChangeOwner}
        />
        <Select
          className="selectStatus"
          options={cardService.statusService.statusTypes}
          value={props.model.status}
          placeholder="Status"
          onChange={_onChangeStatus}
        />
      </header>

      <main>

        { !editTitle &&
          <div onClick={_toggleTitle}
          >{props.model.title}</div>
        }

        { editTitle  &&
          <TextareaAutosize
            placeholder="Enter Title"
            autoFocus
            value={props.model.title}
            onChange={_onChangeInput}
            onBlur={_toggleTitle}
        />}

      </main>

      <button
        className="deleteButton"
        onClick={_onDeleteButton}
      >X</button>

    </div>
  )
}


export default Card
