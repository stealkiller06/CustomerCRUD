import React, { useEffect, useState, useMemo, useRef, MutableRefObject } from 'react'
import { Button } from '@material-ui/core'
import type { NextPage } from 'next'
import { DataGrid, GridApi, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import AddCustomer from './AddCustomer';
import styles from './styles.module.css'
import { Customer } from '@api/customer/types/customerType';
import { deleteCustomer, getCustomers } from '@api/customer/customerAPI';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Delete';
import { IconButton, Snackbar, Typography } from '@mui/material';
import ERPAlert from '@components/elements/ERPAlert';
import CloseIcon from '@mui/icons-material/Close';


const CustomerCrud: NextPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [currentCustomer, setCurrentCustomer] = useState<number | null>(null)
    const [successMessage, setSuccessMessage] = useState(false)
    const [loading, setLoading] = useState(false);

    function addCustomerToArray(customer: Customer) {
        setCustomers(customers => ([customer, ...customers]))
    }
    function onCustomerUpdated(customer: Customer) {
        if (currentCustomer == null) return;
        let newArray = [...customers];
        newArray.splice(currentCustomer, 1, customer)
        setCustomers(newArray)
    }
    async function onDeleteCustomer() {
        if (currentCustomer == null) return;
        const customer = customers[currentCustomer];
        await deleteCustomer(customer._id || "").then(res => {
            setShowConfirmationMessage(false)
            let newArray = [...customers];
            newArray.splice(currentCustomer, 1)
            setCustomers(newArray)
            setSuccessMessage(true)
        })
    }

    function selectCustomer(params: GridRenderCellParams) {
        const gridAPI: GridApi = params.api;
        const currentIndex = gridAPI.getRowIndex(params.id)
        setCurrentCustomer(currentIndex)
    }
    function editCustomer() {
        setShowModal(true)
    }
    const handleClose = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessMessage(false);
    };


    const columns: GridColDef[] = useMemo(() => [
        {
            field: 'firstname',
            headerName: 'First name',
            width: 200
        },
        {
            field: 'lastname',
            headerName: 'Last name',
            editable: true,
            width: 200

        },
        {
            field: 'address',
            headerName: 'Last Address added',
            flex: 1,
            valueGetter: getAddress,
            sortComparator: (v1, v2) => v1!.toString().localeCompare(v2!.toString()),

        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                <div>
                    <IconButton aria-label="edit" onClick={() => { selectCustomer(params); editCustomer() }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                        onClick={() => {
                            selectCustomer(params);
                            setShowConfirmationMessage(true)
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                </div>
            ),
        },
    ], [])

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    useEffect(() => {
        async function getAllCustomers() {
            await getCustomers().then(res => {
                setLoading(true)
                setCustomers(res)
            })
                .finally(() => {
                    setLoading(false)
                })
        }
        getAllCustomers()
    }, [])




    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
                Customer Maintenance
            </Typography>
            <Button
                variant="contained"
                className={styles.buttonAddCustomer}
                onClick={() => setShowModal(true)}
            >
                Add Customer
            </Button>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={customers}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <AddCustomer
                showModal={showModal}
                handleClose={() => { setCurrentCustomer(null); setShowModal(false) }}
                onCustomerUpdated={onCustomerUpdated}
                currentCustomer={currentCustomer != null ? customers[currentCustomer] : null}
                onCustomerAdded={addCustomerToArray}
            />

            <ERPAlert
                showAlert={showConfirmationMessage}
                title="Confirmation Message"
                content="Are you sure you want to delete this customer?"
                onAcceptPressed={() => onDeleteCustomer()}
                onCLosePressed={() => setShowConfirmationMessage(false)}
                onCancelPressed={() => setShowConfirmationMessage(false)}
            />
            <Snackbar
                open={successMessage}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Customer deleted successfully"
                action={action}
            />
        </div>
    )
}

function getAddress(params: GridValueGetterParams) {
    const customer = params.row;
    if (customer?.address?.length) {
        return customer.address[customer.address.length - 1]?.address;
    }
    return "No address added";
}

export default CustomerCrud

