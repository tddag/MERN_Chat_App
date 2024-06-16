import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { pusherClient } from '../libs/pusher'

export const ActiveStatus = () => {

    const { currentUser } = useSelector(state => state.user)
    let activeUsers = [];

    useEffect(() => {
        console.log("Active Status mounted")

        const callActiveUserApi = async () => {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser.email}/activeUser`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                },
            })            
        }

        const callInactiveUserApi = async () => {
            console.log("TD - call INACTIVE API")
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser.email}/inactiveUser`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                },
            })            
        }   
        
        const callBroadcastActiveUsersApi = async () => {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/activeUsers`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"activeUsers": activeUsers})
            })            
        }            

        callActiveUserApi();


        const activeUserHandler = async (user) => {
            console.log("Active User event")
            console.log(user)
            activeUsers.push(user)
            let set = new Set(activeUsers);
            activeUsers = Array.from(set)              
            console.log("TD-activeUsers 1")
            console.log(activeUsers)         
            await callBroadcastActiveUsersApi();     
        }

        const inactiveUserHandler = async (inactiveEmail) => {
            activeUsers = activeUsers.filter(email => email !== inactiveEmail)

            console.log("Inactive User event")
            console.log(inactiveEmail)
            console.log("TD-activeUsers 2")
            console.log(activeUsers)   
        }

        const broadcastActiveUsersHandler = async (users) => {
            if (activeUsers.length == 1) {
                activeUsers = activeUsers.concat(users)
                let set = new Set(activeUsers);
                activeUsers = Array.from(set)  
                console.log("Broadcast Active Users event")
                console.log(users)
                console.log("TD-activeUsers 3")
                console.log(activeUsers)                                 
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
