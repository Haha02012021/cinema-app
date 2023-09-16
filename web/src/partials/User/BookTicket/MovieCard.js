import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { REATEDS } from "../../../constants";
import dayjs from "dayjs";
import { arrayToString } from "../../../utils/string";
import { formatNumber } from "../../../utils/number";
import { BiSolidRightArrowAlt } from "react-icons/bi";

export default function MovieCard({
  movie,
  time,
  date,
  selectingSeats,
  total,
  handleContinue,
}) {
  return (
    <Paper square sx={{ p: 2 }}>
      <Stack gap={1}>
        <img src={movie.poster} alt={movie.title} style={{ width: "100%" }} />
        <Typography
          component={"h3"}
          textTransform={"uppercase"}
          fontWeight={"medium"}
        >
          {movie.title}
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"end"}>
          <Box
            sx={(theme) => ({
              color: theme.palette.common.white,
              backgroundColor: theme.palette.secondary.main,
              px: 1,
              height: "fit-content",
              textAlign: "center",
              minWidth: "fit-content",
            })}
          >
            {movie.rated}
          </Box>
          <Typography fontStyle={"italic"} color={"error"} fontSize={".75rem"}>
            * {REATEDS.find((rated) => rated.symbol === movie.rated)?.note}
          </Typography>
        </Stack>
        <List>
          <ListItem sx={{ px: 0 }}>
            <Stack direction={"row"} gap={1}>
              <Typography fontSize={".8rem"} fontWeight={"medium"}>
                Phòng:{" "}
              </Typography>
              <Typography fontSize={".8rem"}>{time?.room}</Typography>
            </Stack>
          </ListItem>
          <Divider />
          <ListItem sx={{ px: 0 }}>
            <Stack direction={"row"} gap={1}>
              <Typography fontWeight={"medium"} fontSize={".8rem"} minWidth={"fit-content"}>
                Suất chiếu:{" "}
              </Typography>
              <Typography sx={{}} fontSize={".8rem"}>
                {time?.time} |&nbsp;
                <Typography
                  sx={{
                    "&::first-letter": {
                      textTransform: "capitalize",
                    },
                    display: "inline-block",
                  }}
                  fontSize={".8rem"}
                >
                  {dayjs(date).format("dddd, DD/MM/YYYY")}
                </Typography>
              </Typography>
            </Stack>
          </ListItem>
          <Divider />
          <ListItem sx={{ px: 0 }}>
            <Stack direction={"row"} gap={1}>
              <Typography fontWeight={"medium"} fontSize={".8rem"}>
                Ghế:{" "}
              </Typography>
              <Typography sx={{}} fontSize={".8rem"}>
                {arrayToString(selectingSeats)}
              </Typography>
            </Stack>
          </ListItem>
          <Divider />
          <ListItem sx={{ px: 0 }}>
            <Stack direction={"row"} gap={1}>
              <Typography fontWeight={"medium"} fontSize={"1.25rem"}>
                Tổng:{" "}
              </Typography>
              <Typography sx={{}} fontSize={"1.25rem"}>
                {formatNumber(total)} VNĐ
              </Typography>
            </Stack>
          </ListItem>
        </List>
        {handleContinue && (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: "fit-content",
                float: "right",
              }}
              endIcon={<BiSolidRightArrowAlt />}
              onClick={handleContinue}
            >
              Tiếp tục
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
