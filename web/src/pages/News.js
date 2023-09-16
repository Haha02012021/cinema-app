import { Container, Grid } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import NowShowingMovies from "../partials/DefaultLayout/NowShowingMovies";
import NewsList from "../partials/News/NewsList";

export default function News() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <SectionTitle title={"Tin tức"} />
          <NewsList />
        </Grid>
        <Grid item xs={12} sm={3}>
          <NowShowingMovies />
        </Grid>
      </Grid>
    </Container>
  );
}
