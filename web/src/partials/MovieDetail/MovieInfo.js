import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editMovie, getMovieById } from "../../services/movieServices";
import {
  Box,
  Button,
  Rating,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import { arrayToString } from "../../utils/string";
import dayjs from "dayjs";
import SectionTitle from "../../components/SectionTitle";
import { BsClockHistory } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { USER_ROLE } from "../../constants";
import { editUser } from "../../services/userServices";
import { getDate } from "../../utils/date";

export default function MovieInfo({ movie }) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const auth = useSelector((state) => state.auth);
  const theme = useTheme();

  useEffect(() => {
    auth.user &&
      setUserRating(
        auth.user.votedMovies?.find((votedMovie) => votedMovie.id === movie.id)
          ?.rating,
      );
  }, [auth, movie.id]);

  useEffect(() => {
    movie && setRating(movie.rating);
  }, [movie]);

  const handleShowRating = () => {
    setShowRating(!showRating);
  };

  const handleChangeRating = async (e, newValue) => {
    let newVotes = movie.votes;
    let newVotedMovies = auth.user.votedMovies ? auth.user.votedMovies : [];

    if (userRating) {
      const votedMovie = newVotedMovies?.find(
        (votedMovie) => votedMovie.id === movie.id,
      );
      votedMovie.rating = newValue;
    } else {
      newVotes += 1;
      newVotedMovies.push({ id: movie.id, rating: newValue });
    }
    await editUser(auth.user.id, {
      ...auth.user,
      votedMovies: newVotedMovies,
    });

    const newRating =
      (rating * movie.votes - (userRating ? userRating : 0) + newValue) /
      newVotes;
    const newMovie = {
      ...movie,
      rating: newRating,
      votes: newVotes,
    };
    await editMovie(movie.id, newMovie);
    setRating(newRating);
    setUserRating(newValue);
    setShowRating(false);
  };
  return (
    <>
      {movie && (
        <Stack spacing={4}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
            <Image src={movie.poster} />
            <Stack gap={4}>
              <Typography
                component={"h2"}
                variant="h5"
                textTransform={"uppercase"}
              >
                {movie.title}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
                alignItems={{ sm: "center" }}
              >
                <Stack direction={"row"} gap={0.75} alignItems={"center"}>
                  <AiFillStar size={24} color={yellow[800]} />
                  <Stack gap={0}>
                    <Typography fontSize={"1.25rem"} lineHeight={"1"}>
                      {parseFloat(rating).toFixed(1)} / 10
                    </Typography>
                    <Typography fontSize={"0.75rem"}>
                      {movie.votes} lượt đánh giá
                    </Typography>
                  </Stack>
                </Stack>
                {auth?.user?.role === USER_ROLE && (
                  <Stack direction={"row"} gap={0.75} alignItems={"center"}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleShowRating}
                    >
                      Đánh giá
                    </Button>
                    {showRating && (
                      <Rating
                        value={userRating}
                        onChange={handleChangeRating}
                        max={10}
                      />
                    )}
                  </Stack>
                )}
              </Stack>
              <Stack spacing={1.25}>
                <Stack direction={"row"} alignItems={"center"} spacing={4}>
                  <Box
                    sx={{
                      color: theme.palette.common.white,
                      backgroundColor: theme.palette.secondary.main,
                      px: 1,
                    }}
                  >
                    {movie.rated}
                  </Box>
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <BsClockHistory />
                    {movie.runtime} phút
                  </Stack>
                </Stack>
                <Typography component={"p"} sx={{ display: "flex" }}>
                  <Typography component={"p"} sx={{ color: grey[600] }}>
                    Đạo diễn:&nbsp;
                  </Typography>
                  {movie.direction}
                </Typography>
                <Typography component={"p"} sx={{ display: "flex" }}>
                  <Typography
                    component={"p"}
                    sx={{ color: grey[600], minWidth: "fit-content" }}
                  >
                    Diễn viên:&nbsp;
                  </Typography>
                  {arrayToString(movie.actor)}
                </Typography>
                <Typography component={"p"} sx={{ display: "flex" }}>
                  <Typography component={"p"} sx={{ color: grey[600] }}>
                    Thể loại:&nbsp;
                  </Typography>
                  {arrayToString(movie.genre)}
                </Typography>
                <Typography component={"p"} sx={{ display: "flex" }}>
                  <Typography component={"p"} sx={{ color: grey[600] }}>
                    Quốc gia:&nbsp;
                  </Typography>
                  {movie.country}
                </Typography>
                <Typography component={"p"} sx={{ display: "flex" }}>
                  <Typography component={"p"} sx={{ color: grey[600] }}>
                    Ngày khởi chiếu:&nbsp;
                  </Typography>
                  {getDate(movie.startDate)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box>
            <SectionTitle title={"Nội dung phim"} />
            <Typography component={"p"}>
              {movie.plot ? movie.plot : "Chưa có nội dung phim!"}
            </Typography>
          </Box>
        </Stack>
      )}
    </>
  );
}

const Image = styled("img")(({ theme }) => {
  return {
    height: 380,
  };
});
