import { Button, Divider, Popover, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomSelectField from "../../../components/CustomSelectField";
import {
  GENRES,
  LANGUAGES,
  PRICE_RANGE_OPTIONS,
  RATING_RANGE_OPTIONS,
  REATEDS,
} from "../../../constants";
import { useEffect, useState } from "react";

export default function MovieFilter({ anchorEl, handleCloseFilter, onFilter }) {
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
              label={"Thể loại"}
              name={"genre"}
              multiple={true}
              register={register}
              options={GENRES.map((genre) => {
                return {
                  value: genre.name,
                  label: genre.name,
                };
              })}
              watch={watchAll.genre}
            />
            <CustomSelectField
              label={"Ngôn ngữ"}
              name={"language"}
              multiple={true}
              register={register}
              options={LANGUAGES.map((language) => {
                return {
                  value: language,
                  label: language,
                };
              })}
              watch={watchAll.language}
            />
          </Stack>
          <Stack spacing={2} direction={"row"}>
            <CustomSelectField
              label={"Giới hạn độ tuổi"}
              name={"rated"}
              register={register}
              options={REATEDS.map((rated) => {
                return {
                  value: rated.symbol,
                  label: rated.symbol,
                };
              })}
              multiple={true}
              watch={watchAll.rated}
            />
            <CustomSelectField
              label={"Đánh giá"}
              name={"rating"}
              register={register}
              options={RATING_RANGE_OPTIONS.map((ratingRange) => {
                return {
                  value: ratingRange,
                  label: ratingRange,
                };
              })}
              watch={watchAll.rating}
            />
          </Stack>
          <CustomSelectField
            label={"Giá vé"}
            name={"ticket"}
            register={register}
            options={PRICE_RANGE_OPTIONS.map((priceRange) => {
              return {
                value: priceRange,
                label: priceRange,
              };
            })}
            watch={watchAll.ticket}
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
