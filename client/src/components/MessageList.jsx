import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const MessageList = (props) => {

    const { currentUser } = useSelector(state => state.user);
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        getMessageList();
    }, [props.conversationId])

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
            <div className="flex flex-col p-2 md:p-4 overflow-auto h-3/4 md:mr-20">
                {messageList.length > 0 ? messageList.map((message,index) => (
                        <div key={index} className="flex justify-end">
                            <div>
                                {message.message}    
                            </div>
                        </div>
                    )) : (
                        <div>
                            Please select or start a conversation
                        </div>
                    )
                }                               
                
            </div>
           

            <div className="absolute bottom-5 w-full m-auto flex justify-center p-0" >
                <input className="rounded-lg w-10/12 md:w-9/12 p-3" placeholder='New Message'/>
            </div>

        </div>    
    )
}
