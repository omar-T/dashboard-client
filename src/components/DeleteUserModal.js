import React, { Fragment } from 'react'

const DeleteUserModal = ({user, onDelete}) => {
    return (
        <Fragment>
            <button className='btn btn-outline-danger btn-sm mr-1 mb-1 mb-md-0' data-toggle='modal' data-target={`#deleteUser_${user._id}`}>Delete</button>
            <div className="modal fade" id={`deleteUser_${user._id}`} tabIndex="-1" role="dialog" aria-labelledby="deleteUserLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteUserLabel">WARNING</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this User ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-dismiss='modal' onClick={onDelete.bind(this, user._id)}>Delete User</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeleteUserModal;
