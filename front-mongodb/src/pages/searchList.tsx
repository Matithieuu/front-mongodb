import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead } from '@mui/material';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'; // Import from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useCustomerStore } from '../store/customerStore';
import { Customer, newCustommer } from '../types/customer';

const initialCustomerData = {
    newCustommer,
};

/**
 * 
 * @returns A table of companies with their details for the search page
 */
function TableOfDetails() {

    const { setSelectedCustomer } = useCustomerStore();

    const navigate = useNavigate();
    const location = useLocation();
    const searchTerm = location.state.searchTerm.toString();
    console.log("Search term: ", searchTerm);

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
                    {initialCustomerData.newCustommer.map((row: Customer) => (
                        <TableRow
                            key={row._id}
                            onClick={() => {
                                setSelectedCustomer(row as Customer);
                                navigate(`/customer/${row._id}`, {
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
    if (initialCustomerData.newCustommer.length === 0) {
        return <div>Loading...</div>;
    }
    else if (initialCustomerData.newCustommer.length == null) {
        return <div>No customer found</div>;
    }
    else {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Typography fontFamily={"Poppins"} variant="h4" component="div" align="left" marginTop={10} marginLeft={7} marginBottom={5}>
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
                </Box>
            </Box>

        );
    }
}