import { useEffect } from 'react';
import { TextField, Typography, Paper, Container, Grid, Button } from '@mui/material';
import { useCustomerStore } from "../store/customerStore";
import { Customer } from "../types/customer";
import { TypeOf, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const customerSchema = z.object({
    username: z.string().min(1, "Full name is required").max(100),
    address: z.string().min(10, "Address is required").max(100),
})

export type CustomerInput = TypeOf<typeof customerSchema>;

export default function Modify() {
    const { selectedCustomer, setSelectedCustomer } = useCustomerStore();
    const navigate = useNavigate();

    const methods = useForm<CustomerInput>({
        resolver: zodResolver(customerSchema),
        defaultValues: selectedCustomer ? {
            username: selectedCustomer.username,
            address: selectedCustomer.address
        } : {}
    });

    const { handleSubmit, register, formState: { errors } } = methods;

    useEffect(() => {
        console.log(selectedCustomer);
    }, [selectedCustomer]);

    const onHandleSubmit = (data: CustomerInput) => {
        setSelectedCustomer(data as Customer);
        console.log(data);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Customer: {selectedCustomer?.username}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                {...register('username')}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                {...register('address')}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="contained" color="primary" style={{ marginLeft: "30px" }} onClick={() => {
                                navigate("/");
                            }}>
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
