import React, { Component } from 'react'
import './IctihatDocsEdit.css'
import ContentEditable from 'react-contenteditable'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
import Autocomplete from './Autocomplete'
import mevzuatArr from '../mevzuatArr.json'
import {addError, removeError} from '../store/actions/errors'
import {fetchRelationsModel, emptyDocRelations, addRelation, removeRelation, updateRelation} from '../store/actions/docRelations'
import {handleGetMevzuatDoc} from '../store/actions/foundDocs'

class DocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: '',
            editable: true,
            loading: false,
            ictihatMev: '',
            mevDocEntries: [],
            isAdded: false
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        const {doc} = this.props.location.state;
        // console.log(docId);
        this.setState({
            loading: true
        });
        this.props.fetchRelationsModel(docId)
            .then(() => {
                // console.log(this.props.docRelations);
                let ictihatMev = [...this.props.docRelations.mevzuat];
                // console.log(ictihatMev);
                this.setState({
                    loading: false,
                    ictihatMev,
                    head: doc.baslik,
                    text: doc.text.split("\n").join('</br></br>')
                });
            })
            .catch((err) => {
                const {emptyDocRelations} = this.props;
                // console.log(err);
                emptyDocRelations();
                this.setState({
                    loading: false,
                    head: doc.baslik,
                    text: doc.text.split("\n").join('</br></br>')
                });
            });
    }

    componentDidUpdate(){
        if(this.props.errors.message){
            setTimeout(() => {
                this.props.removeError()
            }, 4000);
        }
    }

    removeRelation = (mev_type, mev_id, madde_id) => {
        const {docId} = this.props.match.params;
        // console.log(mev_type);
        // console.log(mev_id);
        // console.log(madde_id);
        this.props.removeRelation(docId, mev_type, mev_id, madde_id)
            .then(() => {
                // console.log('after remove');
                // console.log(this.props.docRelations);
                this.setState({
                    ictihatMev: this.props.docRelations.mevzuat
                });
            })
            .catch(err => {
                return;
            });
    }

    handleClick = (mevDocId) => {
        // console.log(mevDocId);
        this.props.handleGetMevzuatDoc(mevDocId)
            .then(() => {
                const {mevDoc} = this.props.foundDocs;
                // console.log(mevDoc.text);
                let mevDocEntries = mevDoc.text.filter(txt => txt.type === 'madde');
                // console.log(mevDocEntries);
                this.setState({
                    mevDocEntries
                });
            })
            .catch(err => {
                return;
            });
    }

    handleAddNewRelation = () => {
        const {docId} = this.props.match.params;
        const {docRelations, addRelation, updateRelation, addError} = this.props;
        const {mevDoc} = this.props.foundDocs;
        const {ictihatMev} = this.state;
        const select = document.querySelector('#inputGroupSelectEntry');
        const maddeId = select.value;
        const maddeTitle = select.options[select.selectedIndex].innerText;
        // console.log('before update ', docRelations);
        if(+maddeId === 0){
            return addError('Please Search For A Doc First !');
        }
        // console.log(ictihatMev);
        let mevzuat = [{
            type: mevDoc.type,
            content: [{
                mevId: mevDoc.id,
                mevName: mevDoc.name,
                maddeList: [{
                    id: maddeId,
                    title: maddeTitle
                }]
            }]
        }];
        let newIctihatMev = [];
        if(ictihatMev !== ''){
            let newMevzuat = [];
            let foundMev = ictihatMev.find(mev => mev.type === mevDoc.type);
            if(foundMev){
                let foundContent = foundMev.content.find(cont => cont.mevId === mevDoc.id);
                if(foundContent){
                    let foundMadde = foundContent.maddeList.find(madde => madde.id === maddeId);
                    if(foundMadde){
                        return addError('The Choosen Entry Is already Found... Please Choose Another.');
                    }
                    newMevzuat = ictihatMev.map(mev => {
                        if(mev.type === mevDoc.type){
                            let newContent = mev.content.map(cont => {
                                if(cont.mevId === mevDoc.id){
                                    cont.maddeList.push({
                                        id: maddeId,
                                        title: maddeTitle
                                    });
                                    return {...cont};
                                }
                                return {...cont};
                            });
                            return {
                                ...mev, 
                                content: [...newContent]
                            }
                        }
                        return {...mev}
                    });
                    return updateRelation(docId, newMevzuat)
                        .then(() => {
                            // console.log('after update ', this.props.docRelations);
                            newIctihatMev = [...this.props.docRelations.mevzuat];
                            return this.setState({
                                ictihatMev: newIctihatMev
                            });
                        })
                        .catch(err => {
                            return;
                        });
                }
                newMevzuat = ictihatMev.map(mev => {
                    if(mev.type === mevDoc.type){
                        return {
                            ...mev,
                            content: [
                                ...mev.content,
                                {
                                    mevId: mevDoc.id,
                                    mevName: mevDoc.name,
                                    maddeList: [{
                                        id: maddeId,
                                        title: maddeTitle
                                    }]
                                }
                            ]
                        }
                    }
                    return {...mev};
                });
                return updateRelation(docId, newMevzuat)
                    .then(() => {
                        newIctihatMev = [...this.props.docRelations.mevzuat];
                        return this.setState({
                            ictihatMev: newIctihatMev
                        });
                    })
                    .catch(err => {
                        return;
                    });
            }
            newMevzuat = [...docRelations.mevzuat, ...mevzuat];
            return updateRelation(docId, newMevzuat)
                .then(() => {
                    newIctihatMev = [...this.props.docRelations.mevzuat];
                    return this.setState({
                        ictihatMev: newIctihatMev
                    });
                })
                .catch(err => {
                    return;
                });
        }else{
            const newIctihatRel = {
                iliskili_karar: [],
                mevzuat,
                relID: docId
            }
            return addRelation(docId, newIctihatRel)
                .then(() => {
                    newIctihatMev = [...this.props.docRelations.mevzuat];
                    return this.setState({
                        ictihatMev: newIctihatMev
                    });
                })
                .catch(err => {
                    return;
                });
        }
    }

    render() {
        const {head, text, editable, ictihatMev, mevDocEntries, loading} = this.state;
        const {docRelations, errors} = this.props;
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
                                                <hr/>
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
        return (
            <div className='container-fluid  '>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
                }
                <div className='container bg-white'>
                    <div className='row py-3'>
                        <div className='col-4'>
                            <h4>Relations:</h4>
                            {loading ? 
                                <div>Loading...</div> : 
                                (Object.keys(docRelations).length === 0 || ictihatMev === '') ? 
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
                                                <option value='0'>Please Search First...</option>
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
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        errors: state.errors,
        docRelations: state.docRelations,
        foundDocs: state.foundDocs
    }
}

export default connect(mapStateToProps, {
    fetchRelationsModel, 
    emptyDocRelations, 
    addRelation, 
    removeRelation, 
    updateRelation, 
    handleGetMevzuatDoc, 
    addError, 
    removeError
})(DocsEdit);