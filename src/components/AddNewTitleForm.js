import React, { Component, Fragment } from 'react'

export default class AddNewTitleForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
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
        const {title} = this.state;
        handleAdd(title, type);
        this.setState({
            title: ''
        });
    }

    render() {
        const {title} = this.state;
        const {buttonTitle} = this.props;

        return (
            <Fragment>
                <div className='col-6'>
                    <label htmlFor='title'>
                        {buttonTitle}:
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        required
                        placeholder='Title...'
                        id='title'
                        name='title'
                        value={title}
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
