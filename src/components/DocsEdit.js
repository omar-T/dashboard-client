import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
// import {getDoc} from '../store/actions/ictihatDocs'
// import {apiCall} from '../services/api'

class DocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: props.location.state.doc.text.split("\n").join('</br></br>'),
            editable: true
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        console.log(docId);
        // apiCall('get', ``)
    }

    render() {
        const {doc} = this.props.location.state;
        const {text, editable} = this.state;
        return (
            <div className='container-fluid bg-white'>
                <h4><strong>{doc.baslik}</strong></h4>
                <ContentEditable
                    tagName='p'
                    html={text}
                    disabled={editable}
                />
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