import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

export const UserItem = (props) => {

    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);


    const handleClick = async () => {
         

        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/conversation`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users: [
                        currentUser._id,
                        props.user._id
                    ]
                })
            })

            if (res.ok) {
                res = await res.json();
                console.log("Successfully create conversation")
                console.log(res)
                navigate(`/conversations/${res._id}`)
            } else {
                console.log("Failed to create conversation")
            }
        } catch (e) {   
            console.log(e);
            console.log("Failed to create conversation")
        }
    }

    return (
        <div onClick={handleClick} className="rounded-lg h-15 bg-indigo-200 p-4 flex items-center  justify-center uppercase">{props.user.name}</div>
    )
}
