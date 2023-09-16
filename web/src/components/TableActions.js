import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbEditCircle, TbTrashFilled } from "react-icons/tb";

export default function TableActions({
  onEdit,
  onDelete,
  onSeeDetail,
  children,
}) {
  const theme = useTheme();

  return (
    <>
      {(onDelete || onEdit || onSeeDetail || children) && (
        <Box display={"flex"}>
          {children}
          {onSeeDetail && (
            <Tooltip title="Xem chi tiết">
              <IconButton onClick={onSeeDetail} aria-label="see-detail">
                <BiMessageSquareDetail />
              </IconButton>
            </Tooltip>
          )}
          {onEdit && (
            <Tooltip title="Sửa">
              <IconButton onClick={onEdit} aria-label="edit">
                <TbEditCircle />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Xóa">
              <IconButton aria-label="delete">
                <TbTrashFilled
                  onClick={onDelete}
                  color={theme.palette.primary.hoverText}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </>
  );
}
