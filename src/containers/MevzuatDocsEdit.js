import React, { Component, Fragment } from 'react'
import {Link, Element} from 'react-scroll'
import ContentEditable from 'react-contenteditable'
import './MevzuatDocsEdit.css'
import {connect} from 'react-redux'
import {addError, removeError} from '../store/actions/errors'
import {addSuccess, removeSuccess} from '../store/actions/successes'
import {handleGetMevzuatDoc, handleSaveMevDoc} from '../store/actions/foundDocs'
import AddTextFieldForm from '../components/AddTextFieldForm'
import AddNewMaddeBaslikForm from '../components/AddNewMaddeBaslikForm'
import AddNewMaddeForm from '../components/AddNewMaddeForm'
import AddNewTitleForm from '../components/AddNewTitleForm'

class MevzuatDocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: [],   
            index: [],
            editable: true
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        this.props.handleGetMevzuatDoc(docId)
            .then(() => {
                const {mevDoc} = this.props.foundDocs;
                this.setState({
                    head: mevDoc.name,
                    text: mevDoc.text,
                    index: mevDoc.index
                });
            })
            .catch(err => {
                return;
            });
    }

    componentDidUpdate(){
        if(this.props.errors.message){
            setTimeout(() => {
                this.props.removeError()
            }, 3000);
        }
        if(this.props.successes.message){
            setTimeout(() => {
                this.props.removeSuccess()
            }, 3000);
        }
    }

    handleAddNewMadde = (maddeNumber, type) => {
        const {text, index} = this.state;
        const {docId} = this.props.match.params;
        const {addError, addSuccess} = this.props;

        if(maddeNumber === '' || maddeNumber === '0' || +maddeNumber < 0){
            return addError('Please Enter A Valid Number !');
        }
        
        let indexSelect = '';
        let maddeId = '';
        let maddeTitle = '';
        switch(type){
            case 'ek_madde':
                indexSelect = document.querySelector('#indexEkSelect');
                maddeId = `${docId}:em${maddeNumber}`;
                maddeTitle = `Ek Madde ${maddeNumber}`;
                break;
            case 'gecici_madde':
                indexSelect = document.querySelector('#indexGeciciSelect');
                maddeId = `${docId}:gm${maddeNumber}`;
                maddeTitle = `Geçici Madde ${maddeNumber}`;
                break;
            case 'madde':
                indexSelect = document.querySelector('#indexMaddeSelect');
                maddeId = `${docId}:m${maddeNumber}`;
                maddeTitle = `Madde ${maddeNumber}`;
                break;
            default:
                return console.log('Something Went Wrong!');
        }
        const indexId = indexSelect.value;

        let foundMadde = text.find(txt => txt.id === maddeId);
        if(foundMadde){
            return addError('This Madde Is Already Found. Please Try Again !');
        }
        const newMaddeObject = {
            id: maddeId,
            type,
            text: [],
            madde_baslik: null,
            title: maddeTitle
        }
        const newIndexObj = {
            kanun_id: docId,
            madde_id: maddeId,
            degisiklik: 0,
            mulga: 0,
            text: maddeTitle
        }
        let newText = [...text];
        let newIndex = [...index];
        switch(indexId){
            case 'begin':
                newText.unshift(newMaddeObject);
                newIndex.unshift(newIndexObj);
                addSuccess(`${maddeTitle} Added Successfully!`);
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            default:
                const maddeIndexInText = text.findIndex(txt => txt.id === indexId);
                const maddeIndexInIndex = index.findIndex(ind => ind.madde_id === indexId);
                newText.splice(maddeIndexInText + 1, 0, newMaddeObject);
                newIndex.splice(maddeIndexInIndex + 1, 0, newIndexObj);
                addSuccess(`${maddeTitle} Added Successfully!`);
                return this.setState({
                    text: newText,
                    index: newIndex
                });
        }
    }

    handleAddNewTitle = (title, type) => {
        // console.log(title, type);
        const {text, index} = this.state;
        const {docId} = this.props.match.params;
        const {addSuccess} = this.props;

        let indexSelect = '';

        let titleArr = text.filter(txt => txt.type ==='parent_title' || txt.type === 'child_title')
            .map(t => +t.id.split(':')[1].slice(2));
        let titleNum = '';
        if(titleArr.length !== 0){
            titleNum = Math.max(...titleArr);
        }
        titleNum = titleNum === '' ? 1 : titleNum + 1;
        let titleId = `${docId}:pt${titleNum}`;
        
        switch(type){
            case 'parent_title':
                indexSelect = document.querySelector('#indexParentSelect');
                break;
            case 'child_title':
                indexSelect = document.querySelector('#indexChildSelect');
                break;
            default:
                return console.log('Something Went Wrong!');
        }

        const indexId = indexSelect.value;

        const newTitleObject = {
            id: titleId,
            type,
            text: [{
                text: title,
                'degisiklik/mulga': null,
                dps: null
            }],
        }
        const newIndexObj = {
            kanun_id: docId,
            madde_id: titleId,
            degisiklik: 0,
            mulga: 0,
            text: title
        }
        
        let newText = [...text];
        let newIndex = [...index];
        switch(indexId){
            case 'begin':
                newText.unshift(newTitleObject);
                newIndex.unshift(newIndexObj);
                addSuccess(`${title} Added Successfully!`);
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            default:
                const titleIndexInText = text.findIndex(txt => txt.id === indexId);
                const titleIndexInIndex = index.findIndex(ind => ind.madde_id === indexId);
                newText.splice(titleIndexInText + 1, 0, newTitleObject);
                newIndex.splice(titleIndexInIndex + 1, 0, newIndexObj);
                addSuccess(`${title} Added Successfully!`);
                return this.setState({
                    text: newText,
                    index: newIndex
                });
        }
    }

    toggleEditable = () => {
        this.setState({
            editable: !this.state.editable
        });
    }

    handleDelete = (t_id, prefix, ind) => {
        const {text, index} = this.state;
        const {addError} = this.props;
        let newText = [];
        let newIndex = [];
        switch(prefix){
            case 'title':
                newText = text.filter(txt => txt.id !== t_id);
                newIndex = index.filter(ind => ind.madde_id !== t_id);
                addError(`Madde Deleted Successfully!`);
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            case 'madde_baslik':
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        return {
                            ...txt,
                            madde_baslik: null
                        }
                    }
                    return {...txt}
                });
                addError(`Madde Baslik Deleted Successfully!`);
                return this.setState({
                    text: newText
                });
            case 'text':
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        let newTxt = txt.text.filter((t, i) => i !== ind);
                        return {
                            ...txt, 
                            text: [...newTxt]
                        }
                    }
                    return {...txt}
                });
                addError(`Text Deleted Successfully!`);
                return this.setState({
                    text: newText
                });
                
            default:
                let isTextEmpty = false;
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        let newTxt = txt.text.filter((t, i) => i !== ind);
                        if(newTxt.length === 0){
                            isTextEmpty = true;
                        }
                        return {
                            ...txt,
                            text: [...newTxt]
                        }
                    }
                    return {...txt}
                });
                if(isTextEmpty){
                    newText = text.filter(txt => txt.id !== t_id);
                    newIndex = index.filter(ind => ind.madde_id !== t_id);
                }
                addError(`Title Deleted Successfully!`);
                return this.setState({
                    text: newText,
                    index: newIndex.length === 0 ? index : newIndex
                });
        }
    }

    handleUpdate = (t_id, prefix, ind) => {
        const {text, index} = this.state;
        const {addSuccess} = this.props;
        let newText = [];
        let newIndex = [];
        switch(prefix){
            case 'title':
                const newTitle = document.querySelector(`[name='${t_id}_title']`).innerText;
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        return {
                            ...txt,
                            title: newTitle
                        }
                    }
                    return {...txt}
                });
                newIndex = index.map(ind => {
                    if(ind.madde_id === t_id){
                        return {
                            ...ind,
                            text: newTitle
                        }
                    }
                    return {...ind}
                });
                addSuccess('Madde Title Updated Successfully.');
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            case 'madde_baslik':
                const newMaddeBaslik = document.querySelector(`[name='${t_id}_madde_baslik']`).innerText;
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        return {
                            ...txt,
                            madde_baslik: {
                                ...txt.madde_baslik,
                                text: newMaddeBaslik
                            }
                        }
                    }
                    return {...txt}
                });
                let maddeNum = t_id.split(':')[1].slice(1);
                let maddeText = `Madde ${maddeNum} / ${newMaddeBaslik}`;
                newIndex = index.map(ind => {
                    if(ind.madde_id === t_id){
                        return {
                            ...ind,
                            text: maddeText
                        }
                    }
                    return {...ind}
                });
                addSuccess('Madde Baslik Updated Successfully.');
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            default:
                const updatedText = document.querySelector(`[name='${t_id}_${ind}_${prefix}']`).innerText;
                if(prefix === 'parent_title'){
                    newIndex = [...index];
                    const parentIndex = newIndex.findIndex((ind => ind.madde_id === t_id));
                    newIndex[parentIndex + ind].text = updatedText;
                }
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        let newTxt = txt.text.map((t, i) => {
                            if(i === ind){
                                return {
                                    ...t,
                                    text: updatedText
                                }
                            }
                            return {...t}
                        });
                        return {
                            ...txt,
                            text: newTxt
                        }
                    }
                    return {...txt}
                });
                addSuccess('Title Updated Successfully.');
                return this.setState({
                    text: newText,
                    index: newIndex.length === 0 ? index : newIndex
                });
        }
    }

    handleAddNewTextField = (newTextField, txtId, index, e) => {
        const {text} = this.state;
        const {addSuccess} = this.props;
        txtId = txtId.replace('_', ':');
        let newText = text.map(txt => {
            if(txt.id === txtId){
                txt.text.push({
                    text: newTextField,
                    'degisiklik/mulga': null,
                    dps: null
                });
            }
            return {...txt}
        });
        addSuccess('Text Added Successfully.');
        this.setState({
            text: newText
        });
    }

    handleAddNewMaddeBaslik = (madde_baslik, txtId, e) => {
        const {text} = this.state;
        const {addSuccess} = this.props;
        
        txtId = txtId.replace('_', ':');
        let newText = text.map(txt => {
            if(txt.id === txtId){
                const newMaddeBaslik = {
                    text: madde_baslik,
                    'degisiklik/mulga': null, 
                    dps: null
                }
                return {
                    ...txt,
                    madde_baslik: newMaddeBaslik
                }
            }
            return {...txt}
        });
        addSuccess('Madde Baslik Added Successfully.');
        this.setState({
            text: newText
        });
    }

    prepareTitleText = (t) => {
        const {editable} = this.state;
        const txtId = t.id.replace(':', '_');
        let mainTitle = t.text.map((pt, ind, arr) => {
                return (
                    <Fragment key={ind}>
                        {!editable &&
                            <div className='float-right pt-1 pr-1'>
                                <button className='btn btn-outline-success btn-sm' onClick={this.handleUpdate.bind(this, t.id, t.type, ind)}>Update</button>
                                <button className='btn btn-outline-danger btn-sm ml-1' onClick={this.handleDelete.bind(this, t.id, t.type, ind)}>Delete</button>
                                {arr.length - 1 === ind && 
                                    <AddTextFieldForm
                                        txtId={txtId}
                                        index={arr.length}
                                        handleAdd={this.handleAddNewTextField}
                                    />
                                }
                            </div>
                        }
                        
                        <ContentEditable
                            className='editable text-center font-weight-bold'
                            tagName='h4'
                            id={ind}
                            html={pt.text}
                            disabled={editable}
                            name={`${t.id}_${ind}_${t.type}`}
                        />
                    </Fragment>
                )
        });
        // console.log('Parent Title: ', mainTitle);
        return (
            <Element key={t.id} id={t.id} name={t.id} onChange={this.handleChange}>
                {mainTitle}
                <br/>
            </Element>
        )
    }

    prepareMaddeText = (t, prefix) => {
        const {editable} = this.state;
        let txtId = t.id.replace(':', '_');
        let maddeText = t.text.map((mt, ind, arr) => {
            const txt = `<span>${mt.text}</span>`;
            return (
                <Fragment key={ind}>
                    {!editable &&
                        <div className='float-right pt-1 pr-1'>
                            <button className='btn btn-outline-success btn-sm' onClick={this.handleUpdate.bind(this, t.id, t.type, ind)}>Update</button>
                            <button className='btn btn-outline-danger btn-sm ml-1' onClick={this.handleDelete.bind(this, t.id, 'text', ind)}>Delete</button>
                            {arr.length - 1 === ind && 
                                <AddTextFieldForm
                                    txtId={txtId}
                                    index={arr.length}
                                    handleAdd={this.handleAddNewTextField}
                                />
                            }
                        </div>
                    }
                    <ContentEditable
                        className='editable'
                        tagName='p'
                        id={ind}
                        html={txt}
                        disabled={editable}
                        name={`${t.id}_${ind}_${t.type}`}
                    />
                </Fragment>
            )
        });
        return (
            <div key={t.id} id={t.id}>
                {!editable &&
                    <div className='float-right pt-1 pr-1'>
                        <button className='btn btn-outline-success btn-sm' onClick={this.handleUpdate.bind(this, t.id, 'title')}>Update</button>
                        <button className='btn btn-outline-danger btn-sm ml-1' onClick={this.handleDelete.bind(this, t.id, 'title')}>Delete</button>
                        {t.text.length === 0 && 
                            <AddTextFieldForm
                                txtId={txtId}
                                index={t.text.length}
                                handleAdd={this.handleAddNewTextField}
                            />
                        }
                        {t.madde_baslik === null && 
                            <AddNewMaddeBaslikForm
                                txtId={txtId}
                                handleAdd={this.handleAddNewMaddeBaslik}
                            />
                        }
                    </div>
                }
                <ContentEditable
                    id={`${prefix}Header`}
                    className='editable font-weight-bold'
                    tagName='h4'
                    html={t.title}
                    disabled={editable}
                    name={`${t.id}_title`}
                />
                <hr/>
                {t.madde_baslik &&
                    <Fragment>
                        {!editable && 
                            <div className='float-right pt-1 pr-1'>
                                <button className='btn btn-outline-success btn-sm' onClick={this.handleUpdate.bind(this, t.id, 'madde_baslik')}>Update</button>
                                <button className='btn btn-outline-danger btn-sm ml-1' onClick={this.handleDelete.bind(this, t.id, 'madde_baslik')}>Delete</button>
                                {t.text.length === 0 && 
                                    <AddTextFieldForm
                                        txtId={txtId}
                                        index={t.text.length}
                                        handleAdd={this.handleAddNewTextField}
                                    />
                                }
                            </div>
                        }
                        <ContentEditable
                            id={`${prefix}Title`}
                            className='editable text-center font-weight-bold'
                            tagName='h5'
                            html={t.madde_baslik.text}
                            disabled={editable}
                            name={`${t.id}_madde_baslik`}
                        />
                    </Fragment>
                }
                {maddeText}
                <br/>
            </div>
        );
    }

    handleSaveDoc = (e) => {
        e.preventDefault();
        const {text, index} = this.state;
        const {handleSaveMevDoc, addSuccess} = this.props;
        const {mevDoc} = this.props.foundDocs;
        let newMevDoc = {
            ...mevDoc,
            text,
            index,
        }
        handleSaveMevDoc(newMevDoc)
            .then(() => {
                console.log('Success!');
                addSuccess('Doc Saved Successfully.');
            })
            .catch(err => {
                return;
            });
    }

    render() {
        const {head, text, index, editable} = this.state;
        const {mevDoc} = this.props.foundDocs;
        const {errors, successes} = this.props;
        let maddeArr = [];
        let firstMaddeNum = 0;
        if(text.length !== 0){
            maddeArr = text.filter(t => t.type === 'madde');
            firstMaddeNum = maddeArr[0].id.split(':')[1].slice(1);
        }
        let mevText = text.map((t, i) => {
            switch(t.type){
                case 'parent_title':
                    return this.prepareTitleText(t);

                case 'child_title':
                    return this.prepareTitleText(t);

                case 'madde':
                    return this.prepareMaddeText(t, 'madde');
                
                case 'ek_madde':
                    return this.prepareMaddeText(t, 'ekMadde');
                
                case 'gecici_madde':
                    return this.prepareMaddeText(t, 'geciciMadde');

                default:
                    return <br key={i}/>;
            }
        });

        return (
            <div className='container-fluid'>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
                }
                {successes.message && 
                    <div className='alert alert-success'>{successes.message}</div>
                }
                <div className='container bg-white py-2'>
                    <nav className='navbar doc_navbar pl-0 pb-0 mb-2'>
                        <ul className='navbar-nav mr-auto flex-row'>
                            <li className='nav-item'>
                                <button className='nav-link index-button' data-toggle="collapse" data-target="#collapseIndex" aria-expanded="true" aria-controls="collapseIndex">
                                    Indexes
                                </button>
                            </li>
                            <li className='nav-item mx-3'>
                                <button className='nav-link index-button' data-toggle="collapse" data-target="#collapseAddIndex" aria-expanded="true" aria-controls="collapseAddIndex">
                                    Add Index
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {mevDoc &&
                        <div id="collapseIndex" className="collapse">
                            <ul className='index text-center'>
                                {index.map((ind, i) => 
                                    <li key={i} className='index-link'>
                                        <Link 
                                            to={`${ind.madde_id}`}
                                            spy={true} 
                                            smooth={true} 
                                            duration={500}
                                        >
                                            {ind.text}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                    {mevDoc &&
                        <div id="collapseAddIndex" className="collapse">
                            <nav className='mb-2'>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-madde-tab" data-toggle="tab" href="#nav-madde" role="tab" aria-controls="nav-madde" aria-selected="true">Add Madde</a>
                                    <a className="nav-item nav-link" id="nav-ek-madde-tab" data-toggle="tab" href="#nav-ek-madde" role="tab" aria-controls="nav-ek-madde" aria-selected="false">Add Ek Madde</a>
                                    <a className="nav-item nav-link" id="nav-gecici-madde-tab" data-toggle="tab" href="#nav-gecici-madde" role="tab" aria-controls="nav-gecici-madde" aria-selected="false">Add Gecici Madde</a>
                                    <a className="nav-item nav-link" id="nav-parent-title-tab" data-toggle="tab" href="#nav-parent-title" role="tab" aria-controls="nav-parent-title" aria-selected="false">Add Parent Title</a>
                                    <a className="nav-item nav-link" id="nav-child-title-tab" data-toggle="tab" href="#nav-child-title" role="tab" aria-controls="nav-child-title" aria-selected="false">Add Child Title</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active container" id="nav-madde" role="tabpanel" aria-labelledby="nav-madde-tab">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label htmlFor='indexMaddeSelect'>
                                                Where To Add:
                                            </label>
                                            <select className="custom-select" id="indexMaddeSelect">
                                                {firstMaddeNum > 1 && 
                                                    <option value='begin'>At The Beginning</option>
                                                }
                                                {index.map((ind, i) => 
                                                    <option key={i} value={ind.madde_id}>
                                                        {`After ${ind.text}`}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <AddNewMaddeForm
                                            type='madde'
                                            buttonTitle='Madde'
                                            handleAdd={this.handleAddNewMadde}
                                        />
                                    </div>
                                </div>
                                <div className="tab-pane fade container" id="nav-ek-madde" role="tabpanel" aria-labelledby="nav-ek-madde-tab">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label htmlFor='indexEkSelect'>
                                                Where To Add:
                                            </label>
                                            <select className="custom-select" id="indexEkSelect">
                                                {firstMaddeNum > 1 && 
                                                    <option value='begin'>At The Beginning</option>
                                                }
                                                {index.map((ind, i) => 
                                                    <option key={i} value={ind.madde_id}>
                                                        {`After ${ind.text}`}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <AddNewMaddeForm
                                            type='ek_madde'
                                            buttonTitle='Ek Madde'
                                            handleAdd={this.handleAddNewMadde}
                                        />
                                    </div>
                                </div>
                                <div className="tab-pane fade container" id="nav-gecici-madde" role="tabpanel" aria-labelledby="nav-gecici-madde-tab">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label htmlFor='indexGeciciSelect'>
                                                Where To Add:
                                            </label>
                                            <select className="custom-select" id="indexGeciciSelect">
                                                {firstMaddeNum > 1 && 
                                                    <option value='begin'>At The Beginning</option>
                                                }
                                                {index.map((ind, i) => 
                                                    <option key={i} value={ind.madde_id}>
                                                        {`After ${ind.text}`}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <AddNewMaddeForm
                                            type='gecici_madde'
                                            buttonTitle='Geçici Madde'
                                            handleAdd={this.handleAddNewMadde}
                                        />
                                    </div>
                                </div>
                                <div className="tab-pane fade container" id="nav-parent-title" role="tabpanel" aria-labelledby="nav-parent-title-tab">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label htmlFor='indexParentSelect'>
                                                Where To Add:
                                            </label>
                                            <select className="custom-select" id="indexParentSelect">
                                                <option value='begin'>At The Beginning</option>
                                                {index.map((ind, i) => 
                                                    <option key={i} value={ind.madde_id}>
                                                        {`After ${ind.text}`}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <AddNewTitleForm
                                            type='parent_title'
                                            buttonTitle='Parent Title'
                                            handleAdd={this.handleAddNewTitle}
                                        />
                                    </div>
                                </div>
                                <div className="tab-pane fade container" id="nav-child-title" role="tabpanel" aria-labelledby="nav-child-title-tab">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label htmlFor='indexChildSelect'>
                                                Where To Add:
                                            </label>
                                            <select className="custom-select" id="indexChildSelect">
                                                <option value='begin'>At The Beginning</option>
                                                {index.map((ind, i) => 
                                                    <option key={i} value={ind.madde_id}>
                                                        {`After ${ind.text}`}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <AddNewTitleForm
                                            type='child_title'
                                            buttonTitle='Child Title'
                                            handleAdd={this.handleAddNewTitle}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='container bg-white my-2 py-3'>
                    {head !== '' &&
                        <Fragment>
                            <div className='float-right'>
                                {editable ?
                                    <button className='btn btn-outline-dark' onClick={this.toggleEditable}>Enable Editing</button> :
                                    <Fragment>
                                        <button className='btn btn-outline-success mr-1' onClick={this.handleSaveDoc}>Save Doc</button>
                                        <button className='btn btn-outline-danger' onClick={this.toggleEditable}>Disable Editing</button>
                                    </Fragment>
                                }
                            </div>
                            <h5>
                                <strong className='doc-title '>{head}</strong>
                            </h5>
                        </Fragment>
                    }
                    <hr/>
                    {mevText}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        errors: state.errors,
        successes: state.successes,
        foundDocs: state.foundDocs
    }
}

export default connect(mapStateToProps, {
    handleGetMevzuatDoc, 
    handleSaveMevDoc, 
    addError, 
    removeError, 
    addSuccess, 
    removeSuccess
})(MevzuatDocsEdit);