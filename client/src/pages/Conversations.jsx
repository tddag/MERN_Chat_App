import React, { useEffect } from 'react'
import { ConversationList } from '../components/ConversationList'
import { MessageList } from '../components/MessageList'
import { useParams } from 'react-router-dom';

export const Conversations = () => {
    let { id } = useParams();
    
    useEffect(() => {

    }, [id])

  return (
    <div className="flex gap-2 md:gap-4 mb-10 h-screen-minus-header-extra md:h-screen-minus-header bg-green-200">

        <ConversationList conversationId={id}/>
        
        <MessageList conversationId={id}/>

    </div>
  )
}
