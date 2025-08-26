import Axiosinstance from "../src/Axiosinstance";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import flipKart from "../src/assets/fkheaderlogo_exploreplus-44005d.svg";
import search from "../src/assets/download.svg";
import guest from "../src/assets/imgi_4_profile-52e0dc.svg";
import dropDown from "../src/assets/download (1).svg";
import cart from "../src/assets/imgi_313_Cart.svg";
import newArrival from "../src/assets/imgi_12_Store-9eeae2.svg";
import orderbutton from "../src/assets/shopping-bag.png";
import profileIcon from "../src/assets/profile.png";

function Header() {
    const [id, setId] = useState(localStorage.getItem("id"));
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCartCount = async () => {
            if (id) {
                try {
                    const res = await Axiosinstance.get("/cart/showCart");
                    if (res.data?.items) {
                        setCartCount(res.data.items.length);
                    } else {
                        setCartCount(0);
                    }
                } catch (err) {
                    console.log(err);
                    setCartCount(0);
                }
            }
        };
        fetchCartCount();
    }, [id]);

    const handleNewArrivalsClick = (e) => {
        e.preventDefault();
        if (location.pathname === "/") {
            const section = document.getElementById("new-arrivals");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/#new-arrivals");
        }
    };

    const logout = async () => {
        try {
            const response = await Axiosinstance.get("/user/logout");
            if (response.data.success) {
                localStorage.removeItem("id");
                setId(null);
                setCartCount(0);
                alert(response.data.message);
            } else {
                alert("Logout failed");
            }
        } catch (err) {
            console.error(err);
            alert("Logout failed");
        }
    };
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search/${searchQuery}`);
        }
    };


    return (
        <header className="flex items-center gap-10 w-full h-16 bg-white fixed z-10 relative px-4">
            <div>
                <Link to="/" className="flex">
                    <img src={flipKart} alt="logo" />
                    {/* <h1 style={{fontFamily:"Integral CF"}} className="text-3xl">SHOP.CO</h1> */}
                </Link>
            </div>

            <div className="flex items-center w-150 bg-blue-50 px-3 py-2 rounded-lg gap-2">
                <img src={search} alt="search button" />
                <input
                    className="w-full outline-0"
                    type="text"
                    placeholder="Search for Products, Brands and More"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>

            <div>
                <Link
                    to="/"
                    onClick={handleNewArrivalsClick}
                    className="flex gap-2 items-center hover:bg-gray-100 px-2 py-2 rounded-lg transition-all"
                >
                    <img src={newArrival} alt="NEW ARRIVALS" />
                    <p>New Arrivals</p>
                </Link>
            </div>

            <div className="relative">
                <Link
                    to="/cart"
                    className="flex gap-2 items-center hover:bg-gray-100 px-2 py-2 rounded-lg transition-all"
                >
                    <img src={cart} alt="cart" />
                    <p>Cart</p>
                </Link>
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                        {cartCount}
                    </span>
                )}
            </div>

            <div>
                <Link
                    to="/orders"
                    className="flex gap-2 items-center hover:bg-gray-100 px-2 py-2 rounded-lg transition-all"
                >
                    <img src={orderbutton} alt="orders" className="p-1 rounded-lg" />
                    <p>Orders</p>
                </Link>
            </div>

            {id && (
                <div>
                    <Link
                        to="/profile"
                        className="flex gap-2 items-center hover:bg-gray-100 px-2 py-2 rounded-lg transition-all"
                    >
                        <img src={profileIcon} alt="profile" className="w-6 h-6 rounded-full" />
                        <p>Profile</p>
                    </Link>
                </div>
            )}

            {!id ? (
                <div>
                    <Link
                        to="/login"
                        className="flex gap-2 hover:bg-blue-600 hover:text-white transition-all px-2 py-2 rounded-lg group"
                    >
                        <img src={guest} alt="guest" className="group-hover:invert" />
                        <p>Login</p>
                        <img
                            src={dropDown}
                            alt="dropdown"
                            className="group-hover:rotate-180 group-hover:transition-all group-hover:duration-300 group-hover:invert"
                        />
                    </Link>
                </div>
            ) : (
                <div>
                    <button
                        onClick={logout}
                        className="flex gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
