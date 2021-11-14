import {
    UPDATE_PATIENT_FILE_LIST,
    UPDATE_FILE_UPLOAD_STATUS,
    DELETE_FILE_TWINS
} from "./actionTypes";

export const updatePatientFileList = (fileList) => {
    return { type: UPDATE_PATIENT_FILE_LIST, payload: fileList };
}

export const updateFileUploadStatus = (status) => {
    return { type: UPDATE_FILE_UPLOAD_STATUS, payload: status };
}

export const deleteFileTwins = (deleteInfrom) => {
    return { type: DELETE_FILE_TWINS, payload: deleteInfrom };
}