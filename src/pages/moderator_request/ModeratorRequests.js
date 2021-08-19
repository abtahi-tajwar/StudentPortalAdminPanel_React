import React from 'react'
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { routes, callApi, deleteReq, postFormValue } from '../../routes';
import ClipLoader from "react-spinners/ClipLoader";
import { Delete,Edit } from '@material-ui/icons';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';

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

function ModeratorRequests({ setPageName }) {


    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentModeratorAction, setCurrentModeratorAction] = useState(0);
    const [newCategory, setNewCategory] = useState('');

    function calculateDaysBetweenDates(date1) {
        var oneDay = 24 * 60 * 60 * 1000;
        var date1InMillis = date1.getTime();
        var date2InMillis = Date.now();
        var days = Math.round(Math.abs(date2InMillis - date1InMillis) / oneDay);
        return days;
      }
    
    const handleApprove = (id) => {        
        setCurrentModeratorAction({
            id: id,
            action: 'APPROVE'
        })   
        handleModalOpen();                     
    }
    const handleDecline = (id) => {
        handleModalOpen();
        setCurrentModeratorAction({
            id: id,
            action: 'DECLINE'
        })                        
    }
    const confirmModeratorAction = () => {
        console.log(currentModeratorAction)
        if(currentModeratorAction.action === 'APPROVE') {
            callApi(routes.acceptModerator(currentModeratorAction.id)).then(response => console.log(response))
        } else if (currentModeratorAction.action === 'DECLINE') {
            callApi(routes.declineModerator(currentModeratorAction.id)).then(response => console.log(response))
        }
        setRows(rows.filter(row => row.id !== currentModeratorAction.id))
        handleModalClose()
    }
    const columns = [
        { field: 'id', title: 'ID', width: 90 },
        {
            field: 'uname',
            title: 'Username',
            width: 150
        },
        {
            field: 'joined_at',
            title: 'Joined At',
            render: rowData  => <p>{rowData.joined_at} days ago</p>,
            width: 150
        },
        {
            field: 'approve_decline',
            title: 'Approve/Decline',
            render: (rowData) => 
                <div><button 
                    className="btn btn-primary p-2"
                    onClick={() => handleApprove(rowData.id)}
                >Approve</button>&nbsp;&nbsp;
                <button 
                    className="btn btn-danger p-2"
                    onClick={() => handleDecline(rowData.id)}
                >Decline</button></div>
        }
        
    ];
    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }
    useEffect(() => {
        setPageName("Moderator Requests");
        callApi(routes.moderatorRequests).then(response => {
            let newRows = []
            response.forEach(item => {
                newRows.push({
                    id: item.id,
                    uname: item.uname,
                    joined_at: calculateDaysBetweenDates(new Date(item.created_at))
                })
            })
            setRows(newRows)
            setLoading(false)
        })
    }, [])
    // useEffect(() => {
    //     console.log(rows)
    // })
    return (
        <div>
            <ConfirmationModal 
                open={modalOpen} 
                handleConfirm={confirmModeratorAction}
                handleClose={handleModalClose}
                title="Accept Moderator"
                message="Are you sure you want to Accpet this Moderator?"
            />
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
                title={'All Moderator Request'}
                actions={[
                    rowData => ({
                        icon: () => <Link to={`/users/user/${rowData.id}`}><VisibilityIcon color="primary" /></Link>,
                        tooltip: "View"
                    })
                ]}
            /> }
            
        </div>
    )
}

export default ModeratorRequests
