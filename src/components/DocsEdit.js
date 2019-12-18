import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
// import {getDoc} from '../store/actions/ictihatDocs'
// import {apiCall} from '../services/api'
import axios from 'axios'

class DocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: '',
            editable: true
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        const {doc, type} = this.props.location.state;
        console.log(doc, type);
        if(type === 'ictihat'){
            console.log(docId);
            // apiCall('get', `https://relation-adalethanim.herokuapp.com/relation/ictihat/${docId}`)
            //     .then(res => {
            //         console.log(res);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
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

    render() {
        const {head, text, editable} = this.state;
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
                        <button className='btn btn-success btn-sm'>Add New Relation</button>
                    </div>
                    <div>
                        asda
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