import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { loginuserapi } from "../api_utils/server_api"
import { Loader } from "./loading"

let Login = () => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    let [userdata, setuserdata] = useState({
        email: "",
        password: ""
    })
    let [loading, setloading] = useState(false)
    const navigate = useNavigate();
    let updatedata = (e) => {
        setuserdata({
            ...userdata,
            [e.target.name]: e.target.value
        })
    }
    let saveuserdata = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            let response = await loginuserapi(userdata)
            setloading(false)
            alert(response.msg)
            localStorage.setItem("useremail", JSON.stringify(userdata.email))
            navigate("/urlshortner")
        } catch (e) {
            setloading(false)
            alert(e.message)
        }
    }
    if (isAuthenticated) {
        return <Navigate to="/urlshortner" />
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 rounded" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={saveuserdata}>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={userdata.email}
                            onChange={updatedata}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            value={userdata.password}
                            onChange={updatedata}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block w-100">
                        Login
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>
                        <Link to="/verify-email">Forget Password</Link><br /><br />
                        Don&apos;t have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    );
}
export default Login