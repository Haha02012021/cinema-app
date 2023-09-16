import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "dayjs/locale/vi";

export default function CustomDateField({
  defaultValue,
  error,
  onChange,
  label,
  width = "100%",
  helperText = "DD/MM/YYYY",
  minDate = null,
  maxDate = null,
  views,
  format,
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"vi"}>
      <DemoContainer sx={{ mt: "-8px" }} components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={handleChange}
          slotProps={{
            textField: {
              sx: {
                width: width,
                "& > .MuiInputBase-root": {
                  borderRadius: 0,
                },
              },
              helperText: error ? error : helperText,
              error: Boolean(error),
            },
          }}
          minDate={dayjs(minDate)}
          maxDate={dayjs(maxDate)}
          views={views}
          format={format}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
