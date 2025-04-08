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
          No exercises found
        </Typography>
      ) : (
        <Grid container spacing={3} style={{ padding: "20px" }}>
          {data.map((exercise) => (
            <Grid item xs={12} sm={6} md={4} key={exercise.id}>
              <Paper style={{ padding: "10px", textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={exercise.imageUrl}
                  alt={exercise.name}
                  style={{ borderRadius: "10px" }}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {exercise.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Target: {exercise.class?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Equipment: {exercise.rarity?.name}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: 'black' }}
                  style={{ marginTop: "10px" }}
                  onClick={() => navigate(`/exercises/${exercise.id}`)}
                >
                  More Info
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}