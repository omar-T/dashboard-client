import React, { Component } from 'react'
import './Doc.css'
// import $ from 'jquery'
// import axios from 'axios'
import {connect} from 'react-redux'
import SearchData from './SearchData'
import Pagination from './Pagination'
import {fetchDocs} from '../store/actions/docs'

class Doc extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            startSearch: false,
            loading: false,
            ictihatDocs: '',
            page: 1
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleKeyPress = (e) => {
        this.setState({
            page: 1
        });
        const {search, page} = this.state;
        if(e.which === 13){
            if(this.state.search !== ''){
                this.setState({
                    startSearch: true,
                    loading: true
                });
                this.props.fetchDocs(search, page)
                    .then(() => {
                        console.log(this.props.ictihatDocs);
                        this.setState({
                            ictihatDocs: this.props.ictihatDocs,
                            loading: false
                        });
                    })
                    .catch(() => {
                        return;
                    });
            }
        }
    }

    handleClickedPage = (num) => {
        const {search} = this.state;
        this.props.fetchDocs(search, num)
            .then(() => {
                console.log(this.props.ictihatDocs);
                this.setState({
                    ictihatDocs: this.props.ictihatDocs,
                    page: num
                })
            })
            .catch(() => {
                return;
            });
    }

    render() {
        const {search, startSearch, loading, ictihatDocs, page} = this.state;
        return (
            <div className='container-fluid'>
                <div className='container'>
                    <div className='input-group-prepend mb-3'>
                        <span className='input-group-text email'>
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
                </div>
                {startSearch && 
                    <div>
                        <h2>Founded Docs</h2>
                        <SearchData 
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
        ictihatDocs: state.ictihatDocs
    }
}

export default connect(mapStateToProps, {fetchDocs})(Doc);