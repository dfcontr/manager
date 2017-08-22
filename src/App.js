import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCL8XIhlWPIeqw48an0kZ2T9-ApjFYbZSk',
            authDomain: 'manager-62b2b.firebaseapp.com',
            databaseURL: 'https://manager-62b2b.firebaseio.com',
            projectId: 'manager-62b2b',
            storageBucket: 'manager-62b2b.appspot.com',
            messagingSenderId: '974995957218'
        };

        firebase.initializeApp(config);
    }

    render() {
        // Arguments:
        // Reducer
        // Initial State
        // Store enhancers
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
