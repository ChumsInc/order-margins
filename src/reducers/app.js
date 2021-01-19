import {combineReducers} from 'redux';
import {DISMISS_ALERT, SET_ALERT} from "../constants";

const alertSort = (a, b) => a.id - b.id;

const alerts = (state = [], action) => {
    const {type, alert, id, status, err} = action;
    switch (type) {
    case SET_ALERT:
        if (alert.action) {
            const [existingAlert] = state.filter(a => a.action === alert.action);
            if (existingAlert) {
                existingAlert.count += 1;
            }
            return [
                ...state.filter(a => a.action !== alert.action),
                existingAlert || alert
            ].sort(alertSort);
        }
        return [...state, {...alert, count: 1, id: now()}].sort(alertSort);
    case DISMISS_ALERT:
        return [...state.filter(alert => alert.id !== id)].sort(alertSort);
    default:
        return state;
    }
};

export default combineReducers({
    alerts,
});
