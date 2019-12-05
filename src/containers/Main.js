import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import Homepage from './Homepage'

const Main = props => {
    
    return (
        <div>
            <Switch>
                <Route
                    exact path='/' render={props => {
                        return(
                            <Homepage/>
                        );
                    }}
                />
            </Switch>
        </div>
    );
}

export default withRouter(Main);