import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../Axiosinstance";

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const res = await Axiosinstance.get("/cart/showCart");
            if (!res.data.items || res.data.items.length === 0) {
                setCart(null);
            } else {
                setCart(res.data);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            await Axiosinstance.put("/cart/editCart", { productId, quantity: newQuantity });
            setCart((prevCart) => {
                if (!prevCart) return null;
                const updatedItems = prevCart.items.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity }
                        : item
                );
                const updatedTotal = updatedItems.reduce((sum, i) => sum + i.subtotal, 0);
                return { ...prevCart, items: updatedItems, total: updatedTotal };
            });
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };

    const deleteItem = async (productId) => {
        try {
            await Axiosinstance.delete(`/cart/deleteCart/${productId}`);
            setCart((prevCart) => {
                if (!prevCart) return null;
                const updatedItems = prevCart.items.filter((item) => item.productId !== productId);
                if (updatedItems.length === 0) return null;
                const updatedTotal = updatedItems.reduce((sum, i) => sum + i.subtotal, 0);
                return { ...prevCart, items: updatedItems, total: updatedTotal };
            });
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    const clearCart = async () => {
        try {
            await Axiosinstance.delete("/cart/deleteCart");
            setCart(null);
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };
    const placeOrder = async () => {
        try {
            const res = await Axiosinstance.post("/order/createOrder", {
                items: cart.items,
                total: cart.total,
            });

            console.log("📦 Order response:", res.data);

            if (res.data?.order?._id) {
                alert("✅Please Make Payment For Your Order to be successfully!");
                navigate(`/order/${res.data.order._id}`);
            } else {
                alert("⚠️ Something went wrong with placing order");
            }
        } catch (err) {
            console.error("Error placing order:", err);
            alert("❌ Failed to place order");
        }
    };



    useEffect(() => {
        fetchCart();
    }, []);

    if (!cart || cart.items.length === 0)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-center text-lg mb-6">🛒 Your cart is empty</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-black text-white rounded-xl hover:bg-black/80"
                >
                    Go Back to Home
                </button>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                    <button
                        onClick={clearCart}
                        className="w-1/6 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 cursor-pointer"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="space-y-6">
                    {cart.items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex justify-between items-center border-b pb-6"
                        >
                            <div className="flex items-center space-x-6">
                                <img
                                    src={`${Axiosinstance.defaults.baseURL}/${item.image || item.product?.image}`}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-xl shadow"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-gray-500">₹{item.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                                    }
                                    className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 cursor-pointer"
                                >
                                    −
                                </button>
                                <span className="px-4 text-lg">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300 cursor-pointer"
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="text-lg font-medium">₹{item.subtotal}</p>
                                <button
                                    onClick={() => deleteItem(item.productId)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m3 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-8 text-xl font-semibold border-t pt-6">
                    <span>Total:</span>
                    <span>₹{cart.total}</span>
                </div>

                <div className="mt-10 flex space-x-6">
                    <button
                        onClick={() => navigate("/#new-arrivals")}
                        className="w-3/6 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 cursor-pointer"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={placeOrder}
                        className="w-3/6 bg-black text-white py-3 rounded-xl hover:bg-black/80 cursor-pointer"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
