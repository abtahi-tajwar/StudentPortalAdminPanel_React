const base = 'http://127.0.0.1:8000'
const authToken = "Bearer $2y$10$rAEvW1kx5sqzASSBxZ6UL.Id5STui1lm9uiGRRBN7RUDWjd16kuaC::1"

export const routes = {
    getDashboardData: `${base}/api/admin/dashboard/data`,
    getAllUsers: `${base}/api/admin/users`,
    getAllPosts: (page => `${base}/api/posts?page=${page}`),
    createPost: `${base}/api/posts/create`,
    getAllCategories: `${base}/api/categories`
}

export const callApi = async (url) => {
    try {
        let res = await fetch(url, {
            headers: {
                "Authorization": authToken
            }
        })
        let data = await res.json()
        return data
    } catch (e) {
        return e
    }    
}
export const postValue = async (url, data) => {
    try {
        let res =  await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": authToken
            },
            body: data
        })
        let result = await res.json()
        return result
    } catch (e) {
        console.log(e)
    }
}
export const postFormValue = async (url, data) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value)
    }

    try {
        let res =  await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": authToken
            },
            body: formData
        })
        let result = await res.json()
        return result
    } catch (e) {
        return e
    }
}