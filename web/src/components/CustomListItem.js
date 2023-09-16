import { ListItem } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function CustomListItem({ children, onClick }) {
  return (
    <ListItem
      width="100%"
      sx={(theme) => ({
        border: `1px solid ${grey[200]}`,
        borderTop: 0,
        transition: "all 300ms ease",
        "&:hover": {
          backgroundColor: grey[100],
        },
      })}
      onClick={onClick}
    >
      {children}
    </ListItem>
  );
}
