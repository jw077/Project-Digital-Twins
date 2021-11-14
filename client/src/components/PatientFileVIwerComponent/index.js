import React from 'react'
import PatientFileUploadComp from "./PatientFileUploadComp";
import PatientFileListComp from './PatientFileListComp';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const PatientFileViewer = () => {
    const patientFileList = useSelector(state => state.PatientFileManagementReducer.uploadedFiles);
    return (
        <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
        >
            <LoadingComponent />
            <Grid item xs={12}>
                <PatientFileUploadComp />
            </Grid>
            <Grid item xs={12}>
                {Object.keys(patientFileList).length === 0 || <PatientFileListComp />}
            </Grid>
        </Grid>
    )
}

export default PatientFileViewer;
