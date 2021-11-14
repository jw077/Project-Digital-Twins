import {
    UPDATE_PATIENT_FILE_LIST,
    UPDATE_FILE_UPLOAD_STATUS,
    DELETE_FILE_TWINS
} from "../actions/actionTypes";

import PatientFileManagementStore from "../store/PatientFileManagementStore";

const PatientFileManagementReducer = (state = PatientFileManagementStore, action) => {
    switch (action.type) {
        case UPDATE_PATIENT_FILE_LIST:
            return {
                ...state, ...{ uploadedFiles: { ...state.uploadedFiles, ...action.payload } }
            };
        case UPDATE_FILE_UPLOAD_STATUS:
            return {
                ...state, ...{ fileUploadStatus: action.payload }
            };
        case DELETE_FILE_TWINS:
            return {
                ...state, ...{ fileTwinsToDelete: action.payload }
            };
        default:
            return state;
    }
}

export default PatientFileManagementReducer;