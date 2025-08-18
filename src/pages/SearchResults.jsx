import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axiosinstance from "../Axiosinstance";

const SearchResults = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await Axiosinstance.get(`/product/search/${query}`);
                setProducts(res.data || []);
            } catch (err) {
                console.error("Error fetching search results:", err);
            }
        };
        fetchProducts();
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

            {products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/showProduct/${product._id}`}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all"
                        >
                            <img
                                src={`http://localhost:3000/${product.image}`}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-600">₹{product.price}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
