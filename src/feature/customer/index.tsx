import { Button } from '@material-ui/core'
import type { NextPage } from 'next'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Head from 'next/head';
import AddCustomer from './AddCustomer';
import { useState } from 'react';
import styles from './styles.module.css'
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 200
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        editable: true,
        resizable: true,
        width: 200

    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        editable: true,
        resizable: true,
        width: 200

    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        resizable: true,


        valueGetter: (params: GridValueGetterParams) =>
            `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`,
        width: 200
    },
];

const CustomerCrud: NextPage = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <Head>
                <title>Test</title>
            </Head>
            {/* <h1>Customers</h1> */}
            <Button variant="contained"
                className={styles.buttonAddCustomer}
                onClick={() => setShowModal(true)}
            >Add Customer</Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}

                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
            <AddCustomer showModal={showModal} handleClose={() => setShowModal(false)} />
        </div>
    )
}

export default CustomerCrud

