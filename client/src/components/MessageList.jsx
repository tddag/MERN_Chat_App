import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MessageInput } from './MessageInput';
import { MessageItem } from './MessageItem';
import { pusherClient } from '../libs/pusher';

export const MessageList = (props) => {

    const { currentUser } = useSelector(state => state.user);
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        getMessageList();
        if (props.conversationId) {
            pusherClient.subscribe(props.conversationId)
            pusherClient.bind('messages:new', messageHandler)
    
            return () => {
                pusherClient.unsubscribe(props.conversationId);
                pusherClient.unbind('messages:new', messageHandler)
            }     
        }
    }, [props.conversationId])

    const messageHandler = (newMessage) => {
        for (let m of messageList) {
            if (m._id == newMessage._id) return;
        }
        setMessageList(ml => [...ml, newMessage])
       
    }

    const getMessageList = async () => {
        console.log("TD-getMEssageList")

        if (props.conversationId) {
            try {
                let url = `${import.meta.env.VITE_SERVER_URL}/api/conversation/${props.conversationId}`;
                let res = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${currentUser.token}`
                    }
                })

                if (res.ok) {
                    res = await res.json();
                    setMessageList(res.messages);
                } else {
                    setMessageList([])
                }
                
            } catch (e) {
                console.log(e)
            }
        } else {
            setMessageList([]);
        }

    }

    return (
        <div className="relative bg-green-300 w-4/6 h-5/6 " >
            <div className="flex flex-col p-2 md:p-4 overflow-auto h-3/4 md:mr-20 gap-3">
                {messageList.length > 0 ? messageList.map((message,index) => (
                        <MessageItem message={message} key={index}/>
                    )) : (
                        <div>
                            Please select or start a conversation
                        </div>
                    )
                }                               
                
            </div>
           

            <MessageInput conversationId={props.conversationId}/>

        </div>    
    )
}
