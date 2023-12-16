import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, TableHead } from '@mui/material';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'; // Import from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useCustomerStore } from '../store/customerStore';
import { Customer } from '../types/customer';
import { useEffect, useState } from 'react';

/**
 * 
 * @returns A table of companies with their details for the search page
 */
function TableOfDetails() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const { setSelectedCustomer } = useCustomerStore();

    const navigate = useNavigate();
    const location = useLocation();
    const searchTerm = location.state.searchTerm.toString();
    console.log("Search term: ", searchTerm);

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/customer/${searchTerm}`, {
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
    }, []);

    return (
        <TableContainer style={{ minWidth: 220, minHeight: 220, width: '100%', height: '100%', borderRadius: 10 }}>
            <h1>
                <a style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>List of customers for the name: {searchTerm}</a>
            </h1>
            <Table sx={{ borderRadius: 10 }} aria-label="List Of Leaders">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="center">Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((row: Customer) => (
                        <TableRow
                            key={row._id}
                            onClick={() => {
                                setSelectedCustomer(row as Customer);
                                navigate(`/customer/${row.username}`, {
                                });
                            }}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                cursor: 'pointer',
                            }}
                        >
                            <TableCell align="left">
                                <AccountCircleIcon />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

/**
 * 
 * @returns The search page
 */
export default function Search() {

    return (
        <Container>
            <CssBaseline />

            <Typography fontFamily={"Poppins"} variant="h4" component="div" marginTop={5} marginLeft={7} marginBottom={5}>
                Search
            </Typography>

            <Grid container spacing={'3vh'} paddingBottom={'10vh'} paddingLeft={'10vh'} paddingRight={'10vh'} justifyContent="center">
                <Grid container spacing={3} justifyContent="space-between" marginTop={5}>
                    <Grid item xs={12} md={12} >
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 320,
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <TableOfDetails />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
