import React, { Component, Fragment } from 'react'

export default class AddTextFieldForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            newTextField: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {txtId, index, handleAdd} = this.props;
        const {newTextField} = this.state;
        return (
            <Fragment>
                <button className='btn btn-outline-primary btn-sm ml-1' data-toggle="modal" data-target={`#newTextFieldModal_${txtId}`}>Add Text Field</button>
                <div className="modal fade" id={`newTextFieldModal_${txtId}`} tabIndex="-1" role="dialog" aria-labelledby={`newTextFieldModal_${txtId}`} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`newTextFieldModal_${txtId}`}>Add New Text:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <textarea 
                                    className='text_area_field form-control p-2 ' 
                                    placeholder='Write Text...'
                                    name={`newTextField`}
                                    onChange={this.handleChange}
                                    value={newTextField}
                                >
                                </textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleAdd.bind(this, newTextField, txtId, index)}>Add Text</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
