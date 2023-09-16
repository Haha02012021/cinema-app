import { Container, Grid } from "@mui/material";
import NowShowingMovies from "../partials/Cinema/NowShowingMovies";
import CinemaInfo from "../partials/Cinema/CinemaInfo";

export default function Cinema() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item sm={12} md={6}>
          <NowShowingMovies />
        </Grid>
        <Grid item sm={12} md={6}>
          <CinemaInfo />
        </Grid>
      </Grid>
    </Container>
  );
}
