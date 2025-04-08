import * as React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItemText, CssBaseline, Box, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Barra de navegación superior */}
      <AppBar position="fixed" sx={{ backgroundColor:'black' }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>


      {/* Menú lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 220, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={() => navigate('/')}> 
            <ListItemText primary="SALIR" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Reportes" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 5 }}>Bienvenido al Dashboard</Typography>
        
        <Typography variant="body1">Bienvenido a tu panel de gestión, donde puedes acceder rápidamente a herramientas esenciales para optimizar tu experiencia.</Typography>
        <Typography variant='body1'>Desde aquí, puedes generar reportes, configurar ajustes y navegar entre secciones clave de la plataforma.</Typography>
        <p>Todo lo que necesitas, en un solo lugar. ¡Toma el control y gestiona con facilidad!</p>
      </Box>
    </Box>
  );
}
