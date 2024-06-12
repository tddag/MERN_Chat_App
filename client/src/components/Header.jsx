import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { reset } from '../state/user/userSlice'

export const Header = () => {
  const { currentUser } = useSelector(state => state.user )
  const dispatch = useDispatch();


  const handleSignOut = () => {
    dispatch(reset())

  }

  return (
    <>
        <div className="flex justify-between bg-blue-300 items-center mx-auto p-3">
            <h2 className="font-bold">MERN Chat App</h2>
            <div className="flex gap-4 items-center">
                { currentUser ? (
                  <div className="flex gap-4 items-center">
                    <span>Hi { currentUser.name } </span>
                    <Link to="/conversations">Conversation</Link>
                    <Link to="/users">Users</Link>                    
                    <Link to="/signin" onClick={handleSignOut} className="bg-red-200 p-2 rounded-lg">
                      <button > Sign Out </button>                    
                    </Link>
 
                  </div>
                ): (
                  <div className="flex gap-4">
                    <Link to="/signin">Sign In</Link>                    
                    <Link to="/signup">Sign Up</Link>
                  </div>
                 
                )}

            </div>
        </div>
    </>
  )
}
