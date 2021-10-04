import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ERPAlertProps {
    showAlert: boolean;
    title?: string;
    content?: string;
    onCLosePressed?: () => void;
    onAcceptPressed?: () => void;
    onCancelPressed?: () => void;

}
export default function ERPAlert(props: ERPAlertProps) {
    const { content, onCLosePressed, showAlert, title, onAcceptPressed, onCancelPressed } = props;

    return (
        <Dialog
            open={showAlert}
            onClose={onCLosePressed}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {onCancelPressed && (
                    <Button onClick={onCancelPressed} autoFocus>
                        cancel
                    </Button>
                )}

                <Button onClick={onAcceptPressed} autoFocus>
                    ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
