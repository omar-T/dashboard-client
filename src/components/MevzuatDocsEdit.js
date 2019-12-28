import React, { Component, Fragment } from 'react'
import {Link, Element} from 'react-scroll'
import ContentEditable from 'react-contenteditable'
import './MevzuatDocsEdit.css'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
import {addError, removeError} from '../store/actions/errors'
import {handleGetMevzuatDoc} from '../store/actions/foundDocs'
import AddTextFieldForm from './AddTextFieldForm'
import AddNewMaddeBaslikForm from './AddNewMaddeBaslikForm'
import AddNewMaddeForm from './AddNewMaddeForm'

class MevzuatDocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: [],
            index: [],
            // addableMadde: [],
            editable: true
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        this.props.handleGetMevzuatDoc(docId)
            .then(() => {
                const {mevDoc} = this.props.foundDocs;
                // const addableMadde = this.getAddableMaddeler(docId, mevDoc.text);
                this.setState({
                    head: mevDoc.name,
                    text: mevDoc.text,
                    index: mevDoc.index,
                    // addableMadde
                });
                console.log(mevDoc);
            })
            .catch(err => {
                return;
            });
        console.log(docId);
    }

    componentDidUpdate(){
        if(this.props.errors.message){
            setTimeout(() => {
                this.props.removeError()
            }, 4000);
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // Only update if bricks change
    //     return nextState.blocks.length > this.state.blocks.length;
    // }

    // handleChange = (e) => {
    //     console.log(e.target.name);
    //     console.log(e.target.value);
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    // getAddableMaddeler = (docId, text) => {
    //     // const {text} = this.state;
    //     let maddeler = text.filter(txt => {
    //         return txt.type === 'madde'
    //     }).map(txt => {
    //         // console.log(txt.id);
    //         let maddeNum = +txt.id.split(':')[1].slice(1);
    //         // console.log(maddeNum);
    //         return maddeNum;
    //     });

    //     let newMaddeArr = [];
    //     for(let i = 1; i < maddeler[maddeler.length - 1]; i++){
    //         if(!maddeler.includes(i)){
    //             let id = `${docId}:m${i}`;
    //             let title = `Madde ${i}`;
    //             newMaddeArr.push({
    //                 id,
    //                 title
    //             });
    //         }
    //     }
    //     console.log('new madde arr: ', newMaddeArr);
    //     // if(newMaddeArr.length === 0){
    //     //     return <option>You Can Add New Madde At The End Of The Doc</option>
    //     // }
    //     // let maddeOptions = newMaddeArr.map(madde => (
    //     //     <option key={madde.id} value={madde.id}>{madde.title}</option>
    //     // ));
    //     // return maddeOptions;
    //     return newMaddeArr;
    // }

    // handleAddMissingMadde = (e) => {
    //     e.preventDefault();
    //     const {text, index, addableMadde} = this.state;
    //     const {docId} = this.props.match.params;
    //     const newMaddeSelect = document.querySelector('#newMaddeSelect');
    //     const maddeId = newMaddeSelect.value;
    //     const maddeTitle = newMaddeSelect.options[newMaddeSelect.selectedIndex].innerText;
    //     const indexSelect = document.querySelector('#indexSelect');
    //     const indexId = indexSelect.value;
    //     // console.log(maddeId);
    //     // console.log(indexId);
    //     const maddeIndex = text.findIndex(txt => txt.id === indexId);
    //     // console.log(maddeIndex + 1);
    //     const newMaddeObject = {
    //         id: maddeId,
    //         type: 'madde',
    //         text: [],
    //         madde_baslik: null,
    //         title: maddeTitle
    //     }
    //     const newIndexObj = {
    //         kanun_id: docId,
    //         madde_id: maddeId,
    //         degisiklik: 0,
    //         mulga: 0,
    //         text: maddeTitle
    //     }
    //     let newText = [...text];
    //     let newIndex = [...index];
    //     switch(indexId){
    //         case 'begin':
    //             newText.unshift(newMaddeObject);
    //             newIndex.unshift(newIndexObj);
    //             return this.setState({
    //                 text: newText,
    //                 index: newIndex
    //             });
    //         case 'end':
    //             newText.push(newMaddeObject);
    //             newIndex.push(newIndexObj);
    //             return this.setState({
    //                 text: newText,
    //                 index: newIndex
    //             });
    //         default:
    //             newText.splice(maddeIndex + 1, 0, newMaddeObject);
    //             newIndex.splice(maddeIndex + 1, 0, newIndexObj);
    //             let newAddableMadde = addableMadde.filter(madde => madde.id !== maddeId);
    //             return this.setState({
    //                 text: newText,
    //                 index: newIndex,
    //                 addableMadde: newAddableMadde
    //             });
    //     }
    // }

    handleAddNewMadde = (maddeNumber, type) => {
        console.log(maddeNumber);
        const {text, index} = this.state;
        const {docId} = this.props.match.params;
        const {addError} = this.props;

        if(maddeNumber === '' || maddeNumber === '0'){
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
            default:
                indexSelect = document.querySelector('#indexMaddeSelect');
                maddeId = `${docId}:m${maddeNumber}`;
                maddeTitle = `Madde ${maddeNumber}`;
                break;
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
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            default:
                const maddeIndexInText = text.findIndex(txt => txt.id === indexId);
                const maddeIndexInIndex = index.findIndex(ind => ind.madde_id === indexId);
                newText.splice(maddeIndexInText + 1, 0, newMaddeObject);
                newIndex.splice(maddeIndexInIndex + 1, 0, newIndexObj);
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
        let newText = [];
        let newIndex = [];
        switch(prefix){
            case 'title':
                // console.log('I am madde title: ', t_id);
                newText = text.filter(txt => txt.id !== t_id);
                newIndex = index.filter(ind => ind.madde_id !== t_id);
                // console.log('after delete index: ', newIndex);
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            case 'madde_baslik':
                // console.log('I am madde baslik: ', t_id);
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        return {
                            ...txt,
                            madde_baslik: null
                        }
                    }
                    return {...txt}
                });
                return this.setState({
                    text: newText
                });
            default:
                // console.log('I am text: ', t_id, ind);
                // console.log('prefix delete: ', prefix);
                if(prefix === 'parent'){
                    newIndex = index.filter(ind => ind.madde_id !== t_id);
                }
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        let newTxt = txt.text.filter((t, i) => i !== ind);
                        // console.log(newTxt);
                        return {
                            ...txt, 
                            text: [...newTxt]
                        }
                    }
                    return {...txt}
                });
                // console.log(newText);
                return this.setState({
                    text: newText,
                    index: newIndex.length === 0 ? index : newIndex
                });
        }
    }

    handleUpdate = (t_id, prefix, index) => {
        const {text} = this.state;
        let newText = [];
        console.log(t_id, prefix, index);
        switch(prefix){
            case 'title':
                const newTitle = document.querySelector(`[name='${t_id}_title']`).innerText;
                console.log(newTitle);
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        return {
                            ...txt,
                            title: newTitle
                        }
                    }
                    return {...txt}
                });
                return this.setState({
                    text: newText
                });
            case 'madde_baslik':
                const newMaddeBaslik = document.querySelector(`[name='${t_id}_madde_baslik']`).innerText;
                console.log(newMaddeBaslik);
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
                return this.setState({
                    text: newText
                });
            default:
                const updatedText = document.querySelector(`[name='${t_id}_${index}_${prefix}']`).innerText;
                console.log(updatedText);
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        let newTxt = txt.text.map((t, i) => {
                            console.log(txt);
                            if(i === index){
                                console.log('Txt ', t);
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
                return this.setState({
                    text: newText
                });
        }
    }

    handleAddNewTextField = (newTextField, txtId, index, e) => {
        const {text} = this.state;
        txtId = txtId.replace('_', ':');
        console.log(newTextField, txtId, index);
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
        console.log(newText);
        this.setState({
            text: newText
        });
    }

    handleAddNewMaddeBaslik = (madde_baslik, txtId, e) => {
        const {text} = this.state;
        txtId = txtId.replace('_', ':');
        console.log(madde_baslik, txtId);
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
        console.log(newText);
        this.setState({
            text: newText
        });
    }

    prepareTitleText = (t) => {
        const {editable} = this.state;
        let mainTitle = t.text.map((pt, ind) => {
                // const title = `<strong>${pt.text}</strong>`;
                return (
                    <Fragment key={ind}>
                        {!editable &&
                            <div className='float-right pt-1 pr-1'>
                                <button className='btn btn-outline-success btn-sm' onClick={this.handleUpdate.bind(this, t.id, t.type, ind)}>Update</button>
                                <button className='btn btn-outline-danger btn-sm ml-1' onClick={this.handleDelete.bind(this, t.id, 'parent', ind)}>Delete</button>
                                {/* <button className='btn btn-outline-primary btn-sm'>Add New Madde</button> */}
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
        // let maddeTitle = `<strong>${t.title}</strong>`;
        // let maddeBaslik = '';
        // if(t.madde_baslik){
        //     maddeBaslik = `<strong>${t.madde_baslik.text}</strong>`;
        // }
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
                        {/* {lastMaddeId === t.id && 
                            <button className='btn btn-outline-primary btn-sm'>Add New Madde</button>
                        } */}
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

    render() {
        const {head, text, index, editable} = this.state;
        const {mevDoc} = this.props.foundDocs;
        const {errors} = this.props;
        console.log(text);
        // let lastMaddeId = '';
        let maddeArr = [];
        // let newIndex = [];
        let firstMaddeNum = 0;
        if(text.length !== 0){
            maddeArr = text.filter(t => t.type === 'madde');
            firstMaddeNum = maddeArr[0].id.split(':')[1].slice(1);
            // lastMaddeId = maddeArr[maddeArr.length - 1].id;
            // newIndex = index.filter(ind => ind.madde_id !== lastMaddeId);
            // console.log('new index: ', newIndex);
        }
        let mevText = text.map(t => {
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
                    return (<br/>);
            }
        });
        // console.log(mevText);

        return (
            <div className='container-fluid'>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
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
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active container" id="nav-madde" role="tabpanel" aria-labelledby="nav-madde-tab">
                                        {/* {addableMadde.length !== 0 ?
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <label htmlFor='indexMissingSelect'>
                                                        Where To Add:
                                                    </label>
                                                    <select className="custom-select" id="indexMissingSelect">
                                                        {firstMaddeNum > 1 && 
                                                            <option value='begin'>At The Beginning</option>
                                                        }
                                                        {newIndex.map((ind, i) => 
                                                            <option key={i} value={ind.madde_id}>
                                                                {`After ${ind.text}`}
                                                            </option>
                                                        )}
                                                    </select>
                                                </div>
                                                    
                                                <div className='col-6'>
                                                    <label htmlFor='newMaddeSelect'>
                                                        Choose Madde:
                                                    </label>
                                                    <select className="custom-select" id="newMaddeSelect">
                                                        {addableMadde.map(madde => 
                                                            <option key={madde.id} value={madde.id}>{madde.title}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className='col-6 my-3'>
                                                    <button className='btn btn-success' onClick={this.handleAddMissingMadde}>Add Missing Madde</button>
                                                </div>  
                                            </div> :
                                            <div>
                                                <em>Nothing Missing To Add</em>
                                                <hr/>
                                            </div>
                                        } */}
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
                                            buttonTitle='Gecici Madde'
                                            handleAdd={this.handleAddNewMadde}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {/* <h5 className='font-weight-bold' data-toggle="collapse" data-target="#collapseIndex" aria-expanded="true" aria-controls="collapseIndex">Indexes:</h5> */}
                    
                </div>
                <div className='container bg-white my-2 py-3'>
                    {head !== '' &&
                        <Fragment>
                            <div className='float-right'>
                                {editable ?
                                    <button className='btn btn-outline-dark' onClick={this.toggleEditable}>Enable Editing</button> :
                                    <button className='btn btn-outline-danger mr-1' onClick={this.toggleEditable}>Disable Editing</button>
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
        foundDocs: state.foundDocs
    }
}

export default connect(mapStateToProps, {handleGetMevzuatDoc, addError, removeError})(MevzuatDocsEdit);