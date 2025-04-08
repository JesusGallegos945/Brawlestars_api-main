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
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSections, setShowSections] = useState({
    target: true,
    equipment: true,
    instructions: true
  });
  const API_KEY = "4ededf6e20msh42a206ad00ea931p1da74djsnafb999b34c28";

  const getYouTubeLink = (exerciseName) => {
    const searchQuery = encodeURIComponent(`${exerciseName} exercise tutorial`);
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  };

  const toggleSection = (section) => {
    setShowSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const fetchExercise = async () => {
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
        if (!response.ok) throw new Error("Exercise not found");
        const data = await response.json();
        setExercise({
          ...data,
          class: { name: data.bodyPart },
          rarity: { name: data.equipment || "bodyweight" },
          imageUrl2: data.gifUrl,
          youtubeLink: getYouTubeLink(data.name)
        });
      } catch (error) {
        setError("Error loading exercise. Please try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  if (loading) return <Typography sx={{ textAlign: "center", marginTop: 4 }}>Loading...</Typography>;
  if (error) return <Typography sx={{ textAlign: "center", marginTop: 4, color: "error.main" }}>{error}</Typography>;
  if (!exercise) return <Typography sx={{ textAlign: "center", marginTop: 4 }}>Exercise not found.</Typography>;

  return (
    <div>
      <Grid container spacing={4} padding={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CardMedia
              component="img"
              image={exercise.imageUrl2}
              alt={exercise.name}
              sx={{ borderRadius: "30px", width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
            />
            
            <Button
              variant="contained"
              color="error"
              startIcon={<YouTubeIcon />}
              href={exercise.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 2, width: "100%" }}
            >
              Watch on YouTube
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
              {exercise.name}
            </Typography>

            {/* Target Section */}
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={() => toggleSection('target')}
                endIcon={showSections.target ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                Target Muscle
              </Button>
              <Collapse in={showSections.target}>
                <Typography variant="body1" sx={{ fontSize: "20px", p: 1 }}>
                  {exercise.class.name}
                </Typography>
              </Collapse>
            </Box>

            {/* Equipment Section */}
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={() => toggleSection('equipment')}
                endIcon={showSections.equipment ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                Equipment
              </Button>
              <Collapse in={showSections.equipment}>
                <Typography variant="body1" sx={{ fontSize: "20px", p: 1 }}>
                  {exercise.rarity.name}
                </Typography>
              </Collapse>
            </Box>

            {/* Instructions Section */}
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={() => toggleSection('instructions')}
                endIcon={showSections.instructions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                Instructions
              </Button>
              <Collapse in={showSections.instructions}>
                <Typography variant="body1" sx={{ fontSize: "20px", p: 1 }}>
                  {exercise.instructions || "No instructions available."}
                </Typography>
              </Collapse>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}