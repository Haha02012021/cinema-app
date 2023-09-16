import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Modal,
  Paper,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { editMovie, getMovies } from "../../../services/movieServices";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import BookTicketButton from "../../../components/BookTicketButton";
import CustomDateField from "../../../components/CustomDateField";
import { getDate } from "../../../utils/date";
import weekday from "dayjs/plugin/weekday";
import { BiPlus, BiX } from "react-icons/bi";
import ShowTimesEdit from "../../../components/ShowTimesEdit";
import CustomDateRange from "../../../components/CustomDateRange";

dayjs.extend(weekday);
export default function ShowTimes({ open, onClose, movieId }) {
  const [movie, setMovie] = useState();
  const [showPlusDate, setShowPlusDate] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().startOf("w"));
  const [endDate, setEndDate] = useState(dayjs().endOf("w"));

  useEffect(() => {
    movieId && getMovieData();
  }, [movieId]);

  const getMovieData = async () => {
    const movieData = await getMovies({ id: movieId });

    if (movieData.length > 0) {
      setMovie(movieData[0]);
    } else {
      toast.error("Không tìm thấy phim!");
    }
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const handleChangeTimes = (newValue, date, isNew) => {
    setMovie((prev) => {
      const newMovie = {
        ...prev,
        showsTimes: [
          ...prev.showsTimes.filter((showsTime) => showsTime.date !== date),
          {
            date,
            times: newValue,
            new: isNew,
          },
        ].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      };
      return newMovie;
    });
  };

  const handleChangePlusDate = (newValue) => {
    setShowPlusDate(dayjs(newValue).format("YYYY-MM-DD"));
  };

  const handleSavePlusDate = () => {
    const checkExistDate = movie.showsTimes?.find((showsTime) =>
      dayjs(showsTime.date).isSame(dayjs(showPlusDate), "date"),
    );

    if (checkExistDate) {
      toast.info("Đã tồn tại lịch chiếu ngày này!");
    } else {
      setMovie((prev) => {
        return {
          ...prev,
          showsTimes: [
            ...(prev.showsTimes ?? []),
            {
              date: getDate(showPlusDate),
              new: true,
            },
          ].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          ),
        };
      });
      setShowPlusDate(false);
    }
  };

  const handleSaveShowTimes = async () => {
    const newMovie = {
      ...movie,
      showsTimes: movie.showsTimes.map((showsTime) => {
        return {
          date: showsTime.date,
          times: showsTime.times,
        };
      }),
    };
    try {
      await editMovie(movie.id, newMovie);
      onClose();
      toast.success("Cập nhật lịch chiếu thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="showtimes-dialog-title"
      aria-describedby="showtimes-modal-description"
      scroll="paper"
      fullWidth
    >
      <DialogTitle>Lịch chiếu</DialogTitle>
      <Divider />
      <DialogContent>
        {movie && (
          <CustomDateRange
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            minDate={new Date(movie.startDate)}
            maxDate={
              dayjs().isSame(dayjs().weekday(4), "date")
                ? dayjs().weekday(13)
                : dayjs().weekday(6)
            }
          />
        )}
        <Stack gap={2}>
          <List>
            {movie?.showsTimes
              ?.filter((showsTime) => {
                const date = new Date(showsTime.date).getTime();
                const start = new Date(startDate).getTime();
                const end = new Date(endDate).getTime();

                return date >= start && date <= end && !showsTime.new;
              })
              .map((showsTime, index) => {
                return (
                  <ListItem sx={{ px: 0 }} key={showsTime.date}>
                    <Stack gap={2}>
                      <Typography
                        sx={{
                          "&:first-letter": {
                            textTransform: "uppercase",
                          },
                        }}
                      >
                        {dayjs(showsTime.date).format("dddd, DD/MM/YYYY")}
                      </Typography>
                      <Stack
                        gap={2}
                        direction={"row"}
                        alignItems={"center"}
                        flexWrap={"wrap"}
                      >
                        <ShowTimesEdit
                          times={showsTime.times}
                          date={showsTime.date}
                          onChange={handleChangeTimes}
                        />
                      </Stack>
                    </Stack>
                  </ListItem>
                );
              })}
            <Divider>Mới</Divider>
            {movie?.showsTimes
              ?.filter((showsTime) => showsTime.new)
              .map((showsTime) => {
                return (
                  <ListItem sx={{ px: 0 }} key={showsTime.date}>
                    <Stack gap={2}>
                      <Typography
                        sx={{
                          "&:first-letter": {
                            textTransform: "uppercase",
                          },
                        }}
                      >
                        {dayjs(showsTime.date).format("dddd, DD/MM/YYYY")}
                      </Typography>
                      <Stack
                        gap={2}
                        direction={"row"}
                        alignItems={"center"}
                        flexWrap={"wrap"}
                      >
                        <ShowTimesEdit
                          times={showsTime.times}
                          date={showsTime.date}
                          onChange={handleChangeTimes}
                          isNew={showsTime.new}
                        />
                      </Stack>
                    </Stack>
                  </ListItem>
                );
              })}
          </List>
          <Box>
            <Tooltip title="Thêm lịch chiếu">
              <IconButton
                sx={(theme) => ({
                  float: "right",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.common.white,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    opacity: ".8",
                  },
                })}
                onClick={() => setShowPlusDate(dayjs().add(1, "day"))}
              >
                <BiPlus />
              </IconButton>
            </Tooltip>
          </Box>
          <Modal
            open={Boolean(showPlusDate)}
            onClose={() => setShowPlusDate(false)}
          >
            <Paper
              sx={(theme) => ({
                width: "25%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                p: 2,
                [theme.breakpoints.down("md")]: {
                  width: "40%",
                },
                [theme.breakpoints.down("sm")]: {
                  width: "84%",
                },
              })}
              square
            >
              <CustomDateField
                defaultValue={showPlusDate}
                onChange={handleChangePlusDate}
                label={"Ngày"}
                minDate={dayjs().add(1, "day")}
                maxDate={
                  dayjs().isSame(dayjs().weekday(4), "date")
                    ? dayjs().weekday(13)
                    : dayjs().weekday(6)
                }
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleSavePlusDate}
              >
                Lưu
              </Button>
            </Paper>
          </Modal>
          <Button variant="contained" fullWidth onClick={handleSaveShowTimes}>
            Lưu
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
