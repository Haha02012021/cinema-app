import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

export default function SectionTitle({ title }) {
  const theme = useTheme();
  return (
    <Typography
      component={"h2"}
      sx={{
        textTransform: "uppercase",
        mb: "1.5rem",
        lineHeight: 2.5,
        fontWeight: "medium",
        "&:after": {
          content: '""',
          height: "1px",
          width: "4rem",
          display: "block",
          backgroundColor: theme.palette.primary.hoverText,
        },
      }}
    >
      {title}
    </Typography>
  );
}
