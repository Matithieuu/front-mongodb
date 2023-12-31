import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../store/customerStore";
import { Customer } from "../types/customer";
import { List, ListItem, ListItemText, Typography, Paper, Container, Tooltip, Button } from '@mui/material';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


/**
 * 
 * @returns Landing page with the list of customers
 */
export default function Landing() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const { setSelectedCustomer } = useCustomerStore();
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:8080/customers", {
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

    const deleteUser = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/customer/id/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Failed to delete customer:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = (id: string) => {
        deleteUser(id);
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
                            key={crypto.randomUUID()}
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
