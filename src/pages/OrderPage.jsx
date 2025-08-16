import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axiosinstance from "../Axiosinstance";

const OrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    const fetchOrder = async () => {
        try {
            const res = await Axiosinstance.get(`/order/showOrder/${id}`);
            setOrder(res.data);
        } catch (err) {
            console.error("Error fetching order:", err);
        }
    };

    const handlePayment = async () => {
        try {
            await Axiosinstance.patch(`/order/paymentStatus/${id}`, {
                paymentStatus: "Paid",
            });
            alert("✅ Payment Successful!");
            navigate("/");
        } catch (err) {
            console.error("Error updating payment:", err);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (!order) return <p className="text-center mt-20">Loading order...</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>

                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b">
                        <div className="flex items-center gap-3">
                            <img
                                src={item.productId?.image ? `http://localhost:3000/${item.productId.image}` : "/no-img.png"}
                                alt={item.productId?.name || "Product"}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <span className="font-medium">{item.productId?.name || "Product"}</span>
                        </div>
                        <span>
                            {item.quantity} × ₹{item.price} = ₹{item.subTotal}
                        </span>
                    </div>
                ))}

                <div className="flex justify-between text-xl font-semibold mt-6">
                    <span>Total:</span>
                    <span>₹{order.total}</span>
                </div>

                <button
                    onClick={handlePayment}
                    className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    );
};

export default OrderPage;
