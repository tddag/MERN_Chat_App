import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const MessageItem = (props) => {

  const { currentUser } = useSelector(state => state.user);

  const isOwn = props.message.senderId == currentUser._id
  const seenUsers = (props.message.seenUsers || [])
                      .filter(user => user._id !== currentUser._id)
                      .map(user => user.name.toUpperCase())

  return (
    <div className={" flex " + (currentUser._id == props.message.senderId ? "justify-end" : "")}>
      <div className={"bg-slate-200 rounded-xl p-4 flex flex-col gap-1 "}>
        <div className={"flex gap-4 " + (currentUser._id !== props.message.senderId ? "": "flex-row-reverse" )}>
          <img src="/assets/t.png" className="h-6 w-6" alt="Avatar"/>
          <span>{props.message.message} </span>
        </div>

        <div className={"flex " + (currentUser._id == props.message.senderId ? "justify-end": "" )}>
          {new Date(props.message.createdAt).toLocaleString('en')}
        </div>
        
        {props.isLast && seenUsers.length > 0 && isOwn && (
          <div className={"text-xs font-light text-gray-500 flex " + (currentUser._id == props.message.senderId ? "justify-end": "" )}>
            Seen by {seenUsers.join(", ")}
          </div>
        )}
          
      </div>
    </div>    
  )
}
