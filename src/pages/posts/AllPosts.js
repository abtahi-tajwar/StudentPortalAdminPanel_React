import React from 'react'
import { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { ClipLoader } from 'react-spinners'
import { routes, callApi, deleteReq } from '../../routes'

// import EditIcon from '@material-ui/icons/Edit';

const loaderCss = {
    width: '100px',
    height: '100px',
    margin: '0 auto',
    border: '5px solid #435EBE'
}
// const deleteIconStyle = {
//     color: 'red',
//     cursor: 'pointer'
// }

function AllPosts({ setPageName }) {

        useEffect(() => {
            setPageName("All Posts")
          }, []);

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

    function deleteItem(id) {
        let newRows = rows.filter(row => row.id !== id)
        setRows(newRows)
        deleteReq(routes.adminDeletePost(id)).then(res => console.log(res))
    }
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const columns = [
        { field: 'id', title: 'ID', width: 90 },
        {
          field: 'title',
          title: 'Title',
          width: 150
        },
        {
            field: 'date',
            title: 'Date',
            render: rowData  => <p>{rowData.created_at} days ago</p>,
            width: 150
        },
        {
            field: 'author',
            title: 'Author',
            width: 150
        }             
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
                title={'All Posts'}
                onChangePage={(e, page) =>
                    handlePagnation(page)
                }
                options= {{
                    headerStyle: {
                        fontWeight: 'bold'
                    }
                }}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => deleteItem(rowData.id)
                    },
                ]}
            /> }
            
        </div>
    )
}

export default AllPosts
