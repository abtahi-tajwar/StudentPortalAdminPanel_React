import React from 'react'
import { useEffect, useState } from 'react'
import { routes, callApi } from '../../routes'

function ViewPost({ match, setPageName }) {

    setPageName("View Post")
    const { id } = match.params
    const [post, setPost] = useState({})
    useEffect(() => {
        callApi(routes.getPost(id)).then(response => {
            setPost(response)
        })
    }, [])
    return (
        <div>
            <h2 className="display-3">{post.post.title}</h2>
            <p>{post.post.pbody}</p>
            <p><i class="bi bi-eye"></i> {post.post.views}</p>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover table-lg">
                        <thead>
                            <tr>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.comments.map(com =>
                                <tr key={com.id}>
                                    <td className="col-auto">
                                        <p className=" mb-0">{com.ctext}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewPost
