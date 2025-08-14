import Axiosinstance from "../src/Axiosinstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import flipKart from "../src/assets/fkheaderlogo_exploreplus-44005d.svg";
import search from "../src/assets/download.svg";
import guest from "../src/assets/imgi_4_profile-52e0dc.svg";
import dropDown from "../src/assets/download (1).svg";
import cart from "../src/assets/imgi_313_Cart.svg";
import dots from "../src/assets/imgi_13_header_3verticalDots-ea7819.svg";
import newArrival from "../src/assets/imgi_12_Store-9eeae2.svg"
import { Link, useLocation } from "react-router-dom";

function Header() {
    const [id, setId] = useState(localStorage.getItem("id"));
    const location = useLocation()
    const navigate= useNavigate()

    const handleNewArrivalsClick = (e) => {
        if (location.pathname === "/") {
            const section = document.getElementById("new-arrivals");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };
    const logout = async () => {
        try {
            const response = await Axiosinstance.get("/user/logout");
            if (response.data.success) {
                localStorage.removeItem("id");
                setId(null);
                alert(response.data.message);
            } else {
                alert("Logout failed");
            }
        } catch (err) {
            console.error(err);
            alert("Logout failed");
        }
    };

    useEffect(() => {
        const syncAuth = () => {
            setId(localStorage.getItem("id"));
        };
        window.addEventListener("storage", syncAuth);
        return () => window.removeEventListener("storage", syncAuth);
    }, []);
    return (
        <header className="flex items-center gap-10 w-full h-16 px-6 bg-white fixed z-10 relative">
            <div>
                <Link href="/" className="flex"><img src={flipKart} alt="logo" /></Link>
            </div>

            <div className="flex items-center w-3/6 bg-blue-50 px-3 py-2 rounded-lg gap-2">
                <Link href=""><img src={search} alt="search button" /></Link>
                <input className="w-full outline-0" type="text" placeholder="Search for Products, Brands and More" />
            </div>

            {!id ? (
                <div>
                    <Link to="/login" className="flex gap-2 hover:bg-blue-600 hover:text-white transition-all px-2 py-2 rounded-lg group">
                        <img src={guest} alt="guest" className="group-hover:invert" />
                        <p>Login</p>
                        <img src={dropDown} alt="dropdown" className="group-hover:rotate-180 group-hover:transition-all group-hover:duration-300 group-hover:invert" />
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

            <div>
                <Link href="" className="flex gap-2 items-center">
                    <img src={cart} alt="cart" />
                    <p>Cart</p>
                </Link>
            </div>


            <div>
                <Link href="">
                    <img src={dots} alt="menu" className="p-2 hover:bg-gray-100 rounded-lg hover:border border-gray-200" />
                </Link>
            </div>
        </header>
    );
}

export default Header;
