import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

export const UserItem = (props) => {

    const navigate = useNavigate();
    const { currentUser, activeUsers } = useSelector(state => state.user);
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(checkUserActive())
    }, [activeUsers])
    
    const checkUserActive = () => {
            
        if (activeUsers.includes(props.user.email)) return true
        return false
    }    

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
                if (res.status == 401) {
                    navigate("/signin")
                }                
                console.log("Failed to create conversation")
            }
        } catch (e) {   
            console.log(e);
            console.log("Failed to create conversation")
        }
    }

    return (
        <div onClick={handleClick} className="relative rounded-lg h-15 bg-indigo-200 p-4 flex items-center  justify-center uppercase">
            {props.user.name}
            {isActive && (<span className="bg-green-500 w-2 h-2 absolute top-2 right-2 rounded-full ring-2 ring-white"/>)}
        </div>
    )
}
