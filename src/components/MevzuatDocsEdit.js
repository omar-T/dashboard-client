import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
// import SanitizeHtml from 'sanitize-html'

export default class MevzuatDocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: 'Hello Mevzuat',
            editable: true
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        console.log(docId);
    }

    render() {
        const {head, text, editable} = this.state;
        return (
            <div className='container-fluid bg-white'>
                <h4><strong>{head}</strong></h4>
                <ContentEditable
                    tagName='p'
                    html={text}
                    disabled={editable}
                />
            </div>
        )
    }
}
