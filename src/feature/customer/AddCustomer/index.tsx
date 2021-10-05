import React, { useState, useEffect } from 'react'
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import SaveIcon from '@mui/icons-material/Save';
import styles from './styles.module.css'
import { addCustomer, updateCustomer } from "@api/customer/customerAPI";
import ERPAlert from '@components/elements/ERPAlert';
import { Address, Customer } from '@api/customer/types/customerType';
import AddAddress from './AddAddress';

interface AddCustomerProps {
    showModal: boolean,
    handleClose: () => void,
    currentCustomer?: Customer | null,
    onCustomerAdded: (customer: Customer) => void,
    onCustomerUpdated: (customer: Customer) => void
}
const AddCustomer = (props: AddCustomerProps) => {
    const { showModal, handleClose, onCustomerAdded, currentCustomer, onCustomerUpdated } = props;
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState<Address[]>([{ address: "" }])
    const [showAlert, setShowAlert] = useState(false)

    async function save() {
        if (currentCustomer) {
            await updateCustomer({ firstname, lastname, address, _id: currentCustomer._id }).then(newCustomer => {
                setShowAlert(true)
                onCustomerUpdated({ ...newCustomer, address })
            })
        } else {
            await addCustomer({ firstname, lastname, address }).then(newCustomer => {
                setShowAlert(true)
                onCustomerAdded({ ...newCustomer, address })
            })
        }

    }
    function closeModal() {
        cleanForm()
        handleClose()
    }
    function cleanForm() {
        setFirstname("")
        setLastname("")
        setAddress([{ address: "" }])
    }


    useEffect(() => {
        if (currentCustomer && showModal) {
            setFirstname(currentCustomer.firstname)
            setLastname(currentCustomer.lastname)
            if (currentCustomer?.address?.length) {
                setAddress(currentCustomer.address)
            } else {
                setAddress([{ address: "" }])
            }
        }
    }, [currentCustomer, showModal])

    return (
        <>
            <Modal
                open={showModal}
                onClose={() => closeModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={(e) => { e.preventDefault(); save() }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {currentCustomer ? "Update" : "Add New"}  Customer
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            className={styles.inputStyle}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            label="Firstname"
                            required
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className={styles.inputStyle}
                            label="Lastname"
                            required
                            variant="outlined" />
                        <AddAddress address={address} onAddressChange={addr => setAddress(addr)} />
                        <Button
                            className={styles.buttonStyle}
                            variant="contained"
                            type="submit"
                            size="large"  >
                            <SaveIcon /> Save
                        </Button>
                    </form>
                </Box>
            </Modal>
            <ERPAlert
                title={`Customer ${currentCustomer ? 'Updated' : 'Added'}`}
                content={`The customer "${firstname} ${lastname}" was ${currentCustomer ? 'Updated' : 'Added'} successfully`}
                showAlert={showAlert}
                onCLosePressed={() => setShowAlert(false)}
                onAcceptPressed={() => {
                    cleanForm();
                    setShowAlert(false)
                    if (currentCustomer) {
                        handleClose()
                    }
                }}
            />
        </>
    )
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default AddCustomer;