import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { pusherClient } from '../libs/pusher'
import { setActiveUsers } from '../state/user/userSlice'

export const ActiveStatus = () => {

    const { currentUser, activeUsers } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const currentActiveUsers = useRef(activeUsers); // useRef will not cause value reset on rerender

    useEffect(() => {
        currentActiveUsers.current = activeUsers ? [...activeUsers] : [];
    }, [activeUsers])


    useEffect(() => {
        const callActiveUserApi = async () => {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser.email}/activeUser`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                },
            })            
        }

        const callInactiveUserApi = async () => {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser.email}/inactiveUser`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                },
            })            
        }   
        
        const callBroadcastActiveUsersApi = async (users) => {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/activeUsers`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"activeUsers": users})
            })            
        }            

        callActiveUserApi();


        const activeUserHandler = async (user) => {
            let newActiveUsers = currentActiveUsers.current ? [...currentActiveUsers.current] : [];
            newActiveUsers.push(user)
            let set = new Set(newActiveUsers);
            newActiveUsers = Array.from(set)  
            dispatch(setActiveUsers(newActiveUsers))            
            await callBroadcastActiveUsersApi(newActiveUsers);     
        }

        const inactiveUserHandler = async (inactiveEmail) => {          
            let newActiveUsers = currentActiveUsers.current.filter(email => email !== inactiveEmail)
            dispatch(setActiveUsers(newActiveUsers))
        }

        const broadcastActiveUsersHandler = async (users) => {     
            if (currentActiveUsers.current.length == 1) { // check if users login late, ex: user1 and user2 already logged in, this is to ensure user1 and user2 also be in the activeUsers list of user3
                let newActiveUsers = currentActiveUsers.current.concat(users)
                let set = new Set(newActiveUsers);
                newActiveUsers = Array.from(set)  
                dispatch(setActiveUsers(newActiveUsers))                             
            }

        }        

        pusherClient.subscribe("activeUsers")
        pusherClient.bind("user:active", activeUserHandler)
        pusherClient.bind("user:inactive", inactiveUserHandler)
        pusherClient.bind("allUsers:active", broadcastActiveUsersHandler)


        window.addEventListener("beforeunload", callInactiveUserApi)
    
        return () => {
        
            callInactiveUserApi();

            pusherClient.unsubscribe("activeUsers")
            pusherClient.unbind("user:active", activeUserHandler)
            pusherClient.unbind("user:inactive", inactiveUserHandler)
            pusherClient.unbind("allUsers:active", broadcastActiveUsersHandler)

            window.removeEventListener("beforeunload", callInactiveUserApi)
        }
    }, [])

    return (
        <Outlet/>
    )
}
