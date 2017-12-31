import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/Store/Store';
import RootNavigation from './src/Components/Navigation/RootNavigation';

const store = configureStore();

console.log('####### CURENT STORE #######');
console.log(store);
console.log('####### CURENT STORE #######');

const App = () => (
    <Provider store={store}>
        <RootNavigation />
    </Provider>

);

export default App;
