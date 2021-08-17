import React from 'react'
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { routes, callApi, deleteReq, postFormValue } from '../../routes';
import ClipLoader from "react-spinners/ClipLoader";
import { Delete,Edit } from '@material-ui/icons';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Button } from '@material-ui/core';
import { Button as BootstrapButton } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


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
    const [categoryEditAction, setCategoryEditAction] = useState({
        editMode: false,
        payload: {
            name: "",
            id: ""
        }
    });

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
    const editCategory = (id, name) => {
        //handleEditCategoryModalOpen();
        setCategoryEditAction({
            editMode: true,
            payload: {
                id: id,
                name: name                
            }
        })
        
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
    const handleEditCategoryModalClose = () => {
        setCategoryEditAction({ ...categoryEditAction, editMode: false })
    }
    const handleEditCategoryModalOpen = () => {
        setCategoryEditAction({ ...categoryEditAction, editMode: true })
    }
    const handleCategoryEdit = (e) => {
        setCategoryEditAction({
            ...categoryEditAction,
            payload: {
                ...categoryEditAction.payload,
                name: e.target.value
            }
        })
    }
    const confirmCategoryEdit = () => {
        postFormValue(routes.editCategory, {
            id: categoryEditAction.payload.id,
            name: categoryEditAction.payload.name
        }).then(result => console.log(result))

        const newRows = rows.map(row => {
            if(row.id === categoryEditAction.payload.id) {
                return { ...row, id: categoryEditAction.payload.id, name: categoryEditAction.payload.name }
            }
            return { ...row }
        })
        setRows(newRows)
        handleEditCategoryModalClose()
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
        })
    }, [])
    useEffect(() => {
        console.log(categoryEditAction)
    })
    
    return (
        <div>
            <ConfirmationModal 
                open={modalOpen} 
                handleConfirm={() => deleteCategory(currentDeleteCategoryId)}
                handleClose={handleModalClose}
                title="Deleting Category"
                message="Are you sure you want to delete this category?"
            />
            <Modal show={categoryEditAction.editMode} onHide={handleEditCategoryModalClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text"
                        value={categoryEditAction.payload.name} 
                        onChange={handleCategoryEdit}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <BootstrapButton variant="secondary" onClick={confirmCategoryEdit}>
                        Confirm
                    </BootstrapButton>
                    <BootstrapButton variant="primary" onClick={handleEditCategoryModalClose}>
                        Cancel
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
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
                        onClick: (event, rowData) => editCategory(rowData.id, rowData.name)
                    }
                ]}
            /> }
            
        </div>
    )
}

export default AllCategories
