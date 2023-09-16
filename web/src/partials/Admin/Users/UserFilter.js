import { Button, Popover, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomSelectField from "../../../components/CustomSelectField";
import {
  AGE_RANGE_OPTIONS,
  SEX,
  TICKET_AMOUNT_RANGE_OPTIONS,
} from "../../../constants";

export default function UserFilter({ anchorEl, handleCloseFilter, onFilter }) {
  const [isFiltering, setIsFiltering] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const watchAll = watch();

  useEffect(() => {
    anchorEl && setIsFiltering(false);
  }, [anchorEl]);

  useEffect(() => {
    if (!anchorEl) {
      if (isFiltering) {
      } else {
        reset();
      }
    }
  }, [anchorEl, isFiltering]);

  const handleSubmitFilter = (data) => {
    onFilter(data);
    setIsFiltering(true);
  };
  const handleErrorFilter = (errors) => {};

  const handleReset = () => {
    onFilter({});
    reset();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleCloseFilter}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <form onSubmit={handleSubmit(handleSubmitFilter, handleErrorFilter)}>
        <Stack
          sx={{
            p: 4,
            width: "40vw",
          }}
          spacing={2}
        >
          <Typography variant="h5" component={"h3"} fontWeight={"bold"}>
            Lọc
          </Typography>
          <Stack spacing={2} direction={"row"}>
            <CustomSelectField
              label={"Giới tính"}
              name={"sex"}
              register={register}
              options={Object.entries(SEX).map(([key, value]) => {
                return {
                  value: key,
                  label: value,
                };
              })}
              watch={watchAll.sex}
            />
            <CustomSelectField
              label={"Độ tuổi"}
              name={"age"}
              register={register}
              options={AGE_RANGE_OPTIONS.map((ageRange) => {
                return {
                  value: ageRange,
                  label: ageRange,
                };
              })}
              watch={watchAll.age}
            />
          </Stack>
          <CustomSelectField
            label={"Đã mua (vé)"}
            name={"amount"}
            register={register}
            options={TICKET_AMOUNT_RANGE_OPTIONS.map((amountRange) => {
              return {
                value: amountRange,
                label: amountRange,
              };
            })}
            watch={watchAll.amount}
          />

          <Stack direction={"row"} spacing={2} justifyContent={"end"}>
            <Button variant="outlined" onClick={handleReset}>
              Bỏ lọc
            </Button>
            <Button type="submit" variant="contained">
              Lọc
            </Button>
          </Stack>
        </Stack>
      </form>
    </Popover>
  );
}
