import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axiosinstance from '../Axiosinstance'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState("")
    const navigate =useNavigate()
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("")
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const register = async () => {
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("phone", mobile)
            formData.append("password", password)
            formData.append("image", image)

            const response = await Axiosinstance.post("/user/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            console.log(response)
            if (response.data.success) {
                setMessage(response.data.message)
                navigate("/home")
            }
            else
            {
                setMessage(response.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='h-screen bg-gray-900'>
            <div className="flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img alt="Your Company" src="/ecom.png" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                        Sign Up your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className='space-y-6'>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-100">
                                Name
                            </label>
                            <input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                                Email address
                            </label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="number" className="block text-sm font-medium text-gray-100">
                                Mobile Number
                            </label>
                            <input
                                id="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                type="text"
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-100">
                                Image
                            </label>
                            <input
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                Password
                            </label>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
                            />
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={register}
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    {message && (
                        <div className="mt-4 relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <span className="block">{message}</span>
                            <button
                                onClick={() => setMessage("")}
                                className="absolute top-1 right-2 text-xl font-semibold text-red-700"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Already have an Account?{" "}
                        <Link to={"/login"} className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
