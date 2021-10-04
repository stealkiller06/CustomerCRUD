import React, { useState } from 'react'
import { Address, Customer } from '@api/customer/types/customerType';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import styles from './styles.module.css'
interface AddAddressProps {
    address: Address[],
    onAddressChange: (address: Address[]) => void
}
export default function AddAddress(props: AddAddressProps) {
    const { address, onAddressChange } = props;

    function handleAddressChange(addr: string, index: number) {
        let addressToUpdate = address[index];
        if (addressToUpdate) {
            address[index] = { ...addressToUpdate, address: addr };
        }
        onAddressChange([...address])
    }

    function addNewInput() {
        address.push({ address: "" })
        onAddressChange([...address])
    }
    function removeInput(index: number) {
        onAddressChange(address.filter((addr, i) => index != i))
    }

    return (
        <>
            {address.map((addr, index) => (
                <div
                    className={styles.inputContainer}
                    key={index}
                >
                    <TextField
                        id="outlined-basic"
                        required
                        className={styles.inputStyle}
                        value={addr.address}
                        onChange={(e) => handleAddressChange(e.target.value, index)}
                        label={`Address ${index + 1}`} variant="outlined" />
                    {(index == address.length - 1) && (
                        <IconButton aria-label="add" onClick={() => addNewInput()} >
                            <AddIcon />
                        </IconButton>
                    )}
                    {address.length > 1 && (
                        <IconButton aria-label="delete" color="error" onClick={() => removeInput(index)}>
                            <RemoveIcon />
                        </IconButton>
                    )}
                </div>
            ))}

        </>
    )
}

