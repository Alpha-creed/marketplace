import axios from 'axios'

export const axiosInstance=axios.create({
    headers:{
        authorization:`Beaer ${localStorage.getItem("token")}`
    }
})