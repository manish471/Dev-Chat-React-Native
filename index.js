/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

import {Provider} from 'react-redux';
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./src/reducers";


const store = createStore(rootReducer, composeWithDevTools());



const RNredux=()=>(
    <Provider store={store}>
        <App/>
    </Provider>
);

AppRegistry.registerComponent('reactnativeapp1', () => RNredux);
