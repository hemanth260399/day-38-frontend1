/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom"
import { short } from "../api_utils/server_api"
import { useEffect, useState } from "react"
import { Loader } from "./loading"

export let Short = () => {
    let [params] = useSearchParams()
    let [loading, setloading] = useState(false)
    let redirectpage = async () => {
        try {
            let response = await short(params.get("url"))
            location.replace(response.data[0])
            setloading(false)
        }
        catch (e) {
            alert(e)
        }
    }
    useEffect(() => {
        setloading(true)
        redirectpage()
    }, [])
    return (
        <>
            {loading && <Loader />}</>
    )
}