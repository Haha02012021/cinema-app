import { Container, Grid } from "@mui/material";
import NowShowingMovies from "../partials/DefaultLayout/NowShowingMovies";
import Feedback from "../partials/Support/Feedback";

export default function Support() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <Feedback />
        </Grid>
        <Grid item xs={12} sm={3}>
          <NowShowingMovies />
        </Grid>
      </Grid>
    </Container>
  );
}
