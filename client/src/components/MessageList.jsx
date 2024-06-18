import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { MessageInput } from './MessageInput';
import { MessageItem } from './MessageItem';
import { pusherClient } from '../libs/pusher';
import { useNavigate } from 'react-router-dom';
import { MessageHeader } from './MessageHeader';

export const MessageList = (props) => {

    const { currentUser } = useSelector(state => state.user);
    const [messageList, setMessageList] = useState([])
    const [userList, setUserList] = useState([])
    let bottomListRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        getMessageList();

        if (props.conversationId) {
            pusherClient.subscribe(props.conversationId)
            pusherClient.bind('messages:new', newMessageHandler)
            pusherClient.bind('messages:seen', seenMessageHandler)

    
            return () => {
                pusherClient.unsubscribe(props.conversationId);
                pusherClient.unbind('messages:new', newMessageHandler)
                pusherClient.unbind('messages:seen', seenMessageHandler)
            }     
        }

    }, [props.conversationId])

    useEffect(() => {
        bottomListRef.current?.scrollIntoView();

    })

    const callSeenMessageApi = async (messageId) => {
        let url = `${import.meta.env.VITE_SERVER_URL}/api/messages/${messageId}/seen/${currentUser._id}`
        let res = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${currentUser.token}`
          } 
        })

        if (!res.ok) {
            if (res.status == 401) {
                navigate("/signin")
            }
        }
    }

    const newMessageHandler = async (newMessage) => {
        if (!newMessage.seenUsers.map(user => user._id).includes(currentUser._id)) {
            await callSeenMessageApi(newMessage._id)
        }      
        for (let m of messageList) {
            if (m._id == newMessage._id) return;
        }
        setMessageList(ml => {
            console.log("TD Current List 1: ")
            console.log(ml)
            return [...ml, newMessage]})
      
       
    }

    const seenMessageHandler = (updatedMessage) => {
        setMessageList(ml => {
            return ml.map(message => {
                if (message._id == updatedMessage._id) {
                    return updatedMessage
                }
                return message
            })})

    }

    const getMessageList = async () => {
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
                    setUserList(res.users)
                    if (res.messages.length > 0 && !res.messages[res.messages.length - 1].seenUsers.map(user => user._id).includes(currentUser._id)) {
                        await callSeenMessageApi(res.messages[res.messages.length - 1]._id);
                    }                    
                } else {
                    setMessageList([])
                    if (res.status == 401) {
                        navigate("/signin")
                    }                    
                }
                
            } catch (e) {
                console.log(e)
            }
        } else {
            setMessageList([]);
        }
    }

    return (
        <div className="relative  w-5/6 h-full" >
            {props.conversationId && (
                <div className="md:mr-10">
                    <MessageHeader userList={userList}/>
                </div>
            )}
            <div className="relative  flex flex-col p-2 md:p-4 overflow-auto h-85% md:mr-10 gap-3">
                {messageList.length > 0 ? messageList.map((message,index) => (
                        <MessageItem message={message} key={index} isLast={messageList.length == index + 1}/>
                    )) : (
                        <div>
                            Select an existing conversation or start a new conversation
                        </div>
                    )
                }    
                <div ref={bottomListRef}></div>
            </div>

            <MessageInput conversationId={props.conversationId}/>

        </div>    
    )
}
