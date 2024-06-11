import React from 'react'

export const Users = () => {
  return (
    <div className="flex flex-col mx-auto w-full">
      <div className="bg-orange-200 flex justify-center h-20 items-center">
          <div>
            <input className="p-4 w-96 rounded-lg" placeholder="Search User"/>
          </div>
      </div>

      <div className="bg-blue-400 min-h-screen">
        <div className="flex flex-wrap gap-6 p-6 justify-center">
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>
          <div className="w-20 rounded-full h-20 bg-purple-300 p-4 flex items-center  justify-center">User</div>

        </div>
      </div>
      
    </div>
  )
}
