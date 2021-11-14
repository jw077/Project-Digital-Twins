import { combineReducers } from 'redux'
import PatientFileManagementReducer from "./PatientFileManagementReducer";

const allReducers = combineReducers({
    PatientFileManagementReducer
});

const rootReducer = (state, action) => {
    return allReducers(state, action);
}

export default rootReducer;