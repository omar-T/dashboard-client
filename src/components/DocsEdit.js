import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
// import {getDoc} from '../store/actions/ictihatDocs'
import {apiCall} from '../services/api'
import axios from 'axios'
import Autocomplete from './Autocomplete'
import mevzuatArr from '../mevzuatArr.json'

class DocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: '',
            editable: true,
            ictihatEntries: ['omar', 'laith', 'emad'],
            mevDocId: '',
            mevDocEntries: ['omar', 'laith']
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        const {doc, type} = this.props.location.state;
        console.log(doc, type);
        if(type === 'ictihat'){
            console.log(docId);

            apiCall('get', `https://relation-adalethanim.herokuapp.com/relation/ictihat/${docId}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
            let res = axios.get(`https://relation-adalethanim.herokuapp.com/relation/ictihat/${docId}`);
            console.log(res);

            this.setState({
                head: doc.baslik,
                text: doc.text.split("\n").join('</br></br>')
            });
        }else{
            this.setState({
                head: doc.mevzuat_name,
                text: doc.ozet.split("\n").join('</br></br>')
            });
        }
        // apiCall('get', ``)
    }

    handleClick = (mevDocId) => {
        console.log(mevDocId);
        this.setState({
            mevDocId
        });
    }

    render() {
        const {head, text, editable, mevDocId, mevDocEntries} = this.state;
        const mevDocOptions = mevDocEntries.map((entry,index) => {
            return <option key={index} value={index}>{entry}</option>
        });
        return (
            <div className='container-fluid bg-white'>
                <div className='row py-3'>
                    <div className='col-4'>
                        <h4>Relations:</h4>
                        <ul>
                            <li>
                                omar
                            </li>
                            <li>
                                laith
                            </li>
                            <li>
                                emad
                            </li>
                        </ul>
                    </div>
                </div>
      
                <button className='btn btn-success btn-sm mb-2' data-toggle="collapse" data-target="#collapseAddRelation" aria-expanded="false" aria-controls="collapseAddRelation">Add New Relation</button>
      
                        
                <div className='collapse border-left border-success' id='collapseAddRelation'>
                    <div className='card border-0'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='d-flex flex-column col-6 col-lg-4'>
                                    <label>Search Mevzuat:</label>
                                    <Autocomplete 
                                        suggestions={mevzuatArr}
                                        handleClick={this.handleClick}
                                    />
                                </div>
                                <div className='d-flex flex-column col-6 col-lg-4'>
                                    <label htmlFor='inputGroupSelectEntry'>Choose Entry:</label>
                                    {/* <input className='pl-2' type='text' placeholder='Choose...' value={mevDocId}/> */}
                                    <select className='custom-select' id='inputGroupSelectEntry'>
                                        {mevDocOptions}
                                    </select>
                                </div>
                                <div className='d-flex col-6 col-lg-4 mt-2 mt-lg-0'>
                                    <button className='btn btn-success align-self-end'>Add New Relation</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div>
                    <h4><strong>{head}</strong></h4>
                    <ContentEditable
                        tagName='p'
                        html={text}
                        disabled={editable}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ictihatDocs: state.ictihatDocs
    }
}

export default connect(mapStateToProps, )(DocsEdit);