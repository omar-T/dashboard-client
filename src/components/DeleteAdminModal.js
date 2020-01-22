import React, { Fragment } from 'react'

const DeleteAdminModal = ({admin, onDelete}) => {
    return (
        <Fragment>
            <button className='btn btn-outline-danger btn-sm  mr-1 mb-1 mb-lg-0' data-toggle='modal' data-target={`#deleteAdmin_${admin._id}`}>Delete</button>
            <div className="modal fade" id={`deleteAdmin_${admin._id}`} tabIndex="-1" role="dialog" aria-labelledby="deleteAdminLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteAdminLabel">WARNING</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this admin ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-dismiss='modal' onClick={onDelete.bind(this, admin._id)}>Delete Admin</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeleteAdminModal;