import React from "react";
import { Paper, Typography, CardMedia, CardContent, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

export default function ContenidoEjercicios({ data }) {
  const navigate = useNavigate();

  return (
    <div>
      {data.length === 0 ? (
        <Typography variant="body1" style={{ textAlign: "center", marginTop: "20px" }}>
          No se encontraron ejercicios.
        </Typography>
      ) : (
        <Grid container spacing={3} style={{ padding: "20px" }}>
          {data.map((ejercicio) => (
            <Grid item xs={12} sm={6} md={4} key={ejercicio.id}>
              <Paper style={{ padding: "10px", textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={ejercicio.imageUrl || "https://via.placeholder.com/200?text=Ejercicio"}
                  alt={ejercicio.name}
                  style={{ borderRadius: "10px" }}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {ejercicio.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tipo: {ejercicio.class?.name || "No especificado"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dificultad: {ejercicio.rarity?.name || "No especificado"}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: 'black' }}
                  style={{ marginTop: "10px" }}
                  onClick={() => navigate(`/personajes/${ejercicio.id}`)} // Mantén esta ruta si ya está configurada en tu router
                >
                  Más información
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}