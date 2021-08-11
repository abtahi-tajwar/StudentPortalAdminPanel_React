import { useState } from "react"

const base = 'http://127.0.0.1:8000'
const authToken = "Bearer $2y$10$NpJZT0Q/wtgRWyPAQ/gYcu1hWH8/3Xh8GXt29EZMerwBA9QvxBL9e::1"

export const routes = {
    getDashboardData: `${base}/api/admin/dashboard/data`
}

export const callApi = async (url) => {
    try {
        let res = await fetch(url, {
            headers: {
                "Authorization": authToken
            }
        })
        console.log(res)
        let data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
    
}