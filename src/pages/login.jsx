import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Axiosinstance from '../Axiosinstance'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const isAdmin = location.pathname === "/admin/login";
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const HandleLogin = async () => {
        try {
            const apiEndpoint = isAdmin ? "/admin/login" : "/login";

            const response = await Axiosinstance.post(apiEndpoint, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            if (response.data.type) {
                localStorage.setItem("role", response.data.role); 
                localStorage.setItem("id",response.data.id)
                navigate(isAdmin ? "/admindashboard" : "/home");
            } else {
                setMessage(response.data.message);
            }
        } catch (err) {
            console.log(err)
            setMessage("Something went wrong. Please try again.")
        }
    }

    return (
        <div className='h-screen bg-gray-900'>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="/ecom.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                        {isAdmin ? "Admin Login" : "User Login"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={HandleLogin}
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold hover:cursor-pointer text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
                            >
                                Log In
                            </button>
                        </div>

                        {message && (
                            <div className="mt-4 relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                <span className="block">{message}</span>
                                <button
                                    onClick={() => setMessage("")}
                                    className="absolute top-1 right-2 text-xl font-semibold text-red-700 hover:text-red-900 hover:cursor-pointer"
                                >
                                    &times;
                                </button>
                            </div>
                        )}


                    </div>
                    {
                        !isAdmin && 
                            <p className="mt-10 text-center text-sm text-gray-400">
                                Don't have an Account?{' '}
                                <Link to={"/signup"} className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Sign Up
                                </Link>
                            </p>
            
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
