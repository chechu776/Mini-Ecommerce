import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axiosinstance from "../Axiosinstance";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = async () => {
        try {
            const res = await Axiosinstance.get(`/product/showProduct/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error("Error fetching product details:", err);
        }
    };

    const handleAddToCart = async () => {
        try {
            const userId = localStorage.getItem("id");
            if (!userId) {
                alert("Please login to add items to your cart");
                navigate("/login");
                return;
            }

            await Axiosinstance.post("/cart/addToCart", {
                productId: product._id,
                quantity,
            });

            navigate("/cart");
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert("Something went wrong while adding to cart");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
            <div className="bg-white shadow-lg rounded-2xl max-w-5xl w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex justify-center items-center">
                    <img
                        src={`${Axiosinstance.defaults.baseURL}/${product.image}`}
                        alt={product.name}
                        className="w-full max-h-[500px] object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-sm text-gray-500 mt-2">{product.category?.name}</p>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-10">
                        <p className="text-2xl font-semibold text-gray-900">₹{product.price}</p>

                        <div className="flex items-center mt-6 space-x-4">
                            <span className="text-lg font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                                    }
                                    className="w-16 text-center border-x text-lg font-medium text-gray-900"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="mt-8 w-full bg-black text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-black/80 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
