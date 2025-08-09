import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axiosinstance from '../src/Axiosinstance';
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    const getCategory = async () => {
        const response = await Axiosinstance.get("/category/showAllCategory");
        setCategory(response.data);
    };
    useEffect(() => {
        getCategory();
    }, []);
    const deleteCategory = async (id) => {
        try {
            const response = await Axiosinstance.delete(`/category/deleteCategory/${id}`)
            if (response.data.success) {
                getCategory();
                setMessage(response.data.message)

            }
            else {
                setMessage(response.data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const addCategory = async () => {
        try {
            const response = await Axiosinstance.post("/category/addCategory", { name, description })
            getCategory()
            setName(""); setDescription("")
            setShow(false)
            if (response.data.success) {
                setMessage(response.data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="overflow-x-auto p-4">
            <div className='flex justify-between w-11/12 mb-5' >
                <h1 className="text-white font-bold text-5xl mb-6">Manage Categories</h1>
                <button onClick={() => setShow(true)} className='bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-2 py-1 hover:cursor-pointer'>Add new Category</button>
            </div>

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
            {show && (
                <div className="fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-yellow-50 rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Add New Category</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={addCategory}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setShow(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <table className="w-11/12 bg-gray-900 text-white rounded-t-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-900">
                        <th className="py-2 px-4 text-center">ID</th>
                        <th className="py-2 px-4 text-center">Category Name</th>
                        <th className="py-2 px-4 text-center">Description</th>
                        <th className="py-2 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white hover:bg-gray-200 text-gray-800 hover:text-gray-900 font-medium border-b border-gray-300 text-center"
                        >
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">{item.description}</td>
                            <td className="py-3 px-4 flex justify-center gap-5">
                                <button onClick={() => editCategory(item._id)} className='px-3 py-2 hover:cursor-pointer text-white rounded-md bg-yellow-500 hover:bg-yellow-600'>
                                    Edit
                                </button>
                                <button onClick={() => deleteCategory(item._id)} className='px-3 py-2 hover:cursor-pointer text-white rounded-md bg-red-500 hover:bg-red-600'>
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
