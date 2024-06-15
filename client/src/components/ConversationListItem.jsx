import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const ConversationListItem = (props) => {

    const [userNameArr, setUserNameArr] = useState([])
    const { currentUser } = useSelector(state => state.user)


    useEffect(() => {
        let arr = props.conversation.users.map(user => {
            if (currentUser._id !== user._id) return user.name
            return null
        })

        arr = arr.filter(name => name !== null);

        setUserNameArr(arr);

    }, [])

    return (
        <div className="p-3 rounded-3xl uppercase overflow-hidden">
            {userNameArr.length > 0 ? userNameArr.join(" + ") : ""}
        </div>
    )
}
