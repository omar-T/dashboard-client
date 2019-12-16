import React, { Component } from 'react'
import './Doc.css'
// import $ from 'jquery'
// import axios from 'axios'
import {connect} from 'react-redux'
import SearchData from './SearchData'
import Pagination from './Pagination'
import {fetchDocs} from '../store/actions/ictihatDocs'
import {addError, removeError} from '../store/actions/errors'

class Doc extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            loading: false,
            startSearch: false,
            ictihatDocs: '',
            page: 1
        }
    }

    componentDidMount(){
        const {ictihatDocs} = this.props;
        console.log(ictihatDocs);
        if(!!Object.keys(ictihatDocs).length){
            this.setState({
                ictihatDocs
            });
        }
        // if(this.props.errors.message){
        //     setTimeout(() => {
        //         this.props.removeError()
        //     }, 4000);
        // }
    }

    componentDidUpdate(){
        if(this.props.errors.message){
            setTimeout(() => {
                this.props.removeError()
            }, 4000);
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleKeyPress = (e) => {
        const {search, page} = this.state;
        const {fetchDocs} = this.props;
        if(e.which === 13 && search !== ''){
            this.setState({
                page: 1,
                loading: true,
                startSearch: true
            });
            fetchDocs(search, page)
                .then(() => {
                    const {ictihatDocs} = this.props;
                    this.setState({
                        ictihatDocs,
                        loading: false,
                        startSearch: false
                    });
                })
                .catch(() => {
                    return;
                });
        }
    }

    handleClickedPage = (num) => {
        const {search} = this.state;
        const {fetchDocs, addError} = this.props;
        if(search !== ''){
            fetchDocs(search, num)
                .then(() => {
                    const {ictihatDocs} = this.props;
                    this.setState({
                        ictihatDocs,
                        page: num
                    })
                })
                .catch(() => {
                    return;
                });
        }else{
            addError('Please Fill The Search Field !');
        }
    }

    render() {
        const {search, loading, startSearch, ictihatDocs, page} = this.state;
        const {errors} = this.props;
        return (
            <div className='container-fluid'>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
                }
                <div className='container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='input-group-prepend mb-3'>
                            <span className='input-group-text'>
                                <i className="fas fa-search"></i>
                            </span>
                            <input
                                className='form-control'
                                id='search'
                                type='text'
                                placeholder='Search...'
                                name='search'
                                required
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                value={search}
                            />
                        </div>
                    </form>
                </div>
                {(startSearch || (ictihatDocs !== '')) &&
                    <div>
                        <h2>Founded Docs</h2>
                        <SearchData 
                            {...this.props}
                            ictihatDocs={ictihatDocs}
                            loading={loading}
                        />
                        
                        <Pagination 
                            numFound={ictihatDocs.numFound}
                            page={page}
                            handleClickedPage={this.handleClickedPage}
                        />
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ictihatDocs: state.ictihatDocs,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {fetchDocs, addError, removeError})(Doc);