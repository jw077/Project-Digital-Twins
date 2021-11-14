import React from 'react'
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { updatePatientFileList, deleteFileTwins } from "../../actions/PatientFileManagementAction";

const FileList = styled('div')(({ theme }) => ({
    backgroundColor: "#171717",
    color: "white"
}));

const PatientFileListComp = () => {
    const patientFileList = useSelector(state => state.PatientFileManagementReducer.uploadedFiles);
    const dispatch = useDispatch();
    const handlFileDelete = fileId => {
        const patientIds = patientFileList[fileId].patientList.map(p => p.PATIENTID);
        // delete patientFileList[fileId];
        // dispatch(updatePatientFileList(patientFileList));
        dispatch(deleteFileTwins({ patientIds, fileId }));
    }

    const fileComps = Object.keys(patientFileList).map(key => <ListItem
        key={uuidv4()}
        secondaryAction={
            <IconButton edge="end" aria-label="delete" color="primary" onClick={() => handlFileDelete(patientFileList[key].fileID)} >
                <DeleteIcon />
            </IconButton>
        }
    >
        <ListItemAvatar>
            <Avatar>
                <FolderIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={patientFileList[key].fileName}
            secondary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="white"
                    >
                        {`${patientFileList[key].patientList.length} patients`}
                    </Typography>

                </React.Fragment>
            }
        />
    </ListItem>);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FileList>
                        <List>
                            {fileComps}
                        </List>
                    </FileList>
                </Grid>
            </Grid>
        </div>
    )
}

export default PatientFileListComp
