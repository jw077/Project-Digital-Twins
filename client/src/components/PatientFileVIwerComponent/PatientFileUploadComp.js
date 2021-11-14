import React, { useState, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { updatePatientFileList, updateFileUploadStatus } from "../../actions/PatientFileManagementAction";
import { useDropzone } from 'react-dropzone';
import Grid from '@mui/material/Grid';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid';
import { createPatientTwins } from "../../services/PatientTwinsService";
import { FILE_STATUS } from '../../actions/actionTypes';

const fileDropDefaultMsg = "Drop or click to upload files";
let fileContent = {};

const PatientFileUploadComp = () => {
    const dispatch = useDispatch();
    const [fileUploadMsg, setFileUploadMsg] = useState(fileDropDefaultMsg);
    const [uploadControlDisplay, setUploadControlDisplay] = useState("none");

    const onDrop = useCallback((acceptedFiles) => {
        dispatch(updateFileUploadStatus(FILE_STATUS.PENDING));
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.error('file reading was aborted');
            reader.onerror = () => console.error('file reading has failed');
            reader.onload = () => {
                let newFile = {
                    fileID: uuidv4(),
                    fileName: file.name,
                    patientList: Papa.parse(reader.result, { header: true }).data
                }
                fileContent[newFile.fileID] = newFile;
                setFileUploadMsg(`${acceptedFiles.length} files uploaded`);
                setUploadControlDisplay("default");
                dispatch(updateFileUploadStatus(FILE_STATUS.COMPLETE));
            }
            reader.readAsText(file);
        });

    }, []);

    const handleConfirmFileUpload = () => {
        setFileUploadMsg(fileDropDefaultMsg);
        setUploadControlDisplay("none");
        dispatch(updatePatientFileList(fileContent));
        for (let file in fileContent) {
            createPatientTwins(fileContent[file].patientList);
        }
        dispatch(updateFileUploadStatus(FILE_STATUS.INIT));
    }

    const handleDiscardFileUpload = () => {
        setFileUploadMsg(fileDropDefaultMsg);
        setUploadControlDisplay("none");
        dispatch(updateFileUploadStatus(FILE_STATUS.INIT));
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div
                {...getRootProps()}>
                <input {...getInputProps()} />
                <Card sx={{
                    textAlign: 'center',
                    color: "white",
                    backgroundColor: "#171717",
                    borderRadius: "0px",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: "#243d6ad9"
                    }
                }}
                >
                    <CardContent>
                        <Typography>
                            <UploadFileIcon color="primary" />
                        </Typography>
                        <Typography sx={{ fontSize: 15 }} gutterBottom>
                            {fileUploadMsg}
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <Grid
                sx={{ display: uploadControlDisplay }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Grid item>
                    <Button size="small" onClick={handleConfirmFileUpload}>Confirm</Button>
                </Grid>
                <Grid item>
                    <Button size="small" onClick={handleDiscardFileUpload}>Discard</Button>
                </Grid>
            </Grid>
        </div>
    )
};

export default PatientFileUploadComp;
