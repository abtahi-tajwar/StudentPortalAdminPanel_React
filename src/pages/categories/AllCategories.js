import React from 'react'
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { routes, callApi, deleteReq, postFormValue } from '../../routes';
import ClipLoader from "react-spinners/ClipLoader";
import { Delete,Edit } from '@material-ui/icons';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Button } from '@material-ui/core';


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

function AllCategories({ setPageName }) {


    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentDeleteCategoryId, setCurrentDeleteCategoryId] = useState(0);
    const [newCategory, setNewCategory] = useState('');

    function calculateDaysBetweenDates(date1) {
        var oneDay = 24 * 60 * 60 * 1000;
        var date1InMillis = date1.getTime();
        var date2InMillis = Date.now();
        var days = Math.round(Math.abs(date2InMillis - date1InMillis) / oneDay);
        return days;
      }
    
    
    const handleInput = (e) => {
        setNewCategory(e.target.value)
    }
    const handleAddCategory = () => {
        postFormValue(routes.createCategory, {
            name: newCategory
        }).then(result => {
            console.log(result)
            const newRow = [ ...rows, {
                id: result.id,
                name: result.name,
                active_posts: 0
            }]
            setRows(newRow)
        })
        
        
    }
    const handleDeleteCategory = (id) => {
        handleModalOpen();
        setCurrentDeleteCategoryId(id);                        
    }
    const deleteCategory = (id) => {
        let newRows = rows.filter(row => row.id !== id)
        deleteReq(routes.deleteCategory(id)).then(resposne=>console.log(resposne))
        setRows(newRows)
        setModalOpen(false)
    }
    const editCategory = (id) => {
        console.log('edit category'+id);
    }
    const columns = [
        { field: 'id', title: 'ID', width: 90 },
        {
          field: 'name',
          title: 'Category Name',
          width: 150
        },
        {
            field: 'active_posts',
            title: 'Active Posts',
            width: 150
        }
        
    ];
    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }
    useEffect(() => {
        setPageName("All Categories");
        callApi(routes.getAllCategories)
        .then((data) => {
            let result = []
            data.forEach(item => {
                result.push({
                    id: item.id,
                    name: item.name,
                    active_posts: item.posts.length
                })
            })
            setRows(result)
            setLoading(false)
            console.log(result, rows)
        })
    }, [])
    
    return (
        <div>
            <ConfirmationModal 
                open={modalOpen} 
                handleConfirm={() => deleteCategory(currentDeleteCategoryId)}
                handleClose={handleModalClose}
                title="Deleting Category"
                message="Are you sure you want to delete this category?"
            />
            <div className="col-7 mb-3">
                <div className="row">                    
                    <input type="text" className="form-control" className="col-8" value={newCategory} onChange={handleInput}/>
                    <Button color="primary" className="col-4" onClick={handleAddCategory}>Add New Category +</Button>
                </div>
            </div>
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
                options= {{
                    pageSize: 10,
                    pageSizeOptions: [5, 10, 20]
                }}                
                title={'All Categories'}
                actions={[
                    {
                        icon: () => <Delete color="secondary" />,
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDeleteCategory(rowData.id)
                    },
                    {
                        icon: () => <Edit color="primary" />,
                        tooltip: 'Edit',
                        onclick: (event, rowData) => editCategory(rowData.id)
                    }
                ]}
            /> }
            
        </div>
    )
}

export default AllCategories
