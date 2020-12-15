import React, { FC, useState } from 'react';

import { userService } from '../services/userServiceConst'
import useUsers, { User, IUserDispatcher } from '../reducers/useUsers'

import './header.scss'

import Select from 'react-select'

let Header: FC = () => {

  const [users, { addUser, deleteUser }]:[User[], IUserDispatcher] = (useUsers as any)()

  const [userInput, setUserInput] = useState<string>()
  const [userDropdown, setUserDropdown] = useState<User>()

  let _onClickAddUser = () => {
    if (userInput)
      userService.addUser(addUser, userInput)
    setUserInput('')
  }

  let _onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => setUserInput(e.currentTarget.value)
  let _onChangeUser = (selectedDropdown:any) => setUserDropdown(selectedDropdown)
  let _onClickDeleteUser = () => userService.deleteUser(deleteUser,userDropdown ? userDropdown.id : '')

  return (
    <header className="boardHeader">
      <input
        placeholder="New Username"
        value={userInput}
        onChange={_onChangeInput}/>
      <button onClick={_onClickAddUser}>Add User</button>
      <Select
        className="deleteUser"
        options={users}
        value={userDropdown}
        placeholder="Pick User"
        isClearable={true}
        onChange={_onChangeUser}
      />
      <button onClick={_onClickDeleteUser}>Delete User</button>
    </header>
  )
}

export default Header;
