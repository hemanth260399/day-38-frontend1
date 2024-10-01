import { useEffect, useState } from "react"
import { urlhistory } from "../api_utils/server_api"
import { Link } from "react-router-dom"

export let Urlhistroy = () => {
    let [urldata, seturldata] = useState([])
    const fetchingurl = async () => {
        let data = await urlhistory()
        let urldata = Object.values(data.data)
        seturldata(urldata)
    }
    useEffect(() => {
        fetchingurl()
    }, [])
    return (
        <>
            {console.log(urldata)}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 className="text-center mb-5 text-light">URLSHORTNER HISTORY</h2>
                <Link to="/urlshortner" className="text-info " style={{ margin: 10 }}>URL SHORTNER</Link>
                <Link to="/dashboard" className="text-info " style={{ margin: 10 }}>Dashboard</Link>
            </div>
            <div>
                {urldata.map((data, index) => (
                    <div key={index}>
                        <div className="bg-secondary text-dark p-3 rounded">
                            <div className="card rounded-pill" >
                                <div className="container" >
                                    <div className="row row-cols-sm-2 text-center align-items-center " >
                                        <div className="col-md-1 m-1  align-items-stretch">{index + 1}</div>
                                        <div className="col-md-1 m-1 p-0  align-items-stretch">{data.date}</div>
                                        <div className="col-md-5 m-0 align-items-stretch">{data.longurl}</div>
                                        <div className="col-md-4 m-0 align-items-stretch">{data.shorturl}</div>
                                    </div>
                                </div>
                            </div><br />
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}