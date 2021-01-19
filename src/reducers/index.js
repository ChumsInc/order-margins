import {combineReducers} from 'redux';
import app from './app';
import orders from './orders';
import settings from "./settings";

export default combineReducers({
    app,
    orders,
    settings,
});
