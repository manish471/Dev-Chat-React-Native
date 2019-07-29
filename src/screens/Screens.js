import {Navigation} from 'react-native-navigation';
import React from 'react';
import Home from './Home/Home';
import Channels from './Channels/Channels';
import Friends from './Friends/Friends';
import Profile from './Profile/Profile';
import Auth from './Auth/Auth';
import Initializing from './Initializing/Initializing';
import SideDrawer from './SideDrawer/SideDrawer';

import { Provider } from 'react-redux';
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import AddChannelModal from './Channels/AddChannelModal';
const store = createStore(rootReducer, composeWithDevTools());


const RNInitializing=()=>(
    <Provider store={store}>
        <Initializing/>
    </Provider>
);

const RNProfile=()=>(
    <Provider store={store}>
        <Profile/>
    </Provider>
);

const RNAddChannelModal=()=>(
    <Provider store={store}>
        <AddChannelModal/>
    </Provider>
);

const RNChannels=()=>(
    <Provider store={store}>
        <Channels/>
    </Provider>
);

const RNHome=()=>(
    <Provider store={store}>
        <Home/>
    </Provider>
);







// Register Screens
export function registerScreens() {
    
    Navigation.registerComponent('App.Initializing', () => RNInitializing);
    Navigation.registerComponent('App.Auth', () => Auth);
    Navigation.registerComponent('App.Home', () => RNHome);
    Navigation.registerComponent('App.Channels', () => RNChannels);
    Navigation.registerComponent('App.Friends', () => Friends);
    Navigation.registerComponent('App.Profile', () => RNProfile);
    Navigation.registerComponent('App.SideDrawer', () => SideDrawer);
    Navigation.registerComponent('App.AddChannelModal', () => RNAddChannelModal);



}