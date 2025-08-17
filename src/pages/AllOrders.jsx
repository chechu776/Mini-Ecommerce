import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../Axiosinstance";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const res = await Axiosinstance.get("/order/userOrders");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                await Axiosinstance.delete(`/order/cancelOrder/${orderId}`);
                setOrders((prev) => prev.filter((order) => order._id !== orderId));
            } catch (err) {
                console.error(err);
                alert(err.response?.data?.message || "Failed to cancel order");
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                >
                    Back to Home
                </button>
            </div>

            {orders.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="text-white bg-gray-900">
                                <th className="py-3 px-4 border">Order ID</th>
                                <th className="py-3 px-4 border">Product</th>
                                <th className="py-3 px-4 border">Quantity</th>
                                <th className="py-3 px-4 border">Price</th>
                                <th className="py-3 px-4 border">Subtotal</th>
                                <th className="py-3 px-4 border">Total</th>
                                <th className="py-3 px-4 border">Shipping</th>
                                <th className="py-3 px-4 border">Payment</th>
                                <th className="py-3 px-4 border">Date</th>
                                <th className="py-3 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order,i) =>
                                order.items.map((item, index) => (
                                    <tr
                                        key={`${order._id}-${index}`}
                                        className="text-center text-gray-700 hover:bg-gray-50"
                                    >
                                        {index === 0 && (
                                            <td
                                                rowSpan={order.items.length}
                                                className="py-3 px-4 border font-medium text-sm text-gray-600"
                                            >
                                                {i+1}
                                            </td>
                                            
                                        )}

                                        <td className="py-3 px-4 border">{item.productId?.name}</td>
                                        <td className="py-3 px-4 border">{item.quantity}</td>
                                        <td className="py-3 px-4 border">₹{item.price}</td>
                                        <td className="py-3 px-4 border">₹{item.subTotal}</td>

                                        {index === 0 && (
                                            <>
                                                <td
                                                    rowSpan={order.items.length}
                                                    className="py-3 px-4 border font-semibold text-green-600"
                                                >
                                                    ₹{order.total}
                                                </td>
                                                <td
                                                    rowSpan={order.items.length}
                                                    className="py-3 px-4 border"
                                                >
                                                    {order.shippingStatus}
                                                </td>
                                                <td
                                                    rowSpan={order.items.length}
                                                    className="py-3 px-4 border"
                                                >
                                                    {order.paymentStatus}
                                                </td>
                                                <td
                                                    rowSpan={order.items.length}
                                                    className="py-3 px-4 border text-gray-500 text-sm"
                                                >
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td
                                                    rowSpan={order.items.length}
                                                    className="py-3 px-4 border"
                                                >
                                                    {order.shippingStatus.toLowerCase() === "pending" ? (
                                                        <button
                                                            onClick={() => handleDelete(order._id)}
                                                            className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition"
                                                        >
                                                            Cancel
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">You have no orders yet.</p>
            )}
        </div>
    );
};

export default AllOrders;
