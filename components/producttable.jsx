import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axiosinstance from '../src/Axiosinstance';

const Table = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState("")
    const [message, setMessage] = useState();
    const [editId, setEditId] = useState(null)
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [oldImage, setOldImage] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    const getCategories = async () => {
        const response = await Axiosinstance.get("/category/showAllCategory");
        setCategories(response.data);
    };
    const getProduct = async () => {
        const response = await Axiosinstance.get("/product/showAllProduct");
        setProduct(response.data);
    };
    useEffect(() => {
        getCategories();
        getProduct();
    }, []);
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;
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
    const resetForm = () => {
        setName("");
        setBrand("");
        setCategory("");
        setDescription("");
        setImage("setOldImage");
        setPrice("");
    }
    const addProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("brand", brand);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("price", price);
            if (image) {
                formData.append("image", image);
            }
            let response;
            if (!editId) {
                response = await Axiosinstance.post("/product/addProduct", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            else {
                response = await Axiosinstance.put(`/product/editProduct/${editId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            }
            getProduct();
            resetForm();
            setEditId(null)
            setShow(false);
            if (response.data.success) {
                setMessage(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const editProduct = (item) => {
        setEditId(item._id);
        setName(item.name);
        setBrand(item.brand);
        setCategory(item.category?._id || "");
        setDescription(item.description);
        setPrice(item.price);
        setOldImage(item.image)
        setImage(null)
        setShow(true);
    };


    return (
        <div className="overflow-x-auto p-4">
            <div className='flex justify-between w-11/12 mb-5' >
                <h1 className="text-white font-bold text-5xl mb-6">Manage Products</h1>
                <button onClick={() => { resetForm(); setEditId(null); setShow(true) }} className='bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-2 py-1 hover:cursor-pointer'>Add new Product</button>
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
                        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">{editId ? "Edit New Product" : "Add New Products"}</h2>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
                        />
                        <input
                            placeholder="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        >
                            <option value="" >---Select a Category---</option>
                            {categories.map((c) => (<option className='bg-yellow-50' key={c._id} value={c._id}>{c.name}</option>))}
                        </select>
                        <input
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        />
                        <input
                            type='file'
                            placeholder="Product Image"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        />
                        {editId && oldImage && !image && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Current Image:</p>
                                <img
                                    src={`${Axiosinstance.defaults.baseURL}/${oldImage}`}
                                    alt="Product"
                                    className="w-20 h-20 object-cover rounded-md mt-1"
                                />
                            </div>
                        )}
                        <input
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={addProduct}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
                            >
                                {editId ? "Update" : "Add"}
                            </button>
                            <button
                                onClick={() => setShow(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-11/12 h-160 overflow-y-auto rounded-lg [&::-webkit-scrollbar]:hidden ">
                <table className="w-full bg-gray-900 text-white rounded-t-lg shadow-lg text-sm">
                    <thead className="sticky top-0 bg-gray-900 z-10">
                        <tr>
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
                                        src={`${Axiosinstance.defaults.baseURL}/${item.image}`}
                                        alt=""
                                    />
                                </td>
                                <td className="py-3 px-4">{item.price}</td>
                                <td className="py-3 px-4 ">
                                    <button onClick={() => editProduct(item)} className='mr-4 px-3 py-2 text-white rounded-md bg-yellow-500 hover:bg-yellow-600'>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteProduct(item._id)} className='px-3 py-2 text-white rounded-md bg-red-500 hover:bg-red-600'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
