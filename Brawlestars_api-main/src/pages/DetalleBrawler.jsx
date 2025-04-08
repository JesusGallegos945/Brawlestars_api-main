import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

export default function DetalleEjercicio() {
  let { id } = useParams();
  const [ejercicio, setEjercicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "7b1cWt7xADAom+zxzdCWFQ==VmV1cVGVgAIU2kCA";

  // Obtener detalles del ejercicio
  useEffect(() => {
    const obtenerDetalleEjercicio = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/exercises?id=${id}`, // Nota: API Ninjas no soporta buscar por ID directamente
          { headers: { "X-Api-Key": API_KEY } }
        );
        if (!response.ok) throw new Error("Error al obtener el ejercicio");
        const result = await response.json();
        // Simulamos un objeto similar a tu brawler original
        setEjercicio({
          ...result[0],
          class: { name: result[0].type || "No especificado" }, // Tipo -> Clase
          rarity: { name: result[0].difficulty || "No especificado" }, // Dificultad -> Rareza
          imageUrl2: `https://via.placeholder.com/400?text=${result[0].name}`, // Placeholder
        });
      } catch (error) {
        console.error("Error:", error);
        setError("Error al cargar el ejercicio. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    obtenerDetalleEjercicio();
  }, [id]);

  if (loading) return <Typography sx={{ textAlign: "center", marginTop: 4 }}>Cargando...</Typography>;
  if (error) return <Typography sx={{ textAlign: "center", marginTop: 4, color: "error.main" }}>{error}</Typography>;
  if (!ejercicio) return <Typography sx={{ textAlign: "center", marginTop: 4 }}>No se encontró el ejercicio.</Typography>;

  return (
    <div>
      <Grid container spacing={4} padding={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Imagen del ejercicio (placeholder) */}
            <CardMedia
              component="img"
              image={ejercicio.imageUrl2}
              alt={ejercicio.name}
              sx={{ borderRadius: "30px", width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.history.back()}
              sx={{ marginTop: "15px", width: "100%", fontSize: "20px", backgroundColor: 'black' }}
            >
              Volver
            </Button>
          </Paper>
        </Grid>

        {/* Detalles del ejercicio */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, borderRadius: "10px" }}>
            <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}>
              {ejercicio.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "20px" }}>
              <strong>Tipo:</strong> {ejercicio.class.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "20px" }}>
              <strong>Dificultad:</strong> {ejercicio.rarity.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "20px" }}>
              <strong>Músculo:</strong> {ejercicio.muscle || "No especificado"}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "20px" }}>
              <strong>Equipo:</strong> {ejercicio.equipment || "Ninguno"}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "20px" }}>
              <strong>Instrucciones:</strong> {ejercicio.instructions || "No disponibles."}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}