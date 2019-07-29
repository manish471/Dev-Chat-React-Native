import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      };
 
    default:
      return state;
  }
};

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel:false,
  userPosts:null,
  isLoading:true
};

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
        isLoading:false
      }
      case actionTypes.SET_CURRENT_CHANNEL_LOADER:
      return {
        ...state,
        isLoading:action.payload.isLoading
      }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default rootReducer;
