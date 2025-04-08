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
import ExerciseGrid from "./ContenidoBrawlers";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [targetFilter, setTargetFilter] = useState("");
  const [equipmentFilter, setEquipmentFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "4ededf6e20msh42a206ad00ea931p1da74djsnafb999b34c28";

  const fetchExercises = async () => {
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
      if (!response.ok) throw new Error("Error loading exercises");
      const exercises = await response.json();
      
      const formattedExercises = exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        class: { name: exercise.bodyPart },
        rarity: { name: exercise.equipment || "bodyweight" },
        imageUrl: exercise.gifUrl,
      }));
      setData(formattedExercises);
    } catch (error) {
      setError("Failed to load exercises. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const filteredExercises = data.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesTarget = targetFilter ? exercise.class.name.toLowerCase() === targetFilter.toLowerCase() : true;
    const matchesEquipment = equipmentFilter ? exercise.rarity.name.toLowerCase() === equipmentFilter.toLowerCase() : true;
    return matchesSearch && matchesTarget && matchesEquipment;
  });

  return (
    <div>
      <h1>Find Your Next Exercise</h1>

      <Paper component="form" sx={{ display: "flex", alignItems: "center", padding: "10px 20px", marginBottom: "20px", width: "800px" }}>
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search exercises..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <div style={{ width: "300px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Target Area</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  value={targetFilter}
                  onChange={(e) => setTargetFilter(e.target.value)}
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

        <div style={{ width: "300px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Equipment</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
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

      <ExerciseGrid data={filteredExercises} />
    </div>
  );
}