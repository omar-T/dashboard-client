import React, { Component } from 'react'
import './IctihatDocsEdit.css'
import ContentEditable from 'react-contenteditable'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
import Autocomplete from './Autocomplete'
import mevzuatArr from '../mevzuatArr.json'
import {fetchRelationsModel, removeRelation} from '../store/actions/docRelations'
import {handleGetMevzuatDoc} from '../store/actions/foundDocs'

class DocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: '',
            editable: true,
            ictihatRelation: '',
            ictihatMev: '',
            // mevDocId: '',
            mevDocEntries: []
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        const {doc} = this.props.location.state;
        console.log(docId);
        let ictihatMev = [];
        this.props.fetchRelationsModel(docId)
            .then(() => {
                console.log(this.props.docRelations);
                ictihatMev = [...this.props.docRelations.mevzuat];
                console.log(ictihatMev);
                this.setState({
                    ictihatMev,
                    head: doc.baslik,
                    text: doc.text.split("\n").join('</br></br>')
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    head: doc.baslik,
                    text: doc.text.split("\n").join('</br></br>')
                });
            });
    }

    removeRelation = (mev_type, mev_id, madde_id) => {
        const {docId} = this.props.match.params;
        console.log(mev_type);
        console.log(mev_id);
        console.log(madde_id);
        this.props.removeRelation(docId, mev_type, mev_id, madde_id)
            .then(() => {
                console.log('after remove');
                console.log(this.props.docRelations);
                this.setState({
                    ictihatMev: this.props.docRelations.mevzuat
                });
            })
            .catch(err => {
                return;
            });
    }

    handleClick = (mevDocId) => {
        console.log(mevDocId);
        this.props.handleGetMevzuatDoc(mevDocId)
            .then(() => {
                const {mevDoc} = this.props.foundDocs;
                console.log(mevDoc.text);
                let mevDocEntries = mevDoc.text.filter(txt => txt.type === 'madde');
                console.log(mevDocEntries);
                this.setState({
                    mevDocEntries
                });
            })
            .catch(err => {
                return;
            });
    }

    handleAddNewRelation = () => {
        const {mevDoc} = this.props.foundDocs;
        const select = document.querySelector('#inputGroupSelectEntry');
        const maddeId = select.value;
        const maddeTitle = select.options[select.selectedIndex].innerText;
        console.log(mevDoc, maddeId, maddeTitle);
    }

    render() {
        const {head, text, editable, ictihatMev, mevDocEntries} = this.state;
        let ictihatMevList = '';
        if(ictihatMev !== ''){
            ictihatMevList = ictihatMev.map((mev, index) => (
                <li key={index}>
                    <button className='show-relation' data-toggle='modal' data-target={`#showRelations_${index}`}>{mev.type} ({mev.content.length})</button>
                    <div className="modal fade" id={`showRelations_${index}`} tabIndex="-1" role="dialog" aria-labelledby="showRelationsLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="showRelationsLabel">Show Relations:</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body ictihat-mevzuat-list">
                                    <ul className='p-0'>
                                        {mev.content.map(cont => (
                                            <li key={cont.mevId}>
                                                <p className='mb-1'>
                                                    <strong>{cont.mevName}</strong>
                                                </p>
                                                <ul className='p-0'>
                                                    {cont.maddeList.map(madde => (
                                                        <li key={madde.id}>
                                                            {madde.title} 
                                                            <button className='delete-relation-button ml-3' onClick={this.removeRelation.bind(this, mev.type, cont.mevId, madde.id)} data-dismiss="modal">X</button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ));
        }
        const mevDocOptions = mevDocEntries.map(entry => (
            <option key={entry.id} value={entry.id}>{entry.title}</option>
        ));
        console.log(mevDocOptions.length);
        return (
            <div className='container-fluid bg-white'>
                <div className='row py-3'>
                    <div className='col-4'>
                        <h4>Relations:</h4>
                        {(ictihatMevList.length === 0) && (ictihatMevList !== '') ? 
                            <div><em>No Relations Found</em></div> :
                            <ul className='relation-list'>
                                {ictihatMevList}
                            </ul>
                        }
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
                                    <select className='custom-select' id='inputGroupSelectEntry'>
                                        {mevDocOptions.length !== 0 ?
                                            mevDocOptions : 
                                            <option>Please Search First...</option>
                                        }
                                    </select>
                                </div>
                                <div className='d-flex col-6 col-lg-4 mt-2 mt-lg-0'>
                                    <button className='btn btn-success align-self-end' onClick={this.handleAddNewRelation}>Add New Relation</button>
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
        docRelations: state.docRelations,
        foundDocs: state.foundDocs
    }
}

export default connect(mapStateToProps, {fetchRelationsModel, removeRelation, handleGetMevzuatDoc})(DocsEdit);