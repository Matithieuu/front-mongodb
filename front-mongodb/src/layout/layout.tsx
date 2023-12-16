import { AppBar, Box, Grid, IconButton, Stack, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import React from 'react';
import SearchBar from '../components/searchBar';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Activez le mode sombre 
        primary: {
            main: '#1976D2', // Couleur principale (bleu)
        },
        secondary: {
            main: '#388E3C', // Couleur secondaire (vert)
        },
        background: {
            default: '#121212', // Couleur de fond par défaut (gris foncé)
            paper: '#333333', // Couleur de fond des panneaux (gris)
        },
        text: {
            primary: '#FFFFFF', // Couleur du texte principal (blanc)
            secondary: '#CCCCCC', // Couleur du texte secondaire (gris clair)
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976D2', // Couleur : bleu
        },
        secondary: {
            main: '#388E3C', // Couleur : vert
        },
        background: {
            default: '#FFFFFF', // Couleur : blanc
            paper: '#F5F5F5', // Couleur de fond des panneaux (gris clair)
        },
        text: {
            primary: '#000000', // Couleur : noir
            secondary: '#555555', // Couleur du texte secondaire (gris)
        },
    },
    typography: {
        fontFamily: "Poppins",
    },
});

function DarkModeToggle({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
    return (
        <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}

const Layout = ({ children }: Props) => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const [darkMode, setDarkMode] = React.useState(isDarkMode);
    const navigate = useNavigate();

    // Fonction pour activer/désactiver le mode sombre
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Box sx={{ display: 'block' }}>
                <AppBar position="absolute" style={{}}>

                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            <HomeIcon />
                        </IconButton>

                        <SearchBar />

                        {/* Utilisez le composant DarkModeToggle */}
                        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    </Toolbar>
                </AppBar>

                <Stack
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                    }}
                >
                    <Toolbar />

                    {children}

                </Stack>

                <footer style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "light" }}>
                    <Grid container direction="column" alignItems="center" sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                    }}>
                        <Grid item xs={12}>
                            <Typography color="black" variant="h5">
                                React + Fastify + MongoDB
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="textSecondary" variant="subtitle1">
                                {`${new Date().getFullYear()}  | Cazals | Muratet | Larbaoui | Yahia-Amar`}
                            </Typography>
                        </Grid>
                    </Grid>
                </footer>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
