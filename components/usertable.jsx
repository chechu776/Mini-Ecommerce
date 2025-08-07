import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("http://localhost:3000/admin/showAllUsers", {
                withCredentials: true,
            });
            console.log(response);
            setUser(response.data);
        };
        getUser();
    }, []);

    const handleEdit = (id) => {
        console.log("Edit user:", id);
        // Implement navigation or popup edit logic here
    };

    const handleDelete = async (id) => {
        try {
            // Replace with actual API call if needed
            await axios.delete(`http://localhost:3000/admin/deleteUser/${id}`, {
                withCredentials: true,
            });
            // Remove user from UI
            setUser(prev => prev.filter(user => user._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <h1 className="text-white font-bold text-5xl mb-6">Manage Users</h1>
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
                                    className={`px-3 py-1 font-semibold rounded text-white ${item.status === 'active'
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-red-500 hover:bg-red-600'
                                        }`}
                                >
                                    {item.status}
                                </button>
                            </td>
                            <td className="py-9 px-4 flex justify-center items-center gap-2">
                                <button
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-3 rounded">
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded">
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
