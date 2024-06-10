import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
        <div className="flex justify-between bg-blue-300">
            <h2 className="text-bo">MERN Chat App</h2>
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/signin">Sign In</Link>                    
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    </>
  )
}
