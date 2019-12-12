import React, { Component } from 'react'
import './Doc.css'
// import $ from 'jquery'
// import {apiCall} from '../services/api'
import axios from 'axios'
import SearchData from './SearchData'
import Pagination from './Pagination'

export default class Doc extends Component {
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

    handleKeyPress = async (e) => {
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
                const res = await axios.get(`https://aislaw-dev2.herokuapp.com/search/ictihat?query=${search}&page=${page}`);
                this.setState({
                    ictihatDocs: res.data,
                    loading: false
                });
                console.log(search);
                console.log(res.data);
            }
        }
    }

    handleClickedPage = async (num) => {
        console.log(num);
        const {search} = this.state;
        const res = await axios.get(`https://aislaw-dev2.herokuapp.com/search/ictihat?query=${search}&page=${num}`);
        console.log(res.data);
        this.setState({
            ictihatDocs: res.data,
            page: num
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
