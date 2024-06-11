import React from 'react'
import { ConversationList } from '../components/ConversationList'
import { MessageList } from '../components/MessageList'

export const Conversations = () => {
  return (
    <div className="flex gap-2 md:gap-4 mb-10 h-screen">

        <ConversationList/>
        
        <MessageList/>

    </div>
  )
}
