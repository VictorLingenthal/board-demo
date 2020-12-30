import React, { FC, useState } from 'react'

import './scss/card.scss'

import Select from 'react-select'
import TextareaAutosize from 'react-textarea-autosize'
import statusService from '../services/statusService'
import { ICardService } from '../services/cardService'
import { Card } from '../reducers/useCards'
import capitalize from "../utils/utils"

let CardComp: FC<{
  model:Card
  cardService:ICardService
  users:Object[]
}> = (props) => {

  let [editTitle, setEditTitle] = useState<boolean>(false)
  let [deletePending, setDeletePending] = useState<boolean>(false)
  let _toggleTitle = () => setEditTitle(!editTitle)

  let cardService = props.cardService
  let _onChangeStatus = (selectedDropdown:any) =>
    cardService.updateStatus(props.model.id, selectedDropdown)
  let _onChangeOwner = (selectedDropdown:any) =>
    cardService.updateOwner(props.model.id, selectedDropdown)
  let _onChangeInput = (e:React.ChangeEvent<HTMLTextAreaElement>) =>
    cardService.updateTitle(props.model.id, props.model.title, e.currentTarget.value)
  let _onDeleteButton = () => {
    setDeletePending(true)
    cardService.deleteCard(props.model.id)
      .catch(error => console.log(error))
      .finally(() => setDeletePending(false))
  }

  return (
    <div className={`card ${deletePending ? "deletePending" : ""}`}>

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
          options={statusService.getInstance().statusTypes}
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


export default CardComp
