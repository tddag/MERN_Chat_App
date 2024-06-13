import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const MessageInput = (props) => {

    const [message, setMessage] = useState("")
    const { currentUser } = useSelector(state => state.user);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/messages`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    senderId: currentUser._id,
                    conversationId: props.conversationId
                })
            })

            if (res.ok) {
                res = await res.json();
                console.log("Successfully create message")
                setMessage("");
            } else {
                console.log("Failed to create a message")
            }
        } catch(e) {
            console.log(e)
            console.log("Failed to create a message")
        }
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div >
            <form onSubmit={onSubmit} className="absolute bottom-5 w-full m-auto flex justify-center p-0 gap-4" >
                <input disabled={!props.conversationId} onChange={handleInputChange} value={message} className="rounded-lg w-7/12 md:w-9/12 p-3" placeholder='New Message'/>
                <button disabled={!props.conversationId} className="bg-blue-500 p-4 rounded-lg">Send</button>
            </form>
            
        </div>   
    )
}
