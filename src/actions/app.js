import {DISMISS_ALERT, SET_ALERT} from "../constants";

export const errorAlert = (err, action) => ({type: 'danger', alert: {title: err.name, message: err.message, count: 1, action}});

export const setAlert = ({type = 'warning', title = 'Oops!', message = 'There was an error', action}) => ({
    type: SET_ALERT,
    alert: {type, title, message, action, count: 1}
});

export const dismissAlert = (id) => ({type: DISMISS_ALERT, id});
