import { useState } from "react"
import { dashboardapi } from "../api_utils/server_api"
import "./Dashboard.css"
import { Link } from "react-router-dom"

let Dashcomponent = ({ title, value }) => {
    return (
        <>
            <h4 className="text-light">{title}</h4>
            <h1 className="bg-light rounded-pill mt-5" style={{ height: 250, paddingTop: 95, border: "10px solid darkblue" }}>{value ? value : 0}</h1>
        </>
    )
}
export let Dashboard = () => {
    const months = [
        { value: 'Jan', label: 'Jan' },
        { value: 'Feb', label: 'Feb' },
        { value: 'Mar', label: 'Mar' },
        { value: 'Apr', label: 'Apr' },
        { value: 'May', label: 'May' },
        { value: 'Jun', label: 'Jun' },
        { value: 'Jul', label: 'Jul' },
        { value: 'Aug', label: 'Aug' },
        { value: 'Sept', label: 'Sept' },
        { value: 'Oct', label: 'Oct' },
        { value: 'Nov', label: 'Nov' },
        { value: 'Dec', label: 'Dec' },
    ];
    let [totalstate, settotalstate] = useState([{ avgurl: 0, countpermonth: 0 }])
    const dashboardurl = async (e) => {
        try {
            e.preventDefault();
            let data = await dashboardapi({ data: e.target.value })
            let { avgurl, countpermonth } = data.result
            settotalstate({ avgurl, countpermonth })
        } catch (e) {
            alert('Error: ' + e.message)
        }
    }
    return (
        <>
            {console.log(totalstate)}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 className="text-center text-danger">Dashboard</h1>
                <Link to="/urlshortner" className="text-info " style={{ padding: "10px 25px" }}>URL SHORTNER</Link>
                <Link to="/urlhistroy" className="text-info " style={{ padding: "10px 15px" }}>HISTORY</Link>
            </div>
            <div style={{ margin: '20px 0', textAlign: "center" }}>
                <label htmlFor="month-dropdown" value={"Jan"} className="text-light">Select Month:</label>
                <select
                    id="month-dropdown"
                    onChange={dashboardurl}
                    style={{ marginLeft: '10px', padding: '5px' }}
                >
                    {months.map((month, index) => (
                        <option key={index}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="text-center mt-5 p-5" style={{ display: 'flex', justifyContent: "space-around" }}>
                <div >
                    <Dashcomponent title={"Average URL PER DAY"} value={totalstate.avgurl} />
                </div>
                <div >
                    <Dashcomponent title={"Total URL in the month"} value={totalstate.countpermonth} />
                </div>
            </div>
        </>
    )
}