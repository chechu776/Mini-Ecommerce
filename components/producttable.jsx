import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axiosinstance from '../src/Axiosinstance';

const Table = () => {
    const [product, setProduct] = useState([]);
    const [message, setMessage] = useState();
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    const getProduct = async () => {
        const response = await Axiosinstance.get("/product/showAllProduct");
        setProduct(response.data);
    };
    useEffect(() => {
        getProduct();
    }, []);
    const deleteProduct = async (id) => {
        try {
            const response = await Axiosinstance.delete(`/product/deleteProduct/${id}`)
            getProduct();
            if (response.data.success) {
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

    return (
        <div className="overflow-x-auto p-4">
            <div className='flex justify-between w-11/12 mb-5' >
                <h1 className="text-white font-bold text-5xl mb-6">Manage Products</h1>
                <button className='bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-2 py-1 hover:cursor-pointer'>Add new Product</button>
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

            
            <table className="w-11/12 bg-gray-900 text-white rounded-t-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-900">
                        <th className="py-2 px-4 text-center">ID</th>
                        <th className="py-2 px-4 text-center">Product Name</th>
                        <th className="py-2 px-4 text-center">Brand</th>
                        <th className="py-2 px-4 text-center">Category</th>
                        <th className="py-2 px-4 text-center">Description</th>
                        <th className="py-2 px-4 text-center">Image</th>
                        <th className="py-2 px-4 text-center">Price</th>
                        <th className="py-2 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white hover:bg-gray-200 text-gray-800 hover:text-gray-900 font-medium border-b border-gray-300 text-center"
                        >
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">{item.brand}</td>
                            <td className="py-3 px-4">{item.category?.name}</td>
                            <td className="py-3 px-4">{item.description}</td>
                            <td className="py-3 px-4 flex items-center justify-center">
                                <img
                                    className="w-20 h-20 rounded-2xl object-cover"
                                    src={`http://localhost:3000/${item.image}`}
                                    alt=""
                                />
                            </td>
                            <td className="py-3 px-4">{item.price}</td>
                            <td className="py-3 px-4 ">
                                <button onClick={() => editProduct(item._id)} className='mr-4 px-3 py-2 hover:cursor-pointer text-white rounded-md bg-yellow-500 hover:bg-yellow-600'>
                                    Edit
                                </button>
                                <button onClick={() => deleteProduct(item._id)} className='px-3 py-2 hover:cursor-pointer text-white rounded-md bg-red-500 hover:bg-red-600'>
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
