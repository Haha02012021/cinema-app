import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { filterMovies } from "../../utils/movies";
import { IS_DATE } from "../../constants";
import { grey } from "@mui/material/colors";
import CustomListItem from "../../components/CustomListItem";

export default function MovieSelect({ onSelectMovie }) {
  const [nowShowingMovies, setNowShowingMovies] = useState();

  useEffect(() => {
    getMoviesData();
  }, []);

  const getMoviesData = async () => {
    const moviesData = await filterMovies({ showingStatus: IS_DATE.inRange });

    setNowShowingMovies(moviesData);
  };

  const handleClickMovie = (movie) => {
    onSelectMovie(movie);
  };
  return (
    <>
      <Typography
        component={"h2"}
        variant="h6"
        textTransform={"uppercase"}
        textAlign={"center"}
        sx={(theme) => ({
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.common.white,
          py: 1,
        })}
      >
        Chọn phim
      </Typography>
      <List width="100%" sx={{ pt: 0 }}>
        {nowShowingMovies?.map((nowShowingMovie) => {
          return (
            <CustomListItem
              key={nowShowingMovie.id}
              onClick={() => handleClickMovie(nowShowingMovie)}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width="100%"
              >
                <Stack direction={"row"} gap={2}>
                  <Box sx={{ width: 40 }}>
                    <img
                      src={nowShowingMovie.poster}
                      alt={nowShowingMovie.title}
                      style={{
                        maxWidth: "100%",
                        height: 60,
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    component={"h3"}
                    variant="p"
                    textTransform={"uppercase"}
                    sx={{ mt: 1 }}
                  >
                    {nowShowingMovie.title}
                  </Typography>
                </Stack>
                <Box
                  sx={(theme) => ({
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.secondary.main,
                    px: 1,
                    height: "fit-content",
                    textAlign: "center",
                    minWidth: "fit-content",
                  })}
                >
                  {nowShowingMovie.rated}
                </Box>
              </Stack>
            </CustomListItem>
          );
        })}
      </List>
    </>
  );
}
