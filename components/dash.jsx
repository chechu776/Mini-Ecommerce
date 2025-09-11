import React, { useEffect, useState } from "react";
import Axiosinstance from "../src/Axiosinstance"; // adjust if needed

const Dash = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
    orders: 0,
  });

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, products, orders, categories] = await Promise.all([
          Axiosinstance.get("/admin/showAllUsers"),
          Axiosinstance.get("/product/showAllProduct"),
          Axiosinstance.get("/order/showAllOrders"),
          Axiosinstance.get("/category/showAllCategory"),
        ]);

        setStats({
          users: users.data.length || 0,
          products: products.data.length || 0,
          orders: orders.data.length || 0,
          categories: categories.data.length || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchData();
  }, []);

  const cards = [
    { title: "Total Users", value: stats.users, color: "bg-blue-500" },
    { title: "Total Products", value: stats.products, color: "bg-green-500" },
    { title: "Total Categories", value: stats.categories, color: "bg-yellow-500" },
    { title: "Total Orders", value: stats.orders, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-lg text-white ${card.color} transform hover:scale-105 transition-transform duration-300`}
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-4xl font-bold mt-3">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dash;
