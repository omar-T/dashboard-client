import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './Autocomplete.css'

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    }

    static defaultProps = {
        suggestions: []
    }

    constructor(props){
        super(props);
        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",
            chooseSuggestion: false
        }
    }

    // Event fired when the input value is changed
    onChange = e => {
        const { suggestions } = this.props;
        let userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(suggestion => 
            suggestion.name.toLocaleLowerCase('tr-TR').indexOf(userInput.toLocaleLowerCase('tr-TR')) > -1
        );
        // console.log(filteredSuggestions);
        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: false,
            chooseSuggestion: false,
            userInput: e.currentTarget.value
        });
    };

    // Event fired when the user clicks on a suggestion
    handleClick = (docId, e) => {
        const {handleClick} = this.props;
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            chooseSuggestion: false,
            userInput: e.currentTarget.innerText
        });

        handleClick(docId);
        // let isFound = suggestions.includes(e.target.innerText);
        // if(isFound){
        //     console.log(e.target.innerText);
        // }
    };

    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions, chooseSuggestion } = this.state;
        const {handleClick} = this.props;
        // User pressed the enter key, update the input and close the
        // suggestions
        console.log(filteredSuggestions.length);
        if (e.keyCode === 13) {
            if(!chooseSuggestion){
                this.setState({
                    activeSuggestion: 0,
                    showSuggestions: true,
                    chooseSuggestion: true,
                });
                console.log('show suggestions');
            }else if(chooseSuggestion && filteredSuggestions.length > 0){
                this.setState({
                    userInput: filteredSuggestions[activeSuggestion].name,
                    activeSuggestion: 0,
                    showSuggestions: false,
                    chooseSuggestion: false,
                });
                console.log('pick suggestion');
                const docId = document.querySelector('.suggestion-active').getAttribute('data-key');
                handleClick(docId);
            }
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                console.log('from inside if arrow top', activeSuggestion);
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion === filteredSuggestions.length - 1) {
                console.log('from inside if arrow bot', activeSuggestion);
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {onChange, handleClick, onKeyDown, state: {
            activeSuggestion,
            filteredSuggestions,
            showSuggestions,
            userInput
        }} = this;

        let suggestionsListComponent;

        if(showSuggestions && userInput){
            if(filteredSuggestions.length){
                suggestionsListComponent = (
                    <ul className='suggestions'>
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            
                            // Flag the active suggestion with a class
                            if(index === activeSuggestion){
                                className = 'suggestion-active'
                            }

                            return (
                                <li 
                                    className={className}
                                    key={suggestion.id}
                                    onClick={handleClick.bind(this, suggestion.id)}
                                    data-key={suggestion.id}
                                >
                                    {suggestion.name}
                                </li>
                            );
                        })}
                    </ul>
                )
            }else {
                suggestionsListComponent = (
                    <div className='no-suggestions'>
                        <em>No suggestions</em>
                    </div>
                )
            }
        }

        return (
            <Fragment>
                <input
                    className='pl-2'
                    id='mevSearch'
                    type='text'
                    placeholder='Search...'
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </Fragment>
        ) 
    }
}

export default Autocomplete;