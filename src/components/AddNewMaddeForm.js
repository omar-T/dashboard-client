import React, { Component, Fragment } from 'react'

export default class AddNewMaddeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            maddeNumber: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAddClick = (e) => {
        e.preventDefault();
        const {type, handleAdd} = this.props;
        const {maddeNumber} = this.state;
        handleAdd(maddeNumber, type);
        this.setState({
            maddeNumber: ''
        });
    }

    render() {
        const {maddeNumber} = this.state;
        const {buttonTitle} = this.props;

        return (
            <Fragment>
                <div className='col-6'>
                    <label htmlFor='maddeNumber'>
                        Madde Number:
                    </label>
                    <input
                        className='form-control'
                        type='number'
                        required
                        placeholder='Number...'
                        id='maddeNumber'
                        name='maddeNumber'
                        value={maddeNumber}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='col-6 my-3'>
                    <button className='btn btn-success' onClick={this.handleAddClick}>{`Add New ${buttonTitle}`}</button>
                </div>
            </Fragment>
        )
    }
}
