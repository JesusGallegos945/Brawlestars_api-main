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

  // API Key de API Ninjas (la que proporcionaste)
  const API_KEY = "7b1cWt7xADAom+zxzdCWFQ==VmV1cVGVgAIU2kCA";

  // Datos de ejercicios desde API Ninjas
  const obtenerEjercicios = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/exercises?muscle=biceps", // Ejemplo: filtrar por músculo
        {
          headers: { "X-Api-Key": API_KEY },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los ejercicios");
      }
      const result = await response.json();
      // Mapeamos los datos para adaptarlos a tu estructura (simulando brawlers)
      const ejerciciosAdaptados = result.map((ejercicio, index) => ({
        id: index,
        name: ejercicio.name,
        class: { name: ejercicio.type || "No especificado" }, // Tipo -> Clase
        rarity: { name: ejercicio.difficulty || "No especificado" }, // Dificultad -> Rareza
        imageUrl: `https://via.placeholder.com/200?text=${ejercicio.name}`, // Imagen placeholder (la API no incluye imágenes)
      }));
      setData(ejerciciosAdaptados);
    } catch (error) {
      console.error("Error:", error);
      setError("Error al cargar ejercicios. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al inicio
  useEffect(() => {
    obtenerEjercicios();
  }, []);

  // Filtrado (funcionalidad original)
  const brawlersFiltrados = data.filter((brawler) => {
    const coincideNombre = brawler.name.toLowerCase().includes(textoBuscar.toLowerCase());
    const coincideClass = filtroClass ? brawler.class.name.toLowerCase() === filtroClass.toLowerCase() : true;
    const coincideRarity = filtroRarity ? brawler.rarity.name.toLowerCase() === filtroRarity.toLowerCase() : true;
    return coincideNombre && coincideClass && coincideRarity;
  });

  return (
    <div>
      <h1>Encuentra tu próximo ejercicio</h1> {/* Cambiado de "brawler" a "ejercicio" */}

      {/* Barra de búsqueda (igual) */}
      <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <Paper component="form" sx={{ display: "flex", alignItems: "center", padding: "10px 20px", marginBottom: "20px", width: "800px" }}>
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Buscar ejercicio..."
            value={textoBuscar}
            onChange={(e) => setTextoBuscar(e.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      {/* Filtros adaptados para ejercicios */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        {/* Filtro de Tipo (antes Clase) */}
        <div style={{ width: "300px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Tipo de ejercicio</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  value={filtroClass}
                  onChange={(e) => setFiltroClass(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="strength">Fuerza</MenuItem>
                  <MenuItem value="cardio">Cardio</MenuItem>
                  <MenuItem value="stretching">Estiramiento</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* Filtro de Dificultad (antes Rareza) */}
        <div style={{ width: "300px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Dificultad</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  value={filtroRarity}
                  onChange={(e) => setFiltroRarity(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="beginner">Principiante</MenuItem>
                  <MenuItem value="intermediate">Intermedio</MenuItem>
                  <MenuItem value="expert">Avanzado</MenuItem>
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