import { useState } from "react";
import { urlshortner } from "../api_utils/server_api";
import { Loader } from "./loading";
import { Link, useNavigate } from "react-router-dom";

export let Urlshortner = () => {
    // const navigate = useNavigate();
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let [url, seturl] = useState({
        longurl: "",
        shorturl: ""
    })
    let [shorturl, setshorturl] = useState("")
    let urlchange = (e) => {
        seturl({ ...url, [e.target.name]: e.target.value })
    }
    let resetbutton = () => {
        seturl({
            longurl: "",
            shorturl: ""
        })
        setshorturl("")
    }
    let saveurl = async (e) => {
        e.preventDefault()
        setloading(true)
        let response = await urlshortner({ longurl: url.longurl })
        setshorturl(response.data)
        setloading(false)
        if (response) {
            seturl({
                ...url,
                shorturl: response.shorturl
            })
            alert(response.msg)
        } else {
            alert("Failed to shorten URL!")
        }
    }
    let logout = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 rounded" style={{ width: "600px", position: "relative" }}>
                    <div className="d-flex justify-content-center " style={{ position: "absolute", right: 0, top: 0 }}>
                        <button type="submit" className="btn btn-primary btn-block mx-auto " onClick={logout}>
                            LOGOUT
                        </button>
                    </div>
                    <h2 className="text-center mb-4">SHORT YOUR URL HERE</h2>
                    <form onSubmit={saveurl}>
                        <div className="form-group mb-3">
                            <label>LONG URL</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Longurl"
                                name="longurl"
                                value={url.longurl}
                                onChange={urlchange}
                                required
                                minLength={5}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>SHORT URL</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Shorturl"
                                name="shorturl"
                                value={shorturl}
                                minLength={5}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block w-50">
                            SHORT THE URL
                        </button>
                        <button type="submit" className="btn btn-primary btn-block " style={{ marginLeft: 10 }} onClick={resetbutton}>
                            RESET
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <Link to="/dashboard" style={{ marginRight: 20 }}>DASHBOARD</Link>
                        <Link to="/urlhistroy">HISTROY</Link>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}