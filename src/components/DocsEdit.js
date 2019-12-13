import React, { Component } from 'react'
import {connect} from 'react-redux'
// import {getDoc} from '../store/actions/ictihatDocs'

class DocsEdit extends Component {

    // componentDidMount(){
    //     const {doc} = this.props.location.state;
    //     console.log(doc);
    // }

    render() {
        const {doc} = this.props.location.state;
        console.log(doc);
        return (
            <div className='container-fluid bg-light'>
                {doc.baslik}
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