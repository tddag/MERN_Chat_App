import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const MessageHeader = (props) => {

    const [userNameList, setUserNameList] = useState([])
    const { currentUser, activeUsers } = useSelector(state => state.user)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        generateUserNameList()
    }, [props.userList])

    useEffect(() => {
        setIsActive(checkActiveUsers())
    })

    const checkActiveUsers = () => {
        for (let user of props.userList) {
            if (user.email !== currentUser.email && activeUsers.includes(user.email)) return true
        }
        return false;
    }

    const generateUserNameList = () => {
        let list = props.userList.filter(user => user.email !== currentUser.email).map(user => user.name)
        setUserNameList(list);
    }

    return (
        <div className=" p-3 bg-slate-50">
            <div className="relative inline-block pr-6 uppercase font-bold">
                {userNameList.join(" + ")}
                {isActive && (<span className="bg-green-500 w-2 h-2 absolute top-1 right-2 rounded-full ring-2 ring-white"/>)}
            </div>
            
        </div>
    )
}
