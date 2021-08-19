import React from 'react'
import { useEffect, useState } from 'react'
import { callApi, getType, postFormValue, postValue, routes } from '../../routes'
import { CircularProgress } from '@material-ui/core'
import { Button } from '@material-ui/core'
import ConfirmationModal from '../../components/ConfirmationModal'


function User({ match, setPageName }) {
    const { id } = match.params
    const [user, setUser] = useState(undefined)
    const [changeButtonRender, setChangeButtonRender] = useState(false)
    const [confimationModal, setConfirmationModal] = useState(false)
    const [userRole, setUserRole] = useState({
        id: 0,
        type: null,
        prev_type: null
    })
    setPageName("User Roles")
    const roleSelectOptions = [
        { key: 1, value: 'admin', label: 'Admin' },
        { key: 2, value: 'moderator', label: 'Moderator' },
        { key: 3, value: 'student', label: 'Student' },
        { key: 4, value: 'instructor', label: 'Instructor' }
    ]
    const handleRoleChange = (e) => {
        setUserRole({ ...userRole, type: e.target.value })
        setChangeButtonRender(true)
    }
    const handleRoleChangeModal = (e) => {
        handleConfirmationModalOpen()
    }
    const changeRole = () => {
        postFormValue(routes.changeUserRole, userRole).then(response => () => {
            console.log(response)
        })

        handleConfirmationModalClose()
    }
    const handleConfirmationModalOpen = () => {
        setConfirmationModal(true)
    }
    const handleConfirmationModalClose = () => {
        setConfirmationModal(false)
    }
    useEffect(() => {
        if (id !== undefined) {
            callApi(routes.getUser(id)).then(response => {
                console.log(response)
                setUser(response)

            })
        }
        console.log(match)
    }, [])
    useEffect(() => {
        if (user !== undefined) {
            setUserRole({ ...userRole, id: user.user.id, prev_type: user.user.type })
        }

    }, [user])


    return (
        <div>
            {getType() === 'admin' &&

                <ConfirmationModal
                    open={confimationModal}
                    handleConfirm={changeRole}
                    handleClose={handleConfirmationModalClose}
                    title="Are you sure you want to change role of the user?"
                    message="Warning! Changing role can permit some actions actions to the specific user"
                />
            }
            {user === undefined ?
                <CircularProgress variant="determinate" value={25} /> :
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="avatar avatar-xl">
                            <img src={user.user.details.image} />
                        </div>
                        <h2 className="display-6"><b>{user.user.details.name}</b></h2>
                        <h3 className="display-6">@{user.user.uname}</h3>
                        {getType() === 'admin' &&
                            <select className="form-control mb-3" onChange={handleRoleChange}>
                                {roleSelectOptions.map(role => (role.value === user.user.type ?
                                    <option key={role.id} value={role.value} selected>{role.value}</option> :
                                    <option key={role.id} value={role.value} >{role.value}</option>)
                                )}
                            </select>
                        }
                        {changeButtonRender && <Button variant="contained" color="primary" onClick={handleRoleChangeModal}>Change</Button>}
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Latest Posts</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-lg">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Upvotes</th>
                                                <th>Views</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.posts.map(post =>
                                                <tr key={post.id}>
                                                    <td className="col-auto">
                                                        <p className=" mb-0">{post.title}</p>
                                                    </td>
                                                    <td className="col-auto">
                                                        <p className=" mb-0">{post.upvotes.length}</p>
                                                    </td>
                                                    <td className="col-auto">
                                                        <p className=" mb-0">{post.views}</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}

export default User
