import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axiosinstance from '../src/Axiosinstance';

const Table = () => {
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    useEffect(() => {
        const getUser = async () => {
            const response = await Axiosinstance.get("/admin/showAllUsers");
            console.log(response);
            setUser(response.data);
        };
        getUser();
    }, []);
    const handleStatus = async (id) => {
        try {
            const match = user.find((u) => u._id == id)
            const newStatus = match.status == "active" ? "inactive" : "active"
            const response = await Axiosinstance.patch(`/admin/userstatus/${id}`, { status: newStatus }, { withCredentials: true })
            setUser((p) =>
                p.map((u) =>
                    u._id === id ? { ...u, status: newStatus } : u
                )
            );
            setMessage(response.data.message)
        }
        catch (err) {
            console.log(err);
        }
    }
    const deleteUser = async(id)=>{

    }

    return (
        <div className="overflow-x-auto p-4">
            <h1 className="text-white font-bold text-5xl mb-6">Manage Users</h1>
            {message && (
                <div className="mt-4 relative bg-red-green border border-green-400 text-green-700 px-4 py-3 rounded w-11/12">
                    <span className="block">{message}</span>
                    <button
                        onClick={() => setMessage("")}
                        className="absolute top-1 right-2 text-xl font-semibold text-green-700 hover:text-green-900 hover:cursor-pointer"
                    >
                        &times;
                    </button>
                </div>
            )}
            <table className="w-11/12 bg-gray-900 text-white rounded-t-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-900">
                        <th className="py-2 px-4 text-center">ID</th>
                        <th className="py-2 px-4 text-center">Name</th>
                        <th className="py-2 px-4 text-center">Image</th>
                        <th className="py-2 px-4 text-center">Phone no</th>
                        <th className="py-2 px-4 text-center">Email</th>
                        <th className="py-2 px-4 text-center">Status</th>
                        <th className="py-2 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white hover:bg-gray-200 text-gray-800 hover:text-gray-900 font-medium border-b border-gray-300 text-center"
                        >
                            <td className="py-3 px-4">{item._id}</td>
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">
                                <img
                                    className="w-20 h-20 rounded-2xl object-cover"
                                    src={`http://localhost:3000/${item.image}`}
                                    alt=""
                                />
                            </td>
                            <td className="py-3 px-4">{item.phone}</td>
                            <td className="py-3 px-4">{item.email}</td>
                            <td className="py-3 px-4">
                                <button
                                    className={`px-3 py-1 font-semibold hover:cursor-pointer rounded text-white ${item.status === 'active'
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-red-500 hover:bg-red-600'
                                        }`} onClick={() => handleStatus(item._id)}
                                >
                                    {item.status}
                                </button>
                            </td>
                            <td className="py-9 px-4 flex justify-center items-center gap-2">
                                <button onClick={()=> deleteUser(item._id) }
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded hover:cursor-pointer">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
