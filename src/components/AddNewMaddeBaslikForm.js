import React, { Component, Fragment } from 'react'

export default class AddNewMaddeBaslikForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            madde_baslik: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {txtId, handleAdd} = this.props;
        const {madde_baslik} = this.state;
        return (
            <Fragment>
                <button className='btn btn-outline-primary btn-sm ml-1' data-toggle="modal" data-target={`#newMaddeBaslikModal_${txtId}`}>Add Madde Baslik</button>
                <div className="modal fade" id={`newMaddeBaslikModal_${txtId}`} tabIndex="-1" role="dialog" aria-labelledby={`newMaddeBaslikModal_${txtId}`} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`newMaddeBaslikModal_${txtId}`}>Add New Madde Baslik:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input 
                                    className='form-control' 
                                    type='text'
                                    placeholder='Write Madde baslik...'
                                    name='madde_baslik'
                                    onChange={this.handleChange}
                                    value={madde_baslik}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleAdd.bind(this, madde_baslik, txtId)}>Add Madde Baslik</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
