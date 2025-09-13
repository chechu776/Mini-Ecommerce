import React from 'react'
import axios from 'axios'
const Axiosinstance = axios.create({
    baseURL:"http://16.171.28.234/api",
    withCredentials:true
})
export default Axiosinstance