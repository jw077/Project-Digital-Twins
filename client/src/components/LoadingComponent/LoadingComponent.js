import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
import { FILE_STATUS } from '../../actions/actionTypes';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: "white"
};

export default function LoadingComponent() {
    const fileUploadStatus = useSelector(state => state.PatientFileManagementReducer.fileUploadStatus);
    return (
        <div>
            <Modal
                open={fileUploadStatus === FILE_STATUS.PENDING}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid
                        container
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                    >
                        <Grid item xs={12}>
                            <CircularProgress />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Uploading
                            </Typography>
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
