import * as React from 'react';
// Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/system';
// Images
import SuccessImage from "../../assets/images/Success/Success_md.png";
import ErrorImage from "../../assets/images/Error/Error_md.png";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface Data {
    error: boolean,
    text: string
}

export interface Props {
    content: Data
}

export const InformativeModal = React.memo((props: Props) => {

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>

                    <Box sx={{ margin: "auto", mb: 3, width: "max-content" }} justifyContent="center" >
                        {
                            props.content.error ? <img src={ErrorImage} width={100} /> : <img src={SuccessImage} width={100} />
                        }
                    </Box>

                    <DialogContentText id="alert-dialog-slide-description">
                        {props.content.text}
                    </DialogContentText>

                </DialogContent>
            </Dialog>
        </>
    );
});