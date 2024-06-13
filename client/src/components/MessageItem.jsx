import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const MessageItem = (props) => {

  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    
  })

  return (
    <div className={" flex " + (currentUser._id == props.message.senderId ? "justify-end" : "")}>
      <div className={"bg-slate-200 rounded-xl p-4 flex gap-4 " + (currentUser._id !== props.message.senderId ? "flex-row-reverse": "" )}>
          <span>{props.message.message} </span>
          <img src="/assets/t.png" className="h-6 w-6" alt="Avatar"/>
      </div>
    </div>    
  )
}
