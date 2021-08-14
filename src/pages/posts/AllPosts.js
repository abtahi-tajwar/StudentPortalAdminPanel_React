import React from 'react'
import { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { ClipLoader } from 'react-spinners'
import { routes, callApi } from '../../routes'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

function AllPosts({ setPageName }) {

    setPageName("All Posts")

    function handlePagnation(props) {
        console.log(props)
    }

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
          field: 'title',
          headerName: 'Title',
          width: 150
        },
        {
            field: 'date',
            headerName: 'Date',
            render: rowData  => <p>{rowData.created_at} days ago</p>,
            width: 150
        },
        {
            field: 'author',
            headerName: 'Author',
            width: 150
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 10,
            render: rowData => <div>
                <button id={rowData.id} className="btn btn-primary"><EditIcon /></button>
                &nbsp;
                <button id={rowData.id} className="btn btn-danger"><DeleteIcon /></button>
            </div>
        },                
    ];

    useEffect(() => {
        setPageName("All Users");
        callApi(routes.getAllPosts(1))
        .then((data) => {
            let result = []
            data.data.forEach(item => {
                result.push({
                    id: item.id,
                    title: item.title,
                    date: calculateDaysBetweenDates(new Date(item.created_at)),
                    author: item.user.uname,
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
                pageSize={2}
                title={'All users'}
                onChangePage={(e, page) =>
                    handlePagnation(page)
                }
            /> }
            
        </div>
    )
}

export default AllPosts
