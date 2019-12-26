import React, { Component, Fragment } from 'react'

export default class AddTextFieldForm extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {txtId, handleAdd} = this.props;
        return (
            <Fragment>
                <button className='btn btn-outline-primary btn-sm' data-toggle="modal" data-target={`#newTextFieldModal_${txtId}`}>Add Text Field</button>
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
                                    className='text_area_field w-100' 
                                    placeholder='Write Text...'
                                    name={`newTextFieldModal_${txtId}`}
                                    onChange={this.handleChange}
                                    value={this.state[`newTextFieldModal_${txtId}`]}
                                >
                                </textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAdd.bind(this, this.state)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
