import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const SignUp = () => {

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
        <h2 className="text-3xl text-center font-semibold my-7">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input onChange={handleFormInputChange} type="text" id="name" placeholder='Name' className="bg-slate-100 p-3 rounded-lg"/>
          <input onChange={handleFormInputChange} type="email" id="email" placeholder='Email' className="bg-slate-100 p-3 rounded-lg"/>
          <input onChange={handleFormInputChange} type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg" autoComplete="true"/>
          <button disabled={isLoading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {isLoading ? "Signing Up" : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-4 mt-5">
          <p>Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
        <span className="text-red-500">

        </span>
      </div>
    </>
  )
}
