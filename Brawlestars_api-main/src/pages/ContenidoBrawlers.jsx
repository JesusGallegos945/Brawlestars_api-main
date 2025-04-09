import React from "react";
import { Paper, Typography, CardMedia, CardContent, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

export default function ContenidoBrawlers({ data }) {
  const navigate = useNavigate();

  return (
    <div>
      {data.length === 0 ? (
        <Typography variant="body1" style={{ textAlign: "center", marginTop: "20px" }}>
          No se encontraron ejercicios.
        </Typography>
      ) : (
        <Grid container spacing={3} style={{ padding: "20px" }}>
          {data.map((brawler) => (
            <Grid item xs={12} sm={6} md={4} key={brawler.id}>
              <Paper style={{ padding: "10px", textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={brawler.imageUrl} // GIF real del ejercicio
                  alt={brawler.name}
                  style={{ borderRadius: "10px" }}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {brawler.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  Part of the body: {brawler.class?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Equipo: {brawler.rarity?.name}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: 'black' }}
                  style={{ marginTop: "10px" }}
                  onClick={() => navigate(`/personajes/${brawler.id}`)} // Ruta original
                >
                  More information
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}