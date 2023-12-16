import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../store/customerStore";
import { Customer, newCustommer } from "../types/customer";
import { List, ListItem, ListItemText, Typography, Paper, Container, Tooltip, Button } from '@mui/material';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Landing() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const { setSelectedCustomer } = useCustomerStore();
    const navigate = useNavigate();

    useEffect(() => {
        setCustomers(newCustommer);
    }, [newCustommer]);

    const handleDelete = (id: string) => {
        console.log("User deleted: " + id + "");
        setCustomers(customers.filter(customer => customer._id !== id));
    }

    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Customers
            </Typography>
            <Paper elevation={3} style={{ maxHeight: 400, overflow: 'auto' }}>
                <List>
                    {customers.map(customer => (

                        <ListItem
                            key={customer._id}
                            style={{ marginBottom: 10 }}
                            onClick={() => {
                                setSelectedCustomer(customer);
                            }}
                        >
                            <Tooltip title="Edit" placement="left">
                                <ListItemText primary={customer.username} style={{ cursor: 'pointer', }} onClick={() => {
                                    navigate("/modify");
                                }} />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <DeleteIcon onClick={() => handleDelete(customer._id)} />
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={() => {
                navigate("/add");
            }}>
                Add Customer
            </Button>
        </Container>
    );
}
