import { IconButton, Tooltip } from "@mui/material";
import { BsCalendarWeek } from "react-icons/bs";

export default function ShowtimeButton({ movieId, onOpen }) {
  const handleClick = () => {
    onOpen(movieId);
  };
  return (
    <Tooltip title="Lịch chiếu">
      <IconButton aria-label="show-times" onClick={() => handleClick()}>
        <BsCalendarWeek />
      </IconButton>
    </Tooltip>
  );
}
