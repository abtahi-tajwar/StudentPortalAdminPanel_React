import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ConfirmationModal({ open, handleConfirm, handleClose, title, message }) {
    
    return (
        <Modal show={open} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleConfirm}>
                Confirm
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Cancel
            </Button>
            </Modal.Footer>
        </Modal>
    )
}


export default ConfirmationModal
