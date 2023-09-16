import { Box } from "@mui/material";

export default function CustomTabPanel({
  children,
  value,
  index,
  style,
  innerPaddingX = "2rem",
  innerPaddingY = "3rem",
  ...other
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={style}
    >
      {value === index && (
        <Box sx={{ px: innerPaddingX, py: innerPaddingY }}>{children}</Box>
      )}
    </div>
  );
}
