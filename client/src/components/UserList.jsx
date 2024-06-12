import React, { useEffect, useState } from 'react'
import { UserItem } from './UserItem'
import { useSelector } from "react-redux";

export const UserList = () => {

    const { currentUser } = useSelector(state => state.user);
    const [userList, setUserList] = useState([])

    useEffect(() => {
        getUserList()
    }, [])

    const getUserList = async () => {
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/users`
            let res = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`
                }
            })

            if (res.ok) {
                res = await res.json();
                let users = res.users.filter(u => u._id !== currentUser._id)
                setUserList(users)
            } else  {
                console.log("Failed to get user lists")
                setUserList([])
            }
        } catch (e) {
            console.log(e)
            setUserList([])
        }
    }

    return (
        <div className="bg-blue-400 min-h-screen">
            <div className="flex flex-wrap gap-6 p-6 justify-center">
                { userList.map((user, index) =>
                    <UserItem key={index} user={user}/>
                )}
            </div>
        </div>
    )
}
