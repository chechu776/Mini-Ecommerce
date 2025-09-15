import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../Axiosinstance";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "", // new password
        oldPassword: "", // added for old password
        image: "",
    });
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const id = localStorage.getItem("id");

    useEffect(() => {
        if (!id) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await Axiosinstance.get(`/user/${id}`);
                if (res.data) {
                    setUser({
                        name: res.data.name || "",
                        email: res.data.email || "",
                        phone: res.data.phone || "",
                        password: "",
                        oldPassword: "",
                        image: res.data.image || "",
                    });
                    if (res.data.image) {
                        setPreview(`${Axiosinstance.defaults.baseURL}/${res.data.image}`);
                    }
                }
            } catch (err) {
                console.error(err);
                alert("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, navigate]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("phone", user.phone);
            formData.append("oldPassword", user.oldPassword);
            formData.append("password", user.password);
            if (file) {
                formData.append("image", file);
            }

            const res = await Axiosinstance.put(`/user/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                alert("Profile updated successfully");
            } else {
                alert("Update failed");
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto mt-20 bg-white p-8 shadow-2xl rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-black mb-6">My Profile</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-3">
                    {preview ? (
                        <img
                            src={preview}
                            alt="profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shadow-md">
                            No Image
                        </div>
                    )}
                    <label className="cursor-pointer text-sm text-black font-medium hover:underline">
                        Change Photo
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={user.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
