import {
  Box,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import CustomTableCell from "./CustomTableCell";
import { CELL_TYPES } from "../constants";
import { cloneElement, useEffect, useMemo, useState } from "react";
import TableActions from "./TableActions";
import { arrayToString } from "../utils/string";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable({
  headCells,
  rows,
  title,
  onEditRow,
  onSeeDetailRow,
  onDeleteAll,
  onSelectRow,
  defaultSelected = [],
  toobarChildren = <></>,
  hasFilter = true,
  tableActionsChildren,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      onSelectRow(newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    onSelectRow(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          onDeleteAll={onDeleteAll}
          hasFilter={hasFilter}
        >
          {toobarChildren}
        </EnhancedTableToolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={onSelectRow ? handleSelectAllClick : null}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={
                      onSelectRow
                        ? (event) => handleClick(event, row.id)
                        : () => {}
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {onSelectRow && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    )}
                    {Object.entries(row).map(([key, value], index) => {
                      const hCs = headCells.filter(
                        (headCell) => headCell.id !== "actions",
                      );
                      if (index > 0 && index < hCs.length) {
                        return (
                          <CustomTableCell
                            key={`${key}-${index}`}
                            value={arrayToString(value)}
                            type={
                              CELL_TYPES.image.includes(key)
                                ? "image"
                                : CELL_TYPES.price.includes(key)
                                ? "price"
                                : null
                            }
                          />
                        );
                      } else if (index >= hCs.length) {
                        return <></>;
                      }

                      return (
                        <TableCell
                          key={`${key}-${index}`}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.id}
                        </TableCell>
                      );
                    })}
                    {(onEditRow || onSeeDetailRow || tableActionsChildren) && (
                      <TableCell>
                        <TableActions
                          onEdit={onEditRow ? () => onEditRow(row.id) : null}
                          onSeeDetail={
                            onSeeDetailRow ? () => onSeeDetailRow(row.id) : null
                          }
                        >
                          {tableActionsChildren &&
                            cloneElement(tableActionsChildren, {
                              movieId: row.id,
                            })}
                        </TableActions>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={headCells.length + 1 + (onEditRow ? 1 : 0)}
                  >
                    <Stack gap={4} alignItems={"center"}>
                      <FaMagnifyingGlassMinus size={64} />
                      <Typography variant="h5">
                        Không tìm thấy bản ghi!
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Bản ghi mỗi trang"
        />
      </Paper>
    </Box>
  );
}
