import React from 'react'

export const MessageList = () => {

    let messageList = [
        {
            "_id": "66664eb6c5de1fc5a4c5757b",
            "message": "Test message 1",
            "seenUsers": [
                "6665ff27e62ca6ee72daeda0"
            ],
            "conversationId": "666648b4738119e3d4b7d97e",
            "senderId": "6665ff27e62ca6ee72daeda0",
            "createdAt": "2024-06-10T00:54:14.712Z",
            "updatedAt": "2024-06-10T00:54:14.712Z",
            "__v": 0
        },
        {
            "_id": "66664f96bab77f0189e70e14",
            "message": "Test message 2",
            "seenUsers": [
                "6665ff27e62ca6ee72daeda0"
            ],
            "conversationId": "666648b4738119e3d4b7d97e",
            "senderId": "6665ff27e62ca6ee72daeda0",
            "createdAt": "2024-06-10T00:57:58.056Z",
            "updatedAt": "2024-06-10T00:57:58.056Z",
            "__v": 0
        },
        {
            "_id": "66664fb0bab77f0189e70e18",
            "message": "Test message 3",
            "seenUsers": [
                "6665ff27e62ca6ee72daeda0"
            ],
            "conversationId": "666648b4738119e3d4b7d97e",
            "senderId": "6665ff27e62ca6ee72daeda0",
            "createdAt": "2024-06-10T00:58:24.856Z",
            "updatedAt": "2024-06-10T00:58:24.856Z",
            "__v": 0
        },
        {
            "_id": "66664fd6bab77f0189e70e1f",
            "message": "Test message 4",
            "seenUsers": [
                "6665ff27e62ca6ee72daeda0"
            ],
            "conversationId": "666648b4738119e3d4b7d97e",
            "senderId": "6665ff27e62ca6ee72daeda0",
            "createdAt": "2024-06-10T00:59:02.656Z",
            "updatedAt": "2024-06-10T00:59:02.656Z",
            "__v": 0
        }
    ]


    return (
        <div className="relative bg-green-300 w-4/6 h-5/6 " >
            <div className="flex flex-col p-2 md:p-4 overflow-auto h-3/4 md:mr-20">
                {messageList.map((message,index) => (
                    <div key={index} className="flex justify-end">
                        <div>
                            {message.message}    
                        </div>
                    </div>
                ))}                               
                
            </div>
           

            <div className="absolute bottom-5 w-full m-auto flex justify-center p-0" >
                <input className="rounded-lg w-10/12 md:w-9/12 p-3" placeholder='New Message'/>
            </div>

        </div>    
    )
}
