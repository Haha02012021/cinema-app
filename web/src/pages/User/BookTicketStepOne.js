import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { useContext, useEffect, useMemo, useState } from "react";
import { getRoomsById } from "../../services/roomServices";
import SeatCell from "../../components/SeatCell";
import { grey } from "@mui/material/colors";
import { getMovieById } from "../../services/movieServices";
import { SEATS_TYPES, SEAT_STATUSES } from "../../constants";
import { toast } from "react-toastify";
import MovieCard from "../../partials/User/BookTicket/MovieCard";
import { getBoughtSeats } from "../../utils/tickets";
import { LoadingContext } from "../../contexts/LoadingProvider";

export default function BookTicketStepOne() {
  const { state } = useLocation();
  const [room, setRoom] = useState();
  const [movie, setMovie] = useState();
  const [selectingSeats, setSelectingSeats] = useState([]);
  const [boughtSeats, setBoughtSeats] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    state.time.room && getRoom();
    state.seats && setSelectingSeats(state.seats);
    if (state.movieId) {
      setLoading(true);
      getMovie();
      getBSeats();
      setLoading(false);
    }
  }, [state]);

  const getBSeats = async () => {
    const seats = await getBoughtSeats(state.movieId, {
      date: state.date,
      time: state.time,
    });
    setBoughtSeats(seats);
  };

  const getRoom = async () => {
    const r = await getRoomsById(state.time.room);

    setRoom(r);
  };

  const getMovie = async () => {
    const m = await getMovieById(state.movieId);

    setMovie(m);
  };

  const total = useMemo(() => {
    const sum = movie
      ? selectingSeats.reduce((s, seat) => {
          if (SEATS_TYPES.normal.rows.includes(seat.split("-")[0])) {
            return s + Number(movie.ticket) + SEATS_TYPES.normal.pricePlus;
          } else {
            return s + Number(movie.ticket) + SEATS_TYPES.vip.pricePlus;
          }
        }, 0)
      : 0;

    return sum;
  }, [selectingSeats, movie]);

  const handleSelectSeat = (cell) => {
    setSelectingSeats((prev) => {
      if (!prev.includes(cell)) return [...prev, cell];
      else return prev.filter((c) => c !== cell);
    });
  };

  const handleContinue = async () => {
    if (selectingSeats.length === 0) {
      toast.info("Vui lòng chọn ít nhất 1 ghế!");
    } else {
      const newTicket = {
        ...state,
        movie,
        seats: selectingSeats,
        total,
      };

      try {
        navigate("/book-ticket/step-2", {
          state: newTicket,
        });
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item sm={12} md={9}>
          <SectionTitle title={"Chọn ghế"} />
          {room && (
            <Paper sx={{ p: 2 }} square>
              <Stack gap={4}>
                <Stack gap={8} alignItems={"center"}>
                  <Stack
                    gap={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {room.seatsMatrix.map((rows) => {
                      const row = rows[0].split("-")[0];
                      return (
                        <Stack
                          key={row}
                          direction={"row"}
                          gap={{ sm: 1.5, md: 2 }}
                        >
                          <SeatCell content={row} disabled={true} />
                          {rows.map((cell) => {
                            const number = cell.split("-")[1];
                            const isBought = boughtSeats.includes(cell);

                            if (number > 0) {
                              return (
                                <SeatCell
                                  onClick={() => handleSelectSeat(cell)}
                                  content={number}
                                  disabled={isBought}
                                  backgroundColor={
                                    isBought
                                      ? SEAT_STATUSES.bought.color
                                      : selectingSeats.includes(cell)
                                      ? SEAT_STATUSES.isSelecting.color
                                      : SEAT_STATUSES.available.color
                                  }
                                />
                              );
                            }

                            return <SeatCell note={false} />;
                          })}
                          <SeatCell content={row} disabled={true} />
                        </Stack>
                      );
                    })}
                  </Stack>
                  <Typography
                    textAlign={"center"}
                    sx={(theme) => ({
                      borderBottom: `.25rem solid ${grey[600]}`,
                      width: 400,
                      [theme.breakpoints.down("sm")]: {
                        width: "80%",
                      },
                    })}
                  >
                    Màn hình
                  </Typography>
                </Stack>
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  gap={{ xs: 2, sm: 4 }}
                  justifyContent={"center"}
                >
                  {Object.entries(SEAT_STATUSES).map(([key, value]) => {
                    return (
                      <Stack direction={"row"} gap={2}>
                        <SeatCell note={true} backgroundColor={value.color} />
                        <Typography>{value.label}</Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </Stack>
            </Paper>
          )}
        </Grid>
        <Grid item sm={12} md={3}>
          {movie && (
            <MovieCard
              movie={movie}
              time={state?.time}
              date={state?.date}
              selectingSeats={selectingSeats}
              total={total}
              handleContinue={handleContinue}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
