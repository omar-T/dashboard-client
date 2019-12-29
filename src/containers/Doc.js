import React, { Component } from 'react'
import './Doc.css'
// import $ from 'jquery'
// import axios from 'axios'
import {connect} from 'react-redux'
import SearchData from '../components/SearchData'
import Pagination from '../components/Pagination'
import {fetchDocs} from '../store/actions/foundDocs'
import {addError, removeError} from '../store/actions/errors'

class Doc extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            loading: false,
            startSearch: false,
            ictihatDocs: '',
            mevzuatDocs: '',
            page: 1,
            type: 'ictihat'
        }
    }

    componentDidMount(){
        // const {foundDocs} = this.props;
        // console.log(foundDocs);
        // if(!!Object.keys(foundDocs).length){
        //     this.setState({
        //         ictihatDocs: foundDocs
        //     });
        // }
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
        const {search, page, type} = this.state;
        const {fetchDocs} = this.props;
        if(e.which === 13 && search !== ''){
            this.setState({
                page: 1,
                loading: true,
                startSearch: true
            });
            fetchDocs(type, search, page)
                .then(() => {
                    const {foundDocs} = this.props;
                    // console.log(foundDocs);
                    if(type === 'ictihat'){
                        this.setState({
                            ictihatDocs: foundDocs
                        });
                    }else{
                        this.setState({
                            mevzuatDocs: foundDocs,
                        });
                    }
                    this.setState({
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
        const {search, type} = this.state;
        const {fetchDocs, addError} = this.props;
        if(search !== ''){
            fetchDocs(type, search, num)
                .then(() => {
                    const {foundDocs} = this.props;
                    this.setState({
                        ictihatDocs: foundDocs,
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

    handleType = (e) => {
        const {type, search, page} = this.state;
        const {fetchDocs} = this.props;
        let typeName = e.target.name;

        if(typeName !== type){
            document.querySelector(`button[name=${type}]`).classList.remove('active');
            document.querySelector(`button[name=${typeName}]`).classList.add('active');
        }

        this.setState({
            type: typeName
        });

        if(search !== ''){
            this.setState({
                page: 1,
                loading: true,
                startSearch: true
            });
            
            fetchDocs(typeName, search, page)
                .then(() => {
                    const {foundDocs} = this.props;
                    // console.log('found docs in handle type', foundDocs);
                    if(typeName === 'ictihat'){
                        this.setState({
                            mevzuatDocs: '',
                            ictihatDocs: foundDocs
                        });
                    }else{
                        this.setState({
                            mevzuatDocs: foundDocs,
                            ictihatDocs: ''

                        });
                    }
                    this.setState({
                        loading: false,
                        startSearch: false
                    });
                })
                .catch(() => {
                    return;
                });
        }

        
    }

    render() {
        const {search, loading, startSearch, ictihatDocs, mevzuatDocs, page, type} = this.state;
        const {errors} = this.props;
        return (
            <div className='container-fluid'>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
                }
                <div className='container'>
                    <nav className='navbar navbar-light'>
                        <form className='w-100 mr-auto' onSubmit={this.handleSubmit}>
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
                        <ul className='searchType navbar-nav flex-row'>
                            <li className='nav-item mx-1'>
                                <button onClick={this.handleType} name='ictihat' className='nav-link active search-type'>Ictihat</button>
                            </li>
                            <li className='nav-item active'>
                                <span className='nav-link'>/</span>
                            </li>
                            <li className='nav-item'>
                                <button onClick={this.handleType} name='mevzuat' className='nav-link search-type'>Mevzuat</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                {(startSearch || (ictihatDocs !== '') || (mevzuatDocs !== '')) &&
                    <div>
                        <h2>Founded Docs</h2>
                        <SearchData 
                            {...this.props}
                            type={type}
                            foundDocs={type === 'ictihat' ? ictihatDocs : mevzuatDocs}
                            loading={loading}
                        />
                        
                        <Pagination 
                            numFound={type === 'ictihat' ? ictihatDocs.numFound : mevzuatDocs.numFound}
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
        foundDocs: state.foundDocs,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {fetchDocs, addError, removeError})(Doc);