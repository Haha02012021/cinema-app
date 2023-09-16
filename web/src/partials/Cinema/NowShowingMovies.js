import { useContext, useEffect, useState } from "react";
import CustomDateField from "../../components/CustomDateField";
import SectionTitle from "../../components/SectionTitle";
import { getShowsTimeOk, filterMovies, checkTimeOk } from "../../utils/movies";
import { IS_DATE } from "../../constants";
import { List, Stack, Typography } from "@mui/material";
import CustomListItem from "../../components/CustomListItem";
import dayjs from "dayjs";
import { BsClockHistory } from "react-icons/bs";
import BookTicketButton from "../../components/BookTicketButton";
import { getDate } from "../../utils/date";
import { LoadingContext } from "../../contexts/LoadingProvider";

export default function NowShowingMovies() {
  const [movies, setMovies] = useState();
  const [date, setDate] = useState(new Date());
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getMovies();
  }, [date]);

  const getMovies = async () => {
    setLoading(true);
    const ms = await filterMovies({ showingStatus: IS_DATE.inRange });
    setLoading(false);
    const msData = ms.filter((m) => {
      return getShowsTimeOk(m?.showsTimes, date)?.times?.length > 0;
    });
    setMovies(msData);
  };

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };
  return (
    <>
      <SectionTitle title={"Phim đang chiếu"} />
      <CustomDateField
        onChange={handleChangeDate}
        label={"Chọn ngày chiếu"}
        minDate={new Date()}
        defaultValue={date}
      />
      <List sx={{ px: 0 }}>
        {movies?.map((movie) => {
          return (
            <CustomListItem key={movie.id}>
              <Stack direction={"row"} gap={2}>
                <img
                  style={{
                    width: 100,
                  }}
                  src={movie.poster}
                  alt={movie.title}
                />
                <Stack gap={2}>
                  <Stack>
                    <Typography component={"h3"} variant="h6">
                      {movie.title}
                    </Typography>
                    <Stack direction={"row"} gap={4}>
                      <Typography>
                        {dayjs(movie.released).format("YYYY")}
                      </Typography>
                      <Stack direction={"row"} gap={1} alignItems={"center"}>
                        <BsClockHistory />
                        <Typography>{movie.runtime} phút</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                    {movie.showsTimes
                      ?.find((showTimes) => showTimes.date === getDate(date))
                      ?.times.map((time) => {
                        if (checkTimeOk(time.time, date)) {
                          return (
                            <BookTicketButton
                              key={time.time}
                              time={time}
                              date={getDate(new Date())}
                              movieId={movie.id}
                            />
                          );
                        }

                        return <></>;
                      })}
                  </Stack>
                </Stack>
              </Stack>
            </CustomListItem>
          );
        })}
      </List>
    </>
  );
}
