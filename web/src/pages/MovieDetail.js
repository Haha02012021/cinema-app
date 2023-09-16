import NowShowingMovies from "../partials/DefaultLayout/NowShowingMovies";
import { Breadcrumbs, Container, Grid, Stack, Typography } from "@mui/material";
import MovieInfo from "../partials/MovieDetail/MovieInfo";
import MovieShowstime from "../partials/MovieDetail/MovieShowstime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieServices";
import { checkDateInRange } from "../utils/movies";
import { IS_DATE } from "../constants";
import CustomLink from "../components/CustomLink";

export default function MovieDetail() {
  const [movie, setMovie] = useState();
  const { movieId } = useParams();

  useEffect(() => {
    movieId && getMovieData();
  }, [movieId]);

  const getMovieData = async () => {
    const movie = await getMovieById(movieId);

    setMovie(movie);
  };
  return (
    <Container>
      <Stack gap={2}>
        {movie && (
          <Breadcrumbs>
            <CustomLink to="/">Trang chủ</CustomLink>
            <Typography>{movie.title}</Typography>
          </Breadcrumbs>
        )}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={9}>
            {movie && (
              <Stack gap={4}>
                <MovieInfo movie={movie} />
                {checkDateInRange(
                  new Date(),
                  movie.startDate,
                  movie.endDate,
                ) === IS_DATE.inRange && (
                  <MovieShowstime
                    showsTimes={movie.showsTimes}
                    movieId={movie.id}
                  />
                )}
              </Stack>
            )}
          </Grid>
          <Grid item xs={12} sm={3}>
            <NowShowingMovies />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
