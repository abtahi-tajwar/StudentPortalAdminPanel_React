const base = 'http://127.0.0.1:8000'
// const authToken = "Bearer $2y$10$FlOGWK5tYonpmWcYdyBTk.V0r1x9.EuDwTMvFKKMDqZbmbyWyCEdC::1"
let authToken = ""
let type = ""
let username = ""
let Id = ""
export const setAuthToken = (token) => {
    authToken = token
}
export const setType = (t) => {
    type = t
}

export const getType = () => {
    return type;
}
export const setUname = (uname) => {
    username = uname;
}
export const getUname = () => {
    return username;
}
export const setId = (id) => {
    Id = id;
}
export const getId = () => {
    return Id;
}

export const routes = {
    login: `${base}/api/login`,
    logout: `${base}/api/logout`,
    getDashboardData: `${base}/api/admin/dashboard/data`,
    getAllUsers: `${base}/api/admin/users`,
    getUser: (id => `${base}/api/admin/users/${id}`),
    searchUser: (text => `${base}/api/users/search/${text}`),
    changeUserRole: `${base}/api/admin/users/role/edit-role`,
    getAllPosts: (page => `${base}/api/posts?page=${page}`),
    deletePost: (id => `${base}/api/posts/${id}/delete`),
    adminDeletePost: (id => `${base}/api/admin/posts/delete/${id}`),
    createPost: `${base}/api/posts/create`,
    getAllCategories: `${base}/api/categories`,
    createCategory: `${base}/api/admin/categories/create`,
    editCategory: `${base}/api/admin/categories/edit`,
    deleteCategory: (id => `${base}/api/admin/categories/delete/${id}`),
    banUser: (id =>`${base}/api/admin/users/ban/${id}`),
    unBanUser: (id =>`${base}/api/admin/users/unban/${id}`),
    toggleBanUser: (id =>`${base}/api/admin/users/toggle_ban/${id}`),
    moderatorRequests: `${base}/api/admin/moderator/request`,
    acceptModerator: (id => `${base}/api/admin/moderator/approve/${id}`),
    declineModerator: (id => `${base}/api/admin/moderator/decline/${id}`),
    getWebsiteInfo: `${base}/api/admin/website-info`,
    updateWebsiteInfo: `${base}/api/admin/update/website-info`
}

export const callApi = async (url) => {
    let data = null
    try {
        let res = await fetch(url, {
            headers: {
                "Authorization": authToken
               
            }
        })
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            data = await res.text()
        } else {
            data = await res.json()
        }
        return data
    } catch (e) {
        return e
    }    
}
export const postValue = async (url, data) => {
    let result = null
    console.log(JSON.parse(data))
    try {
        let res =  await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": authToken
            },
            body: data
        })
        
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            result = await res.text()
        } else {
            result = await res.json()
        }
        return result
    } catch (e) {
        console.log(e)
    }
}
export const postFormValue = async (url, data) => {
    let result = null
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
        
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            result = await res.text()
        } else {
            result = await res.json()
        }
        return result
    } catch (e) {
        return e
    }
}
export const deleteReq = async (url) => {
    let data = null;
    try {
        let res = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": authToken
            }
        })
        const contentType = res.headers.get("content-type");

        if(contentType.indexOf("application/json") === -1) {
            data = await res.text()
        } else {
            data = await res.json()
        }
        
        return data
    } catch (e) {
        return e
    }   
}