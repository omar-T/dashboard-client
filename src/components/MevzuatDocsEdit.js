import React, { Component, Fragment } from 'react'
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
                const title = `<h4 class='text-center' id='${index}'>${pt.text}</h4>`;
                return (
                    <Fragment>
                        {!editable &&
                            <div className='float-right pt-1 pr-1'>
                                <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, t.type, index)}>Update</button>
                                <button className='btn btn-outline-danger btn-sm' onClick={this.handleDelete.bind(this, t.id, 'text', index)}>Delete</button>
                            </div>
                        }
                        
                        <ContentEditable
                            key={index}
                            className='editable'
                            tagName='div'
                            id={index}
                            html={title}
                            disabled={editable}
                            name={`${t.id}_${index}_${t.type}`}
                        />
                    </Fragment>
                )
        });
        // console.log('Parent Title: ', mainTitle);
        return (
            <div key={t.id} id={t.id} onChange={this.handleChange}>
                {mainTitle}
                <br/>
            </div>
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
                            <button className='btn btn-outline-danger btn-sm' onClick={this.handleDelete.bind(this, t.id, 'text', index)}>Delete</button>
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
                        onChange={this.handleChange}
                    />
                </Fragment>
            )
        });
        return (
            <div key={t.id} id={t.id}>
                {!editable &&
                    <div className='float-right pt-1 pr-1'>
                        <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, 'title')}>Update</button>
                        <button className='btn btn-outline-danger btn-sm' onClick={this.handleDelete.bind(this, t.id, 'title')}>Delete</button>
                    </div>
                }
                <ContentEditable
                    id={`${prefix}Header`}
                    className='editable'
                    tagName='h4'
                    html={t.title}
                    disabled={editable}
                    name={`${t.id}_title`}
                    onChange={this.handleChange}
                />
                <hr/>
                {t.madde_baslik &&
                    <Fragment>
                        {!editable && 
                            <div className='float-right pt-1 pr-1'>
                                <button className='btn btn-outline-success btn-sm mr-1' onClick={this.handleUpdate.bind(this, t.id, 'madde_baslik')}>Update</button>
                                <button className='btn btn-outline-danger btn-sm' onClick={this.handleDelete.bind(this, t.id, 'madde_baslik')}>Delete</button>
                            </div>
                        }
                        <ContentEditable
                            id={`${prefix}Title`}
                            className='text-center editable'
                            tagName='h5'
                            html={t.madde_baslik.text}
                            disabled={editable}
                            name={`${t.id}_madde_baslik`}
                            onChange={this.handleChange}
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
                <div className='container bg-white py-3'>
                    {head !== '' &&
                        <h4>
                            <strong>{head}</strong>
                            {editable ?
                                <button className='btn btn-outline-dark float-right' onClick={this.toggleEditable}>Enable Editing</button> :
                                <button className='btn btn-outline-danger float-right' onClick={this.toggleEditable}>Disable Editing</button>
                            }
                        </h4>
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