import { useState } from 'react';
import { TextField, Typography, Paper, Container, Grid, Button } from '@mui/material';

export default function AddCustomer() {
    const [customer, setCustomer] = useState({
        username: '',
        address: '',
        // Add other customer fields as needed
    });

    const handleChange = (e: any) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Add logic to submit the customer data
        console.log(customer);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Add New Customer
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={customer.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={customer.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Add more fields as needed */}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Customer
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
