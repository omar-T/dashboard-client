import React, { Component, Fragment } from 'react'
import {Link, Element} from 'react-scroll'
import ContentEditable from 'react-contenteditable'
import './MevzuatDocsEdit.css'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
import {handleGetMevzuatDoc} from '../store/actions/foundDocs'
import AddTextFieldForm from './AddTextFieldForm'
import AddNewMaddeBaslikForm from './AddNewMaddeBaslikForm'

class MevzuatDocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: [],
            index: [],
            newMaddeArr: '',
            editable: true
        }
    }

    componentDidMount(){
        const {docId} = this.props.match.params;
        this.props.handleGetMevzuatDoc(docId)
            .then(() => {
                const {mevDoc} = this.props.foundDocs;
                const newMaddeArr = this.getAddableMaddeler(mevDoc.text, docId);
                this.setState({
                    head: mevDoc.name,
                    text: mevDoc.text,
                    index: mevDoc.index,
                    newMaddeArr
                });
                console.log(mevDoc);
            })
            .catch(err => {
                return;
            });
        console.log(docId);
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

    getAddableMaddeler = (text, docId) => {
        let maddeler = text.filter(txt => {
            return txt.type === 'madde'
        }).map(txt => {
            // console.log(txt.id);
            let maddeNum = +txt.id.split(':')[1].slice(1);
            return maddeNum;
        });
        let newMaddeArr = [];
        for(let i = 1; i < maddeler[maddeler.length - 1]; i++){
            if(!maddeler.includes(i)){
                let id = `${docId}:m${i}`;
                let title = `Madde ${i}`;
                newMaddeArr.push({
                    num: i,
                    id,
                    title
                });
            }
        }
        // console.log(newMaddeArr);
        // let maddeOptions = newMaddeArr.map(madde => (
        //     <option key={madde.id} value={madde.id}>{madde.title}</option>
        // ));

        return newMaddeArr;
    }

    handleAddNewMadde = (e) => {
        e.preventDefault();
        const {text, index} = this.state;
        const {docId} = this.props.match.params;
        const newMaddeSelect = document.querySelector('#newMaddeSelect');
        const maddeId = newMaddeSelect.value;
        const maddeTitle = newMaddeSelect.options[newMaddeSelect.selectedIndex].innerText;
        const indexSelect = document.querySelector('#indexSelect');
        const indexId = indexSelect.value;
        // console.log(maddeId);
        // console.log(indexId);
        const maddeIndex = text.findIndex(txt => txt.id === indexId);
        // console.log(maddeIndex + 1);
        const newMaddeObject = {
            id: maddeId,
            type: 'madde',
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
            case 'end':
                newText.push(newMaddeObject);
                newIndex.push(newIndexObj);
                return this.setState({
                    text: newText,
                    index: newIndex
                });
            default:
                newText.splice(maddeIndex + 1, 0, newMaddeObject);
                newIndex.splice(maddeIndex + 1, 0, newIndexObj);
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

    handleDelete = (t_id, prefix, index) => {
        const {text} = this.state;
        let newText = [];
        switch(prefix){
            case 'title':
                console.log('I am madde title: ', t_id);
                newText = text.filter(txt => txt.id !== t_id);
                return this.setState({
                    text: newText
                });
            case 'madde_baslik':
                console.log('I am madde baslik: ', t_id);
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
                console.log('I am text: ', t_id, index);
                newText = text.map(txt => {
                    if(txt.id === t_id){
                        let newTxt = txt.text.filter((t, i) => i !== index);
                        console.log(newTxt);
                        return {
                            ...txt, 
                            text: [...newTxt]
                        }
                    }
                    return {...txt}
                });
                console.log(newText);
                return this.setState({
                    text: newText
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
        let mainTitle = t.text.map((pt, index) => {
                // const title = `<strong>${pt.text}</strong>`;
                return (
                    <Fragment key={index}>
                        {!editable &&
                            <div className='float-right pt-1 pr-1'>
                                <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, t.type, index)}>Update</button>
                                <button className='btn btn-outline-danger btn-sm mr-1' onClick={this.handleDelete.bind(this, t.id, 'text', index)}>Delete</button>
                                {/* <button className='btn btn-outline-primary btn-sm'>Add New Madde</button> */}
                            </div>
                        }
                        
                        <ContentEditable
                            key={index}
                            className='editable text-center font-weight-bold'
                            tagName='h4'
                            id={index}
                            html={pt.text}
                            disabled={editable}
                            name={`${t.id}_${index}_${t.type}`}
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

    prepareMaddeText = (t, nextMadde, prefix) => {
        const {editable, newMaddeArr} = this.state;
        let txtId = t.id.replace(':', '_');
        let addableMadde =[];
        switch(t.type){
            case 'madde':
                if(nextMadde){
                    let maddeNum = +t.id.split(':')[1].slice(1);
                    console.log('madde num ', maddeNum);
                    let nexMaddeNum = +nextMadde.id.split(':')[1].slice(1);
                    console.log('next madde num ', nexMaddeNum);
                    addableMadde = newMaddeArr.filter(madde => maddeNum < madde.num && madde.num < nexMaddeNum);
                    console.log('can be added ', addableMadde);
                }
                break;
            default:
                break;
        }
        let maddeText = t.text.map((mt, index, arr) => {
            const txt = `<span>${mt.text}</span>`;
            return (
                <Fragment key={index}>
                    {!editable &&
                        <div className='float-right pt-1 pr-1'>
                            <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, t.type, index)}>Update</button>
                            <button className='btn btn-outline-danger btn-sm mr-1' onClick={this.handleDelete.bind(this, t.id, 'text', index)}>Delete</button>
                            {arr.length - 1 === index && 
                                <AddTextFieldForm
                                    txtId={txtId}
                                    index={arr.length}
                                    handleAdd={this.handleAddNewTextField}
                                />
                            }
                        </div>
                    }
                    <ContentEditable
                        key={index}
                        className='editable'
                        tagName='p'
                        id={index}
                        html={txt}
                        disabled={editable}
                        name={`${t.id}_${index}_${t.type}`}
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
                        {(!nextMadde || (addableMadde.length !== 0)) &&
                            <button className='btn btn-outline-primary btn-sm ml-1'>Add New Madde</button>
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
                                <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, 'madde_baslik')}>Update</button>
                                <button className='btn btn-outline-danger btn-sm mr-1' onClick={this.handleDelete.bind(this, t.id, 'madde_baslik')}>Delete</button>
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
        console.log(text);
        // let lastMaddeId = '';
        let maddeArr = [];
        if(text.length !== 0){
            text.forEach((t, i) => {
                if(t.type === 'madde'){
                    maddeArr.push({
                        ...t,
                        index: i
                    });
                }
            });
            // lastMaddeId = maddeArr[maddeArr.length - 1].id;
        }
        console.log('maddeArr: ', maddeArr);
        let mevText = text.map((t, i) => {
            switch(t.type){
                case 'parent_title':
                    let firstParentMadde = text.find((txt, j) => j > i && txt.type === 'madde');
                    console.log('parent first madde', firstParentMadde);
                    
                    return this.prepareTitleText(t);

                case 'child_title':
                    return this.prepareTitleText(t);

                case 'madde':
                    let nextMadde = maddeArr.find(madde => madde.index > i);
                    console.log('next', nextMadde);
                    return this.prepareMaddeText(t, nextMadde, 'madde');

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
                <div className='container bg-white py-2'>
                    <nav className='navbar doc_navbar pl-0 pb-0 mb-2'>
                        <ul className='navbar-nav mr-auto flex-row'>
                            <li className='nav-item'>
                                <button className='nav-link index-button' data-toggle="collapse" data-target="#collapseIndex" aria-expanded="true" aria-controls="collapseIndex">
                                    Indexes
                                </button>
                            </li>
                            {/* <li className='nav-item mx-3'>
                                <button className='nav-link index-button' data-toggle="collapse" data-target="#collapseAddIndex" aria-expanded="true" aria-controls="collapseAddIndex">
                                    Add Index
                                </button>
                            </li> */}
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
                    {/* {mevDoc &&
                        <div id="collapseAddIndex" className="collapse">
                            <nav className='mb-2'>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Add Madde</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Add Ek Madde</a>
                                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Add Gecici Madde</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active container" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label htmlFor='newMaddeSelect'>
                                                Choose After Which Index:
                                            </label>
                                            <select className="custom-select" id="indexSelect">
                                                <option value='begin'>At The Beginning</option>
                                                {index.map((ind, i) => 
                                                    <option key={i} value={ind.madde_id}>
                                                        {ind.text}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor='newMaddeSelect'>
                                                Choose Madde:
                                            </label>
                                            <select className="custom-select" id="newMaddeSelect">
                                                {this.getAddableMaddeler(mevDoc.id)}
                                            </select>
                                        </div>
                                        <div className='col-6 my-3'>
                                            <button className='btn btn-success' onClick={this.handleAddNewMadde}>Add New Madde</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Laith</div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">Emad</div>
                            </div>
                        </div>
                    } */}
                    {/* <h5 className='font-weight-bold' data-toggle="collapse" data-target="#collapseIndex" aria-expanded="true" aria-controls="collapseIndex">Indexes:</h5> */}
                    
                </div>
                <div className='container bg-white my-2 py-3'>
                    {head !== '' &&
                        <h5>
                            <strong className='doc-title '>{head}</strong>
                            {editable ?
                                <button className='btn btn-outline-dark float-right' onClick={this.toggleEditable}>Enable Editing</button> :
                                <button className='btn btn-outline-danger float-right' onClick={this.toggleEditable}>Disable Editing</button>
                            }
                        </h5>
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

export default connect(mapStateToProps, {handleGetMevzuatDoc})(MevzuatDocsEdit);