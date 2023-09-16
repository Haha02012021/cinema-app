import { Button, List, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import CustomListItem from "../../components/CustomListItem";
import BookTicketButton from "../../components/BookTicketButton";
import { checkTimeOk } from "../../utils/movies";

export default function ShowtimeSelect({ selectedMovie }) {
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
        Chọn suất
      </Typography>
      <List width="100%" sx={{ pt: 0 }}>
        {selectedMovie?.showsTimes
          ?.filter((showsTime) => {
            return (
              new Date(showsTime.date).getTime() >=
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
              ).getTime()
            );
          })
          .map((showsTime) => {
            return (
              <CustomListItem key={showsTime.date}>
                <Stack gap={2}>
                  <Typography
                    sx={{
                      "&::first-letter": {
                        textTransform: "capitalize",
                      },
                    }}
                  >
                    {dayjs(showsTime.date).format("dddd, DD/MM/YYYY")}
                  </Typography>
                  <Stack gap={2} direction={"row"}>
                    {showsTime.times.map((time) => {
                      if (checkTimeOk(time.time, showsTime.date)) {
                        return (
                          <BookTicketButton
                            key={time.time}
                            time={time}
                            date={showsTime.date}
                            movieId={selectedMovie.id}
                          />
                        );
                      }

                      return <></>;
                    })}
                  </Stack>
                </Stack>
              </CustomListItem>
            );
          }) || <CustomListItem> Không có suất chiếu</CustomListItem>}
      </List>
    </>
  );
}
