import React from 'react'
import axios from 'axios'
const Axiosinstance = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
export default Axiosinstance