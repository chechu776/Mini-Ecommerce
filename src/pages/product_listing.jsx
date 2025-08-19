import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Axiosinstance from "../Axiosinstance";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Product_listing = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const response = await Axiosinstance.get("/product/showAllProduct");
            setProducts(response.data);
            setFilteredProducts(response.data);
            const uniqueCategories = [
                "All",
                ...new Set(
                    response.data.map((p) =>
                        typeof p.category === "object" ? p.category.name : p.category
                    )
                )
            ];
            setCategories(uniqueCategories);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        let updatedProducts = [...products];
        if (selectedCategory !== "All") {
            updatedProducts = updatedProducts.filter((p) => {
                const categoryName = p.category.name;
                return categoryName === selectedCategory;
            });
        }
        if (sortOrder === "lowToHigh") {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(updatedProducts);
    }, [selectedCategory, sortOrder, products]);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <div className="p-6" id="new-arrivals">
            <h1
                className="font-bold text-center text-5xl text-black my-10"
                style={{ fontFamily: "Integral CF" }}
            >
                New Arrivals
            </h1>

            <div className="mb-6 flex justify-end gap-4 items-center">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                >
                    <option value="default">Sort By</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
            ) : (
                <Slider {...sliderSettings}>
                    {filteredProducts.map((item) => (
                        <div key={item._id} className="px-2">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src={`http://localhost:3000/${item.image}`}
                                    alt={item.name}
                                    className="w-full h-64 rounded-t-xl"
                                    loading="lazy"
                                />

                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                                        {item.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {item.category.name}
                                    </p>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-black font-bold">₹{item.price}</span>
                                        <button
                                            onClick={() => navigate(`/product/showProduct/${item._id}`)}
                                            className="bg-black text-white px-3 py-1 rounded-md hover:bg-black/80 hover:cursor-pointer"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default Product_listing;
