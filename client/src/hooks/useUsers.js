import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useUsers = () => {
    const [userList, setUserList] = useState([])
    const { currentUser } = useSelector(state => state.user);
    useEffect(() => {
        const fetchData = async() => {
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
        fetchData();
    }, [])
    return userList
}