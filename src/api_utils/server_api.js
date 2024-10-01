import axios from "axios"

let url = import.meta.env.VITE_BE_URL
export let adduserapi = async (userdata) => {
    try {
        let response = await axios.post(`${url}/register`, userdata)
        return response.data
    } catch (err) {
        return err.response.data
    }
}
export let registerverifyemail = async (token) => {
    try {
        let response = await axios.post(`${url}/register-verify-email?token=${token}`)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let loginuserapi = async (userdata) => {
    try {
        let response = await axios.post(`${url}/login`, userdata)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let emailverifyapi = async (useremail) => {
    try {
        let response = await axios.post(`${url}/verify-email`, useremail)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let resetpasswordapi = async (token, resetpassword) => {
    try {
        let response = await axios.post(`${url}/reset-password?token=${token}`, resetpassword)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error(err.response.data.msg)
    }
}
export let urlshortner = async (data) => {
    try {
        let response = await axios.post(`${url}/urlshortner`, data)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error(err.response.data.msg)
    }
}
export let short = async (data) => {
    try {
        let response = await axios.post(`${url}/short?url=${data}`)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error(err.response.data.msg)
    }
}
export let urlhistory = async () => {
    try {
        let response = await axios.get(`${url}/history`)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error(err.response.data.msg)
    }
}
export let dashboardapi = async (data) => {
    try {
        let response = await axios.post(`${url}/dashboard`, data)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error(err.response.data.msg)
    }
}