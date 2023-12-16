import { TextField, Typography, Paper, Container, Grid, Button } from '@mui/material';
import { useCustomerStore } from "../store/customerStore";
import { TypeOf, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Customer } from '../types/customer';

const customerSchema = z.object({
    username: z.string().min(1, "Full name is required").max(100),
})

export type CustomerInput = TypeOf<typeof customerSchema>;

export default function Modify() {
    const { selectedCustomer, setSelectedCustomer } = useCustomerStore();
    const navigate = useNavigate();

    const modifyCustomer = async (updatedCustomer : Customer) => {
        try {
            const response = await fetch(`http://localhost:8080/customer`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: updatedCustomer._id, username: updatedCustomer.username }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setSelectedCustomer(updatedCustomer); // Mettre à jour l'état après la réponse réussie
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    const methods = useForm<CustomerInput>({
        resolver: zodResolver(customerSchema),
        defaultValues: selectedCustomer ? {
            username: selectedCustomer.username,
        } : {}
    });

    const { handleSubmit, register, formState: { errors } } = methods;

    const onHandleSubmit = (data: CustomerInput) => {
        if (selectedCustomer && selectedCustomer._id) {
            const updatedCustomer = { ...selectedCustomer, username: data.username };
            modifyCustomer(updatedCustomer);
        } else {
            console.error("Selected customer is not available.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: '20px' }}>
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
                            <Button variant="contained" color="primary" type='submit' >
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
