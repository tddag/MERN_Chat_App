import React, { useEffect, useState } from 'react'
import { ConversationListItem } from './ConversationListItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const ConversationList = (props) => {

    const { currentUser } = useSelector(state => state.user)
    const [conversationList, setConversationList] = useState([])

    useEffect(() => {
        getUserConversations();
    }, [])

    const getUserConversations = async () => {

        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser._id}/conversations`

            let res = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`
                }
            })

            if (res.ok) {
                res = await res.json();
                setConversationList(res.conversations);
            } else {
                console.log("Failed to get conversation list")
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="bg-purple-300 w-3/12 md:w-2/6 h-screen pb-20 flex flex-col p-2 md:p-4 gap-4 overflow-auto">
            { conversationList.length == 0 ? (
                    <div>
                        No conversation.
                    </div>
                ): 
                conversationList.map((conversation, index) => (
                    <Link to={`/conversations/${conversation._id}`} key={index} className={(props.conversationId && props.conversationId == conversation._id) ? "bg-yellow-400" : "bg-yellow-200"}>
                        <ConversationListItem  conversation={conversation}/>
                    </Link>
                    
                ))                      
            }
        </div>        
    )
}
