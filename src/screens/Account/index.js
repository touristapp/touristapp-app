import React from 'react';
import ViewAccount from './ViewAccount'
import EditAccount from './EditAccount';

export default class Account extends React.Component {
    state = {
        currentScreen: "viewAccount"        
    }
    
    switchScreen = (screen) => {
        this.setState({
            currentScreen: screen
        })
    }
    
    render() {
        switch (this.state.currentScreen) {
            case 'viewAccount':
                return <ViewAccount switchScreen = {this.switchScreen}/>
            case 'editAccount':
                return <EditAccount switchScreen = {this.switchScreen}/>
            default:
                null
        }
    }
}