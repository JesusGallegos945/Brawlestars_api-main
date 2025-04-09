import React, { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContenidoBrawlers from "./ContenidoBrawlers";

export default function HomePage() {
  const [textoBuscar, setTextoBuscar] = useState("");
  const [filtroClass, setFiltroClass] = useState("");
  const [filtroRarity, setFiltroRarity] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Key de RapidAPI (ExerciseDB) - Usando tu key directamente
  const API_KEY = "4ededf6e20msh42a206ad00ea931p1da74djsnafb999b34c28";

  // Obtener ejercicios
  const obtenerBrawlers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises?limit=50",
        {
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) throw new Error("Error al cargar ejercicios");
      const ejercicios = await response.json();
      
      // Adaptar datos a tu estructura de "brawlers"
      const brawlersAdaptados = ejercicios.map((ejercicio) => ({
        id: ejercicio.id,
        name: ejercicio.name,
        class: { name: ejercicio.bodyPart }, // bodyPart -> class
        rarity: { name: ejercicio.equipment || "bodyweight" }, // equipment -> rarity
        imageUrl: ejercicio.gifUrl, // GIF del ejercicio
      }));
      setData(brawlersAdaptados);
    } catch (error) {
      setError("No se pudieron cargar los ejercicios. Intenta más tarde.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerBrawlers();
  }, []);

  // Filtrado (original + solo ejercicios con imágenes)
  const brawlersFiltrados = data.filter((brawler) => {
    const coincideNombre = brawler.name.toLowerCase().includes(textoBuscar.toLowerCase());
    const coincideClass = filtroClass ? brawler.class.name.toLowerCase() === filtroClass.toLowerCase() : true;
    const coincideRarity = filtroRarity ? brawler.rarity.name.toLowerCase() === filtroRarity.toLowerCase() : true;
    return coincideNombre && coincideClass && coincideRarity;
  });

  return (
    <div>
      <h1>Find your next exercise</h1>

      {/* Barra de búsqueda (original) */}
      <Paper component="form" sx={{ display: "flex", alignItems: "center", padding: "10px 20px", marginBottom: "20px", width: "800px" }}>
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search for exercise..."
          value={textoBuscar}
          onChange={(e) => setTextoBuscar(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Filtros (originales, adaptados a ejercicios) */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        {/* Filtro de Clase (ahora: parte del cuerpo) */}
        <div style={{ width: "300px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Part of the body</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  value={filtroClass}
                  onChange={(e) => setFiltroClass(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="chest">Chest</MenuItem>
                  <MenuItem value="back">Back</MenuItem>
                  <MenuItem value="arms">Arms</MenuItem>
                  <MenuItem value="legs">Legs</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* Filtro de Rareza (ahora: equipamiento) */}
        <div style={{ width: "300px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>equipment</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  value={filtroRarity}
                  onChange={(e) => setFiltroRarity(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="bodyweight">Bodyweight</MenuItem>
                  <MenuItem value="dumbbell">Dumbbell</MenuItem>
                  <MenuItem value="barbell">Barbell</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <ContenidoBrawlers data={brawlersFiltrados} />
    </div>
  );
}