import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const SignIn = () => {

  const [formInputData, setFormInputData] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();

  const handleFormInputChange = (e) => {
    setFormInputData({...formInputData, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    console.log(formInputData)

    setIsLoading(false)

  }
  
  return (
    <>
      <div className="max-w-lg mx-auto p-3">
        <h2 className="text-3xl text-center font-semibold my-7">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input onChange={handleFormInputChange} type="email" id="email" placeholder='Email' className="bg-slate-100 p-3 rounded-lg"/>
          <input onChange={handleFormInputChange} type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg" autoComplete="true"/>
          <button disabled={isLoading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {isLoading ? "Signing In" : "Sign In"}
          </button>
        </form>
        <div className="flex gap-4 mt-5">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
        <span className="text-red-500">

        </span>
      </div>
    </>
  )
}
