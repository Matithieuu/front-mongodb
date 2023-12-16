import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../store/customerStore";
import { Customer, newCustommer } from "../types/customer";
import { List, ListItem, ListItemText, Typography, Paper, Container, Tooltip, Button } from '@mui/material';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchAppBar from "../components/searchBar";

export default function Landing() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const { setSelectedCustomer } = useCustomerStore();
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/customers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setCustomers(data);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
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

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: "20px" }}>
                <SearchAppBar />
            </Paper>

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
