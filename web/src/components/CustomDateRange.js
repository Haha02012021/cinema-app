import { Stack } from "@mui/material";
import CustomDateField from "./CustomDateField";
import { useState } from "react";
import dayjs from "dayjs";

export default function CustomDateRange({
  startDate,
  endDate,
  views,
  onChangeStartDate,
  onChangeEndDate,
  format,
  minDate,
  maxDate,
}) {
  const [startD, setStartD] = useState(startDate);
  const [endD, setEndD] = useState(endDate);

  const handleChangeStartDate = (newValue) => {
    const newDate = dayjs(newValue);
    setStartD(newDate);
    onChangeStartDate(newDate);

    if (dayjs(endD).isBefore(newDate, "date")) {
      setEndD(newDate);
      onChangeEndDate(newDate);
    }
  };

  const handleChangeEndDate = (newValue) => {
    const newDate = dayjs(newValue);
    setEndD(newDate);
    onChangeEndDate(newDate);

    if (dayjs(startD).isAfter(newDate, "date")) {
      setStartD(newDate);
      onChangeStartDate(newDate);
    }
  };
  return (
    <Stack gap={{ xs: 2, sm: 8 }} direction={{ sm: "row" }}>
      <CustomDateField
        defaultValue={startD}
        onChange={handleChangeStartDate}
        label={"Từ"}
        helperText=""
        views={views}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
      />
      <CustomDateField
        defaultValue={endD}
        label={"Đến"}
        onChange={handleChangeEndDate}
        helperText=""
        views={views}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Stack>
  );
}
