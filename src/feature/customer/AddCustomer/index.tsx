import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import SaveIcon from '@mui/icons-material/Save';
import styles from './styles.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface AddCustomerProps {
    showModal: boolean,
    handleClose: () => void
}
const AddCustomer = (props: AddCustomerProps) => {
    const { showModal, handleClose } = props;
    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add New Customer
                </Typography>
                <TextField id="outlined-basic" className={styles.inputStyle} label="Firstname" variant="outlined" />
                <TextField id="outlined-basic" className={styles.inputStyle} label="Lastname" variant="outlined" />
                <TextField id="outlined-basic" className={styles.inputStyle} label="Firstname" variant="outlined" />

                <Button className={styles.buttonStyle} variant="contained" size="large"  >
                    <SaveIcon /> Save
                </Button>

            </Box>
        </Modal>
    )
}

export default AddCustomer;