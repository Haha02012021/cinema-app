import { Paper, Stack } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import CustomDateField from "../../components/CustomDateField";
import { useEffect, useState } from "react";
import BookTicketButton from "../../components/BookTicketButton";
import { checkTimeOk, getShowsTimeOk } from "../../utils/movies";

export default function MovieShowstime({ showsTimes, movieId }) {
  const [date, setDate] = useState(new Date());
  const [showsTime, setShowsTime] = useState();

  useEffect(() => {
    const displayShowsTime = showsTimes && getShowsTimeOk(showsTimes, date);
    setShowsTime(displayShowsTime);
  }, [date]);

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  return (
    <Stack gap={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <SectionTitle title={"Lịch chiếu"} />
        <CustomDateField
          helperText=""
          defaultValue={date}
          onChange={handleChangeDate}
          minDate={new Date()}
        />
      </Stack>
      {showsTime ? (
        <Paper variant="outlined" sx={{ p: 4 }} square>
          <Stack direction={"row"} gap={2}>
            {showsTime.times
              ? showsTime.times?.map((time) => {
                  if (checkTimeOk(time.time, showsTime.date)) {
                    return (
                      <BookTicketButton
                        key={time.time}
                        time={time}
                        date={showsTime.date}
                        movieId={movieId}
                      />
                    );
                  }
                  return <></>;
                })
              : "Thời gian đã qua!"}
          </Stack>
        </Paper>
      ) : (
        "Không có lịch chiếu!"
      )}
    </Stack>
  );
}
