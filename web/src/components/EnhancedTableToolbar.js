import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { TbFilter, TbTrashFilled } from "react-icons/tb";

export default function EnhancedTableToolbar({
  title,
  numSelected,
  onDeleteAll,
  children,
  hasFilter = true,
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(onDeleteAll &&
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
      }}
    >
      {onDeleteAll && numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn {numSelected}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {onDeleteAll && numSelected > 0 ? (
        <Tooltip title="Xóa tất cả">
          <IconButton onClick={onDeleteAll}>
            <TbTrashFilled color={theme.palette.primary.hoverText} />
          </IconButton>
        </Tooltip>
      ) : (
        hasFilter && (
          <>
            <Tooltip title="Lọc">
              <IconButton onClick={handleOpenFilter}>
                <TbFilter />
              </IconButton>
            </Tooltip>
            {cloneElement(children, { anchorEl, handleCloseFilter })}
          </>
        )
      )}
    </Toolbar>
  );
}
