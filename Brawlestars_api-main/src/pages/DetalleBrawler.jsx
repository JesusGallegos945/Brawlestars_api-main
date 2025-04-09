import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  CardMedia,
  CardContent,
  Button,
  Grid,
  IconButton,
  Collapse,
  Link,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function DetalleBrawler() {
  const { id } = useParams();
  const [brawler, setBrawler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSections, setShowSections] = useState({
    bodyPart: true,
    equipment: true,
    instructions: true
  });
  const API_KEY = "4ededf6e20msh42a206ad00ea931p1da74djsnafb999b34c28";

  const getYouTubeLink = (exerciseName) => {
    const searchQuery = encodeURIComponent(`${exerciseName} ejercicio tutorial`);
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  };

  const toggleSection = (section) => {
    setShowSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const obtenerDetalleBrawler = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
          {
            headers: {
              "X-RapidAPI-Key": API_KEY,
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );
        if (!response.ok) throw new Error("Ejercicio no encontrado");
        const ejercicio = await response.json();
        setBrawler({
          ...ejercicio,
          class: { name: ejercicio.bodyPart },
          rarity: { name: ejercicio.equipment || "bodyweight" },
          imageUrl2: ejercicio.gifUrl,
          youtubeLink: getYouTubeLink(ejercicio.name)
        });
      } catch (error) {
        setError("Error al cargar el ejercicio. Intenta más tarde.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerDetalleBrawler();
  }, [id]);

  if (loading) return <Typography sx={{ textAlign: "center", marginTop: 4 }}>Cargando...</Typography>;
  if (error) return <Typography sx={{ textAlign: "center", marginTop: 4, color: "error.main" }}>{error}</Typography>;
  if (!brawler) return <Typography sx={{ textAlign: "center", marginTop: 4 }}>No se encontró el ejercicio.</Typography>;

  return (
    <div>
      <Grid container spacing={4} padding={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CardMedia
              component="img"
              image={brawler.imageUrl2}
              alt={brawler.name}
              sx={{ borderRadius: "30px", width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
            />
            
            <Button
              variant="contained"
              color="error"
              startIcon={<YouTubeIcon />}
              href={brawler.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 2, width: "100%" }}
            >
              Look at YouTube
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => window.history.back()}
              sx={{ marginTop: "15px", width: "100%", fontSize: "20px", backgroundColor: 'black' }}
            >
              Back
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, borderRadius: "10px" }}>
            <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}>
              {brawler.name}
            </Typography>

            {/* Sección Parte del cuerpo */}
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={() => toggleSection('bodyPart')}
                endIcon={showSections.bodyPart ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                Part of the body
              </Button>
              <Collapse in={showSections.bodyPart}>
                <Typography variant="body1" sx={{ fontSize: "20px", p: 1 }}>
                  {brawler.class.name}
                </Typography>
              </Collapse>
            </Box>

            {/* Sección Equipo */}
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={() => toggleSection('equipment')}
                endIcon={showSections.equipment ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                Equipo
              </Button>
              <Collapse in={showSections.equipment}>
                <Typography variant="body1" sx={{ fontSize: "20px", p: 1 }}>
                  {brawler.rarity.name}
                </Typography>
              </Collapse>
            </Box>

            {/* Sección Instrucciones */}
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={() => toggleSection('instructions')}
                endIcon={showSections.instructions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                Instrucions
              </Button>
              <Collapse in={showSections.instructions}>
                <Typography variant="body1" sx={{ fontSize: "20px", p: 1 }}>
                  {brawler.instructions || "No disponibles."}
                </Typography>
              </Collapse>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}