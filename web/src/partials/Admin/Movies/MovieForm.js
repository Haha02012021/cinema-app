import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createMovie,
  editMovie,
  getMovies,
} from "../../../services/movieServices";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import CustomFormControl from "../../../components/CustomFormControl";
import CustomDateField from "../../../components/CustomDateField";
import CustomSelectField from "../../../components/CustomSelectField";
import {
  COUNTRIES,
  GENRES,
  LANGUAGES,
  MESSAGES,
  REATEDS,
} from "../../../constants";
import dayjs from "dayjs";
import { getDate } from "../../../utils/date";

const createRatedOption = ({ symbol, note }) => {
  return {
    value: symbol,
    label: symbol,
  };
};

export default function MovieForm({ open, onClose, movieId }) {
  const [movie, setMovie] = useState();
  const [releasedDate, setReleasedDate] = useState({});
  const [showingDate, setShowingDate] = useState({});
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const watchGenre = watch("genre", null);
  const watchLanguage = watch("language", null);
  const watchRated = watch("rated", null);
  const watchCountry = watch("country", null);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (!movieId) return;
    getMovieData();
  }, [movieId]);

  useEffect(() => {
    movie && setDefaultForm();
  }, [movie]);

  const setDefaultForm = () => {
    setValue("poster", movie.poster);
    setValue("title", movie.title);
    setValue("genre", movie.genre);
    setValue("language", movie.language);
    setValue("direction", movie.direction);
    setValue("writer", movie.writer.join(", "));
    setValue("actor", movie.actor?.join(", "));
    setValue("runtime", movie.runtime);
    setValue("rated", movie.rated);
    setValue("ticket", movie.ticket);
    setValue("country", movie.country);
    setValue("plot", movie.plot);
    setReleasedDate((prev) => {
      return {
        ...prev,
        value: movie.released,
      };
    });
    setShowingDate((prev) => {
      return {
        ...prev,
        start: movie.startDate,
        end: movie.endDate,
      };
    });
  };

  const getMovieData = async () => {
    const movieData = await getMovies({ id: movieId });

    if (movieData.length > 0) {
      setMovie(movieData[0]);
    } else {
      toast.error("Không tìm thấy phim!");
    }
  };

  const handleKeyDownMultipleInput = (event, name) => {
    const newValue = event.target.value.trim();
    if (event.key === "Enter" && newValue.at(-1) !== ",") {
      event.preventDefault();
      setValue(name, event.target.value + ", ");
    }
  };

  const handleSubmitForm = async (data) => {
    const newMovie = {
      ...data,
      actor: data.actor.split(", "),
      writer: data.writer.split(", "),
      released: getDate(releasedDate.value),
      rating: movie?.rating ?? 0,
      votes: movie?.votes ?? 0,
    };

    if (showingDate.start) {
      if (showingDate.end) {
        newMovie.startDate = getDate(showingDate.start);
        newMovie.endDate = getDate(showingDate.end);
      } else {
        setError("endDate", {
          type: "required",
          message: MESSAGES.endDate.required,
        });
      }
    }
    if (showingDate.end && !showingDate.start) {
      setError("startDate", {
        type: "required",
        message: MESSAGES.startDate.required,
      });
    }
    if (!movieId) {
      try {
        await createMovie(newMovie);
        onClose();
        toast.success("Thêm phim mới thành công!");
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
    } else {
      try {
        await editMovie(movieId, newMovie);
        onClose(true);
        toast.success("Sửa phim thành công!");
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
    }
  };

  const handleErrorForm = (errors) => {
    for (const name in errors) {
      if (Object.hasOwnProperty.call(errors, name)) {
        const type = errors[name].type;
        setError(name, {
          type,
          message: MESSAGES[name][type],
        });
      }
    }
  };

  const handleChangeReleasedDate = (newDate) => {
    setReleasedDate({ value: newDate });
  };

  const handleChangeShowingDate = (newValue) => {
    setShowingDate((prev) => {
      return { ...prev, ...newValue };
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="movie-dialog-title"
      aria-describedby="modal-modal-description"
      scroll="paper"
      fullWidth
    >
      <DialogTitle id="movie-dialog-title">
        {!movieId ? "Phim mới" : "Sửa phim"}
      </DialogTitle>
      <DialogContent dividers>
        {!movieId || movie ? (
          <form
            onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
            noValidate
          >
            <Stack gap={4}>
              <Stack gap={2}>
                <CustomFormControl
                  name={"poster"}
                  label={"Link ảnh"}
                  type={"text"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  error={errors.poster}
                />
                <CustomFormControl
                  name={"title"}
                  label={"Tiêu đề"}
                  type={"text"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  error={errors.title}
                />
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
                  rules={{
                    required: true,
                  }}
                  watch={watchGenre}
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
                  rules={{
                    required: true,
                  }}
                  watch={watchLanguage}
                />
                <CustomFormControl
                  label={"Đạo diễn"}
                  type={"text"}
                  name={"direction"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                />
                <CustomFormControl
                  label={"Biên kịch"}
                  type={"text"}
                  name={"writer"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  onKeyDown={(event) =>
                    handleKeyDownMultipleInput(event, "writer")
                  }
                />
                <CustomFormControl
                  label={"Diễn viên"}
                  type={"text"}
                  name={"actor"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  onKeyDown={(event) =>
                    handleKeyDownMultipleInput(event, "actor")
                  }
                />
                <CustomSelectField
                  label={"Quốc gia"}
                  name={"country"}
                  multiple={false}
                  register={register}
                  options={COUNTRIES.map((country) => {
                    return {
                      value: country,
                      label: country,
                    };
                  })}
                  rules={{
                    required: true,
                  }}
                  watch={watchCountry}
                />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <CustomFormControl
                    fullWidth={true}
                    type={"number"}
                    label={"Thời lượng"}
                    register={register}
                    name={"runtime"}
                    endAdornment={"phút"}
                    rules={{
                      required: true,
                    }}
                  />
                  <CustomSelectField
                    label={"Giới hạn độ tuổi"}
                    name={"rated"}
                    register={register}
                    options={REATEDS.map((rated) => createRatedOption(rated))}
                    watch={watchRated}
                    rules={{
                      required: true,
                    }}
                  />
                </Stack>
                <CustomFormControl
                  fieldType="textarea"
                  label={"Giới thiệu"}
                  name={"plot"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                />
                <CustomDateField
                  label={"Ngày công chiếu"}
                  defaultValue={releasedDate.value}
                  onChange={handleChangeReleasedDate}
                />
                <CustomFormControl
                  fullWidth={true}
                  type={"number"}
                  label={"Giá vé"}
                  register={register}
                  name={"ticket"}
                  endAdornment={"đồng"}
                  rules={{
                    required: true,
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomDateField
                      label={"Ngày chiếu đầu tiên"}
                      defaultValue={showingDate.start}
                      onChange={(newDate) =>
                        handleChangeShowingDate({ start: newDate })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDateField
                      label={"Ngày chiếu cuối cùng"}
                      defaultValue={showingDate.end}
                      onChange={(newDate) =>
                        handleChangeShowingDate({ end: newDate })
                      }
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack direction={"row"} gap={2} justifyContent={"end"}>
                <Button variant="outlined" onClick={onClose}>
                  Bỏ qua
                </Button>
                <Button type="submit" variant="contained">
                  Lưu
                </Button>
              </Stack>
            </Stack>
          </form>
        ) : (
          <CircularProgress />
        )}
      </DialogContent>
    </Dialog>
  );
}
