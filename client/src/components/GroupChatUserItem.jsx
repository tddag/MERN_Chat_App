import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const GroupChatUserItem = (props) => {

    const { activeUsers } = useSelector(state => state.user);
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(checkActiveUser())
    }, [activeUsers])

    const checkActiveUser = () => {
        if (activeUsers.includes(props.user.email)) return true
        return false
    }

    return (
        <div className="relative block pr-6">
            {props.user.name}
            {isActive && (<span className="bg-green-500 w-2 h-2 absolute top-1 right-2 rounded-full ring-2 ring-white"/>)}
        </div>
    )
}
