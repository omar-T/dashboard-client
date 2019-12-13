import React, { Component } from 'react'
import './Doc.css'
// import $ from 'jquery'
// import axios from 'axios'
import {connect} from 'react-redux'
import SearchData from './SearchData'
import Pagination from './Pagination'
import {fetchDocs} from '../store/actions/ictihatDocs'

class Doc extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: localStorage.searchData || '',
            loading: false,
            startSearch: false,
            ictihatDocs: '',
            page: 1
        }
    }

    componentDidMount(){
        const {ictihatDocs} = this.props;
        if(!!Object.keys(ictihatDocs).length){
            this.setState({
                ictihatDocs
            });
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
        if(e.which === 13 && this.state.search !== ''){
            this.setState({
                loading: true,
                startSearch: true
            });
            this.props.fetchDocs(search, page)
                .then(() => {
                    console.log(this.props.ictihatDocs);
                    this.setState({
                        ictihatDocs: this.props.ictihatDocs,
                        loading: false,
                    });
                })
                .catch(() => {
                    return;
                });
        }
    }

    handleClickedPage = (num) => {
        const {search} = this.state;
        console.log(search, num);
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
        const {search, loading, startSearch, ictihatDocs, page} = this.state;
        return (
            <div className='container-fluid'>
                <div className='container'>
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
        ictihatDocs: state.ictihatDocs
    }
}

export default connect(mapStateToProps, {fetchDocs})(Doc);