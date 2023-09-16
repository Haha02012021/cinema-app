import { useContext, useEffect, useState } from "react";
import { filterMovies } from "../../utils/movies";
import { IS_DATE } from "../../constants";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomTabPanel from "../../components/CustomTabPanel";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import CustomTabs from "../../components/CustomTabs";
import { LoadingContext } from "../../contexts/LoadingProvider";

export default function MoviesList({ seeMore = false }) {
  const [nowShowingMovies, setNowShowingMovies] = useState();
  const [comingSoonMovies, setComingSoonMovies] = useState();
  const [value, setValue] = useState(IS_DATE.inRange);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { type } = useParams();
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (type === "coming-soon") {
      setValue(IS_DATE.afterRange);
    } else if (type === "now-showing") {
      setValue(IS_DATE.inRange);
    }
  }, [type]);

  useEffect(() => {
    getData();
  }, []);

  const getNowShowingMovies = async () => {
    const movies = await filterMovies({ showingStatus: IS_DATE.inRange });

    if (seeMore) {
      setNowShowingMovies(movies.slice(0, 6));
    } else {
      setNowShowingMovies(movies);
    }
  };

  const getComingSoonMovies = async () => {
    const movies = await filterMovies({ showingStatus: IS_DATE.afterRange });

    if (seeMore) {
      setComingSoonMovies(movies.slice(0, 6));
    } else {
      setComingSoonMovies(movies);
    }
  };

  const getData = async () => {
    setLoading(true);
    await getNowShowingMovies();
    await getComingSoonMovies();
    setLoading(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSeeMore = (type) => {
    navigate(`/movies/${type}`);
  };

  const handleClickMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <CustomTabs
        value={value}
        onChange={handleChange}
        tabs={[
          {
            label: "Phim đang chiếu",
            index: IS_DATE.inRange,
          },
          {
            label: "Phim sắp chiếu",
            index: IS_DATE.afterRange,
          },
        ]}
      />
      <CustomTabPanel
        value={value}
        index={IS_DATE.inRange}
        innerPaddingX="0"
        innerPaddingY="1rem"
      >
        <Stack gap={2}>
          <ImageList cols={matchDownSm ? 2 : 3} gap={8}>
            {nowShowingMovies?.map((nowShowingMovie) => {
              return (
                <ImageListItem
                  key={nowShowingMovie.id}
                  onClick={() => handleClickMovie(nowShowingMovie.id)}
                >
                  <img
                    src={`${nowShowingMovie.poster}`}
                    alt={nowShowingMovie.title}
                    loading="lazy"
                  />
                  <ImageListItemBar title={nowShowingMovie.title} />
                </ImageListItem>
              );
            })}
          </ImageList>
          {seeMore && (
            <Box>
              <Button
                variant="outlined"
                sx={{ float: "right" }}
                size="large"
                color="secondary"
                endIcon={<BiSolidRightArrowAlt />}
                onClick={() => handleSeeMore("now-showing")}
              >
                Xem thêm
              </Button>
            </Box>
          )}
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={IS_DATE.afterRange}
        innerPaddingX="0"
        innerPaddingY="1rem"
      >
        <Stack gap={2}>
          <ImageList cols={matchDownSm ? 2 : 3} gap={8}>
            {comingSoonMovies?.map((comingSoonMovie) => {
              return (
                <ImageListItem
                  key={comingSoonMovie.id}
                  onClick={() => handleClickMovie(comingSoonMovie.id)}
                >
                  <img
                    src={`${comingSoonMovie.poster}`}
                    alt={comingSoonMovie.title}
                    loading="lazy"
                  />
                  <ImageListItemBar title={comingSoonMovie.title} />
                </ImageListItem>
              );
            })}
          </ImageList>
          {seeMore && (
            <Box>
              <Button
                variant="outlined"
                sx={{ float: "right" }}
                size="large"
                color="secondary"
                endIcon={<BiSolidRightArrowAlt />}
                onClick={() => handleSeeMore("coming-soon")}
              >
                Xem thêm
              </Button>
            </Box>
          )}
        </Stack>
      </CustomTabPanel>
    </>
  );
}
