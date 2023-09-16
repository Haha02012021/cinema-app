import { Container, Grid } from "@mui/material";
import MovieSelect from "../partials/BookTicket.js/MovieSelect";
import ShowtimeSelect from "../partials/BookTicket.js/ShowtimeSelect";
import { useState } from "react";

export default function BookTicket() {
  const [selectedMovie, setSelectedMovie] = useState();

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <MovieSelect onSelectMovie={handleSelectMovie} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ShowtimeSelect selectedMovie={selectedMovie} />
        </Grid>
      </Grid>
    </Container>
  );
}
