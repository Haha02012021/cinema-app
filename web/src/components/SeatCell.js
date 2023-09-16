import { Button } from "@mui/material";
import { invertColor } from "../utils/color";

export default function SeatCell({
  content,
  onClick,
  note = true,
  backgroundColor,
  disabled = false,
}) {
  return (
    <Button
      onClick={onClick}
      sx={(theme) => ({
        height: "1.5rem",
        minWidth: "1.5rem",
        fontSize: ".75rem",
        p: 0,
        m: 0,
        backgroundColor: backgroundColor || "#FFFFFF",
        color: invertColor(backgroundColor ?? "#FFFFFF", true),
        boxShadow: !backgroundColor && "none",
        "&[disabled]": {
          color: invertColor(backgroundColor ?? "#FFFFFF", true),
        },
        [theme.breakpoints.down("sm")]: {
          minWidth: "1rem",
          height: "1rem",
          fontSize: ".5rem",
        },
      })}
      variant={content ? "outlined" : note ? "contained" : "text"}
      disabled={disabled}
    >
      {content}
    </Button>
  );
}
