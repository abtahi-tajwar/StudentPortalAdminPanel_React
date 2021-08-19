import React from 'react'
import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
import { callApi, routes } from '../../routes';
import { Link } from 'react-router-dom';

function Roles({ setPageName }) {
    setPageName("Changle Roles")
    const [userList, setUserList] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleSearchText = (e) => {
        setSearchText(e.target.value)
        if(e.target.value !== "") {
            callApi(routes.searchUser(e.target.value)).then(response => {
                console.log(response)
                setUserList(response)
            })
        }
    }
    return (
        <div className="row">
            <div className="col-6">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search user with username..."
                    value={searchText}
                    onChange={handleSearchText}
                />
                <List component="nav" aria-label="secondary mailbox folders">
                    {userList.map(user => 
                        <Link to={`/users/user/${user.user.id}`}><ListItem button >
                            <ListItemAvatar>
                                <Avatar>
                                    <img src={user.details.image} alt={user.user.uname} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.details.name} secondary={user.user.uname} />
                        </ListItem></Link>
                    )}
                    
                </List>
            </div>
        </div>
    )
}

export default Roles
