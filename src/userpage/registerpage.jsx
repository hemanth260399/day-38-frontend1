import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { adduserapi } from "../api_utils/server_api";
import { Loader } from "./loading";

export let Register = () => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    let [loading, setloading] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    const useralldata = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            delete data.confirmPassword;
            setloading(true);
            const response = await adduserapi(data);
            setloading(false);
            alert(response.msg);
            navigate("/login");
        } catch (e) {
            setloading(false)
            alert("Something Went Wrong, Please try again later");
            console.log("Error", e);
        }
    }
    if (isAuthenticated) {
        return <Navigate to="/urlshortner" />
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-3 rounded" style={{ width: "350px" }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={useralldata}>
                    <div className="form-group mb-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Full Name"
                            name={"name"}
                            value={data.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter Phone"
                            name={"phone"}
                            value={data.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name={"email"}
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={data.password}
                            name="password"
                            onChange={handleChange}
                            required
                            minLength={5}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={5}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block w-100">
                        Register
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    );
};
