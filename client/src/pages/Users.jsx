import React from 'react'
import { UserList } from '../components/UserList'

export const Users = () => {

  

  return (
    <div className="flex flex-col mx-auto w-full">
      <div className="bg-orange-200 flex justify-center h-20 items-center">
          <div>
            <input className="p-4 w-96 rounded-lg" placeholder="Search User"/>
          </div>
      </div>

      <UserList/>
      
    </div>
  )
}
