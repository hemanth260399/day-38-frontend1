import { useState } from "react"
import { emailverifyapi } from "../api_utils/server_api.js"
import { useNavigate } from "react-router-dom"
import { Loader } from "./loading.jsx"

export let Emailverify = () => {
    let [email, setemail] = useState({ email: "" })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let updateemail = (e) => {
        setemail({ [e.target.name]: e.target.value })
    }
    let saveemail = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            let response = await emailverifyapi(email)
            setloading(false)
            alert(response.msg)
            navigate("/login")
        } catch (e) {
            setloading(false)
            alert(e.message)
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 rounded" style={{ width: "400px" }}>
                    <h2 className="text-center mb-4">Forget Password</h2>
                    <form onSubmit={saveemail}>
                        <div className="form-group mb-3">
                            <label>Enter your Email for verification</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                value={email.email}
                                onChange={updateemail}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block w-100">
                            Verify-Email
                        </button>
                    </form>
                    <div className="mt-3 text-center">
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}