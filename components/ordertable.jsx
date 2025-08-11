import React, { useState, useEffect } from 'react';
import Axiosinstance from '../src/Axiosinstance';
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const getOrders = async () => {
        try {
            const response = await Axiosinstance.get("/order/showAllOrders");
            setOrders(response.data);
            console.log(response.data);

        } catch (err) {
            console.error(err);
        }
    };

    const updateShippingStatus = async (orderId, value) => {
        try {
            await Axiosinstance.patch(`/admin/shippingstatus/${orderId}`, { shippingStatus: value });
            setMessage("shipping status updated successfully");
            getOrders();
        } catch (err) {
            console.error(err);
            setMessage("Failed to update shipping status");
        }
    };
    const updatePaymentStatus = async (orderId, value) => {
        try {
            await Axiosinstance.patch(`/order/paymentStatus/${orderId}`, { paymentStatus: value });
            setMessage("payment status updated successfully");
            getOrders();
        } catch (err) {
            console.error(err);
            setMessage("Failed to update payment status");
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="overflow-x-auto p-4">
            <h1 className="text-white font-bold text-5xl mb-6">Manage Orders</h1>

            {message && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-11/12 relative">
                    <span className="block">{message}</span>
                    <button
                        onClick={() => setMessage("")}
                        className="absolute top-1 right-2 text-xl font-semibold text-green-700 hover:text-green-900"
                    >
                        &times;
                    </button>
                </div>
            )}
            <div className=" h-160 overflow-y-auto rounded-lg [&::-webkit-scrollbar]:hidden ">
                <table className="w-11/12 bg-gray-900 text-white rounded-t-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="py-2 px-4 text-center">Order ID</th>
                            <th className="py-2 px-4 text-center">Username</th>
                            <th className="py-2 px-4 text-center">Product Name</th>
                            <th className="py-2 px-4 text-center">Price</th>
                            <th className="py-2 px-4 text-center">Quantity</th>
                            <th className="py-2 px-4 text-center">Subtotal</th>
                            <th className="py-2 px-4 text-center">Total</th>
                            <th className="py-2 px-4 text-center">Shipping Status</th>
                            <th className="py-2 px-4 text-center">Payment Status</th>
                            <th className="py-2 px-4 text-center">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, orderIndex) => {
                            const productCount = order.items.length;
                            const bgColor = orderIndex % 2 === 0 ? "bg-gray-200" : "bg-white";

                            return order.items.map((product, index) => (
                                <tr
                                    key={`${order._id}-${product.productId}`}
                                    className={`${bgColor} text-gray-800 font-medium  border-gray-300 text-center`}
                                >
                                    {index === 0 && (
                                        <>
                                            <td
                                                rowSpan={productCount}
                                                className="py-3 px-4 align-middle font-semibold border-r border-gray-300"
                                            >
                                                {orderIndex + 1}
                                            </td>
                                            <td
                                                rowSpan={productCount}
                                                className="py-3 px-4 align-middle border-r border-gray-300"
                                            >
                                                {order.userId?.name}
                                            </td>
                                        </>
                                    )}

                                    <td className="py-3 px-4 border-r border-gray-300">{product.productId?.name}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">₹{product.price}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">{product.quantity}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">₹{product.subTotal}</td>
                                    {index === 0 && (
                                        <>
                                            <td
                                                rowSpan={productCount}
                                                className="py-3 px-4 align-middle border-l border-gray-300 font-bold text-green-700"
                                            >
                                                ₹{order.total}
                                            </td>
                                            <td
                                                rowSpan={productCount}
                                                className="py-3 px-4 align-middle border-l border-gray-300"
                                            >
                                                <select
                                                    value={order.shippingStatus}
                                                    onChange={(e) => updateShippingStatus(order._id, e.target.value)}
                                                    className={`border rounded p-1 font-semibold bg-white
                                                ${order.shippingStatus === "Pending" ? "border-yellow-400 text-yellow-600" : ""}
                                                ${order.shippingStatus === "Shipped" ? "border-blue-400 text-blue-600" : ""}
                                                ${order.shippingStatus === "Delivered" ? "border-green-400 text-green-600" : ""}
                                                ${order.shippingStatus === "Cancelled" ? "border-red-400 text-red-600" : ""}
                                            `}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>

                                            </td>
                                            <td
                                                rowSpan={productCount}
                                                className="py-3 px-4 align-middle border-l border-gray-300"
                                            >
                                                {order.paymentStatus}
                                            </td>
                                            <td
                                                rowSpan={productCount}
                                                className="py-3 px-4 align-middle border-l border-gray-300 text-sm text-gray-500"
                                            >
                                                {new Date(order.createdAt).toLocaleString()}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ));
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
