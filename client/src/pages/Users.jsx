import React, { useState } from 'react'
import { UserList } from '../components/UserList'
import { Modal } from 'antd';
import { CreateGroupChatModal } from '../components/CreateGroupChatModal';

export const Users = () => {

  const [isGroupChatModalOpen, setIsGroupChatModalOpen] = useState(false);

  const cancelModal = () => {
    setIsGroupChatModalOpen(false)
  }


  return (
    <div className="flex flex-col mx-auto w-full">
      <div className="bg-orange-200 flex justify-center h-20 items-center gap-4">
          <div>
            <input className="p-4 w-40 md:w-96 rounded-lg" placeholder="Search User"/>
          </div>
          <button onClick={() => setIsGroupChatModalOpen(true)} className="bg-blue-400 p-4 rounded-lg">Create Group Chat</button>
      </div>

      <UserList/>

      <CreateGroupChatModal isOpen={isGroupChatModalOpen} cancelModal={cancelModal}/>

    </div>
  )
}
