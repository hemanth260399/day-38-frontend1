import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resetpasswordapi } from "../api_utils/server_api.js"
import { Loader } from "./loading.jsx"

export let Resetpassword = () => {
    let [params] = useSearchParams()
    let navigate = useNavigate()
    let [loading, setloading] = useState(false)
    let [password, setpassword] = useState({ newpassword: "", confirmpassword: "" })
    let passwordchange = (e) => {
        setpassword({ ...password, [e.target.name]: e.target.value })
    }
    let resetpassword = async (e) => {
        e.preventDefault()
        try {
            e.preventDefault();
            if (password.newpassword !== password.confirmpassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                setloading(true)
                let response = await resetpasswordapi(params.get("token"), { password: password.newpassword });
                setloading(false)
                alert(response.msg)
                navigate("/login");
            } catch (e) {
                setloading(false)
                alert(e);
                console.log("Error", e);
                navigate("/login");
            }

        }
        catch (e) {
            alert(e.msg)
        }
    }
    if (loading) {
        <Loader />
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 rounded" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Reset Password</h2>
                <form onSubmit={resetpassword}>
                    <div className="form-group mb-3">
                        <label>New password</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter email"
                            name="newpassword"
                            value={password.newpassword}
                            onChange={passwordchange}
                            required
                            minLength={5}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Confirm password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter email"
                            name="confirmpassword"
                            value={password.confirmpassword}
                            onChange={passwordchange}
                            required
                            minLength={5}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block w-100">
                        Change password
                    </button>
                </form>
                <div className="mt-3 text-center">
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}