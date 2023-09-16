import { TableCell } from "@mui/material";
import { formatNumber } from "../utils/number";

export default function CustomTableCell({ value, type }) {
  return (
    <TableCell align="center" value={value}>
      {!type && <>{value}</>}
      {type === "image" && (
        <img
          style={{
            maxWidth: "100px",
          }}
          src={value}
          alt={`${type}`}
        />
      )}
      {type === "price" && `${formatNumber(value)} đ`}
    </TableCell>
  );
}
