import { current } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const ConversationListItem = (props) => {

    const [userNameArr, setUserNameArr] = useState([])
    const { currentUser, activeUsers } = useSelector(state => state.user)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(checkUserActive());
    }, [activeUsers]) 

    const checkUserActive = () => {
        for (let user of props.conversation.users) {
            if (user.email !== currentUser.email && activeUsers.includes(user.email)) return true
        }
        return false;
    }

    useEffect(() => {
        let arr = props.conversation.users.map(user => {
            if (currentUser._id !== user._id) return user.name
            return null
        })

        arr = arr.filter(name => name !== null);

        setUserNameArr(arr);

    }, [])

    return (
        <div className="relative p-3 rounded-3xl uppercase overflow-hidden">
            {userNameArr.length > 0 ? userNameArr.join(" + ") : ""}
            {isActive && (<span className="absolute block rounded-full h-2 w-2 bg-green-500 ring-2 ring-white top-1 right-2 md:h-3 md:w-3"/>)}

        </div>
    )
}
