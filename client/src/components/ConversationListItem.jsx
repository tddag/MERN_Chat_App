import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const ConversationListItem = (props) => {

    const [userNameArr, setUserNameArr] = useState([])
    const { currentUser } = useSelector(state => state.user)


    useEffect(() => {
        let arr = props.conversation.users.map(user => {
            if (currentUser.id !== user._id) return user.name
            return null
        })

        arr = arr.filter(name => name !== null);

        setUserNameArr(arr);

    }, [])

    return (
        <div className="bg-yellow-200 p-4 rounded-xl uppercase">
            {userNameArr.length > 0 ? userNameArr.join(" + ") : ""}
        </div>
    )
}
