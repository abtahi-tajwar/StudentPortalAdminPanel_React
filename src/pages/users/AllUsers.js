import React from 'react'
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { routes, callApi } from '../../routes';
import ClipLoader from "react-spinners/ClipLoader";
import DeleteIcon from '@material-ui/icons/Delete';

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

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'uname',
          headerName: 'User Name',
          width: 150
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150
        },
        {
            field: 'banned',
            headerName: 'Ban/Unban',
            width: 150
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150
        },        
        {
            field: 'created_at',
            headerName: 'Joined At',
            render: rowData  => <p>{rowData.created_at} days ago</p>,
            width: 150
        },
        {
            field: 'created_at',
            headerName: 'Delete',
            render: rowData  => <DeleteIcon style={deleteIconStyle} id={rowData.id}/>,
            width: 150
        },
        
    ];

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
            /> }
            
        </div>
    )
}

export default AllUsers
