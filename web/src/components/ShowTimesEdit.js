import { Box, Chip, IconButton } from "@mui/material";
import { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import CustomTimePicker from "./CustomTimePicker";
import dayjs from "dayjs";
import { getDate } from "../utils/date";

export default function ShowTimesEdit({ times = [], date, isNew, onChange }) {
  const [ts, setTs] = useState(times);
  const [showPlus, setShowPlus] = useState(false);

  const handleDeleteTime = (time) => {
    const newTs = ts
      .filter((t) => t.time !== time)
      .sort((a, b) => {
        return (
          new Date(`2002-09-21 ${a.time}`).getTime() -
          new Date(`2002-09-21 ${b.time}`).getTime()
        );
      });
    setTs(newTs);
    onChange(newTs, date, isNew);
  };

  const handlePlus = () => {
    setShowPlus(!showPlus);
  };

  const handlePlusValue = (newValue) => {
    setShowPlus(false);
    ts.push(newValue);
    setTs(
      ts.sort((a, b) => {
        return (
          new Date(`2002-09-21 ${a.time}`).getTime() -
          new Date(`2002-09-21 ${b.time}`).getTime()
        );
      }),
    );
    onChange(ts, date, isNew);
  };

  return (
    <>
      {ts?.map((time) => {
        return (
          <Chip
            key={time.time}
            label={`${time.time} | ${time.room}`}
            deleteIcon={
              new Date(date).getTime() >=
                new Date(getDate(dayjs().add(1, "day"))).getTime() &&
              new Date(date).getTime() <=
                new Date(dayjs(date).weekday(13)).getTime() ? (
                <BiX />
              ) : (
                <></>
              )
            }
            onDelete={() => handleDeleteTime(time.time)}
          />
        );
      })}
      {new Date(date).getTime() >=
        new Date(getDate(dayjs().add(1, "day"))).getTime() &&
        new Date(date).getTime() <=
          new Date(dayjs(date).weekday(13)).getTime() && (
          <Box>
            <IconButton onClick={handlePlus}>
              <BiPlus />
            </IconButton>
            <CustomTimePicker
              onSave={handlePlusValue}
              open={showPlus}
              onClose={() => setShowPlus(false)}
            />
          </Box>
        )}
    </>
  );
}
