import React from 'react'
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { routes, callApi } from '../../routes';
import ClipLoader from "react-spinners/ClipLoader";
import { Switch, Chip } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Redirect, Link } from 'react-router-dom';


const loaderCss = {
    width: '100px',
    height: '100px',
    margin: '0 auto',
    border: '5px solid #435EBE'
}
const deleteIconStyle = {
    color: 'red',
    cursor: 'pointer'
}

function AllUsers({ setPageName }) {
    function calculateDaysBetweenDates(date1) {
        var oneDay = 24 * 60 * 60 * 1000;
        var date1InMillis = date1.getTime();
        var date2InMillis = Date.now();
        var days = Math.round(Math.abs(date2InMillis - date1InMillis) / oneDay);
        return days;
      }
    
    const toggleBanUser = (id) => {
        const newRows = rows.map(row => {
            if(row.id === id) {
                if(row.banned === 0) {
                    return { ...row, banned: 1 }
                } else {
                    return { ...row, banned: 0 }
                }
                
            } else {
                return { ...row }
            }
        })
        callApi(routes.toggleBanUser(id)).then(response => console.log(response))
        setRows(newRows)
    }
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const columns = [
        { field: 'id', title: 'ID', width: 90 },
        {
          field: 'uname',
          title: 'User Name',
          width: 150
        },
        {
            field: 'type',
            title: 'Type',
            width: 150
        },
        {
            field: 'banned',
            title: 'Ban/Unban',
            render: rowData => <Switch size="small" checked={rowData.banned} onChange={() => toggleBanUser(rowData.id)} />
        },
        {
            field: 'status',
            title: 'Status',
            render: rowData => { return (rowData.status === 1 ? <Chip size="small" label="Active" color="primary"/> : <Chip size="small" label="Deactive" color="secondary"/>) },
            width: 150
        },        
        {
            field: 'created_at',
            title: 'Joined At',
            render: rowData  => <p>{rowData.created_at} days ago</p>,
            width: 150
        },
        
    ];

    const handleViewUser = (id) => {
        return <Redirect to={`/users/role/${id}`} />
    }
    useEffect(() => {
        setPageName("All Users");
        callApi(routes.getAllUsers)
        .then((data) => {
            let result = []
            data.forEach(item => {
                result.push({
                    id: item.id,
                    uname: item.uname,
                    type: item.type,
                    banned: item.banned,
                    status: item.status,
                    created_at: calculateDaysBetweenDates(new Date(item.created_at))
                })
            })
            setRows(result)
            setLoading(false)
            console.log(result, rows)
        })
    }, [])
    
    return (
        <div>
            {loading ? 
            <ClipLoader 
                css={loaderCss}
                size={50} 
                loading={loading} 
                size={150} 
            /> :
            <MaterialTable 
                data={rows}
                columns={columns}
                isEditable={true}
                pageSize={10}
                title={'All users'}
                actions={[
                    rowData => ({
                        icon: () => <Link to={`/users/user/${rowData.id}`}><VisibilityIcon color="primary" /></Link>,
                        tooltip: "View",
                        onClick: (event, rowData) => handleViewUser(rowData.id)
                    })
                ]}
            /> }
            
        </div>
    )
}

export default AllUsers
