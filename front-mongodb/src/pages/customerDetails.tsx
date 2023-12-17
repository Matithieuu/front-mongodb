import { Typography, Box, Paper, List, ListItem, ListItemText, Button, Container } from '@mui/material';
import { useCustomerStore } from '../store/customerStore';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @returns Customer details page
 */
export default function CompanyPage() {
    const { selectedCustomer } = useCustomerStore();
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ p: 3, mt: 3, width: '100%' }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                    Customer Details
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Username" secondary={selectedCustomer?.username} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Address" secondary={selectedCustomer?.address} />
                    </ListItem>
                </List>
            </Paper>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => navigate("/modify")}>
                    Modify
                </Button>

                <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => navigate("/")}>
                    Home
                </Button>
            </Box>
        </Container>
    );
}
