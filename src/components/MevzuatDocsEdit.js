import React, { Component, Fragment } from 'react'
import {Link, Element} from 'react-scroll'
import ContentEditable from 'react-contenteditable'
import './MevzuatDocsEdit.css'
// import SanitizeHtml from 'sanitize-html'
import {connect} from 'react-redux'
import {handleGetMevzuatDoc} from '../store/actions/foundDocs'

class MevzuatDocsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            head: '',
            text: [],
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
                    text: mevDoc.text
                });
                console.log(mevDoc);
            })
            .catch(err => {
                return;
            });
        console.log(docId);
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

    prepareTitleText = (t) => {
        const {editable} = this.state;
        let mainTitle = t.text.map((pt, index) => {
                // const title = `<strong>${pt.text}</strong>`;
                return (
                    <Fragment>
                        {!editable &&
                            <div className='float-right pt-1 pr-1'>
                                <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, t.type, index)}>Update</button>
                                <button className='btn btn-outline-danger btn-sm mr-1' onClick={this.handleDelete.bind(this, t.id, 'text', index)}>Delete</button>
                                <button className='btn btn-outline-primary btn-sm'>Add New Madde</button>
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

    prepareMaddeText = (t, prefix) => {
        const {editable} = this.state;
        let maddeText = t.text.map((mt, index) => {
            const txt = `<span'>${mt.text}</span>`;
            return (
                <Fragment>
                    {!editable &&
                        <div className='float-right pt-1 pr-1'>
                            <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, t.type, index)}>Update</button>
                            <button className='btn btn-outline-danger btn-sm mr-1' onClick={this.handleDelete.bind(this, t.id, 'text', index)}>Delete</button>
                            <button className='btn btn-outline-primary btn-sm'>Add New Madde</button>
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
                        <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, 'title')}>Update</button>
                        <button className='btn btn-outline-danger btn-sm mr-1' onClick={this.handleDelete.bind(this, t.id, 'title')}>Delete</button>
                        <button className='btn btn-outline-primary btn-sm'>Add New Madde</button>
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
                                <button className='btn btn-outline-primary btn-sm'>Add New Madde</button>
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
        const {head, text, editable} = this.state;
        const {mevDoc} = this.props.foundDocs;
        console.log(text);
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
        console.log(mevText);
        return (
            <div className='container-fluid'>
                <div className='container bg-white py-2'>
                    <nav className='navbar doc_navbar pl-0'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <button className='nav-link index-button' data-toggle="collapse" data-target="#collapseIndex" aria-expanded="true" aria-controls="collapseIndex">
                                    Indexes
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {mevDoc &&
                        <div id="collapseIndex" className="collapse">
                            <ul className='index text-center'>
                                {mevDoc.index.map(ind => 
                                    <li className='index-link'>
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
                    {/* <h5 className='font-weight-bold' data-toggle="collapse" data-target="#collapseIndex" aria-expanded="true" aria-controls="collapseIndex">Indexes:</h5> */}
                    
                </div>
                <div className='container bg-white my-2 py-3'>
                    {head !== '' &&
                        <h5>
                            <strong>{head}</strong>
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