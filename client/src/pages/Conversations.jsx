import React from 'react'

export const Conversations = () => {
  return (
    <div className="flex gap-2 md:gap-4 mb-10 h-screen">

        <div className="bg-purple-300 w-2/6 h-5/6 flex flex-col p-2 md:p-4">
        <div>Conversation</div>
        <div>Conversation</div>
        <div>Conversation</div>
        <div>Conversation</div>
        <div>Conversation</div>

        </div>
        <div className="relative bg-green-300 w-4/6 h-5/6 flex flex-col p-2 md:p-4 border-8 border-blue-800" >
            <div>Message</div>
            <div className="flex justify-end">
                <div>Message</div>
            </div>
            <div>Message</div>
            <div className="flex justify-end">
                <div>Message</div>
            </div>
            <div>Message</div>
            <div className="flex justify-end">
                <div>Message</div>
            </div>
            <div>Message</div>
            <div className="flex justify-end">
                <div>Message</div>
            </div>

            <div className="absolute bottom-5 border-2 w-full">
                <input className="rounded-lg w-full" placeholder='New Message'/>
            </div>

        </div>
    </div>
  )
}
