import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { useContext, useEffect, useState } from "react";
import { filterMovies } from "../../utils/movies";
import { IS_DATE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import { LoadingContext } from "../../contexts/LoadingProvider";

export default function NowShowingMovies() {
  const [nowShowingMovies, setNowShowingMovies] = useState();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getNowComingMoviesData();
  }, []);

  const getNowComingMoviesData = async () => {
    setLoading(true);
    const nowComingMoviesData = await filterMovies({
      showingStatus: IS_DATE.inRange,
    });
    setLoading(false);
    setNowShowingMovies(nowComingMoviesData.slice(0, 3));
  };

  const handleClickMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSeeMore = (type) => {
    navigate(`/movies/${type}`);
  };
  return (
    <>
      <SectionTitle title={"Phim đang chiếu"} />
      <ImageList cols={1} gap={8}>
        {nowShowingMovies?.map((comingSoonMovie) => {
          return (
            <ImageListItem
              key={comingSoonMovie.id}
              onClick={() => handleClickMovie(comingSoonMovie.id)}
            >
              <img
                src={comingSoonMovie.poster}
                alt={comingSoonMovie.title}
                loading="lazy"
              />
              <ImageListItemBar title={comingSoonMovie.title} />
            </ImageListItem>
          );
        })}
      </ImageList>
      <Box sx={{ mt: 2 }}>
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
    </>
  );
}
