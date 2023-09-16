import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomDateField from "../../../components/CustomDateField";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { formatNumber } from "../../../utils/number";
import { filterTicketsByUserId } from "../../../utils/tickets";
import { getDate, getDateToDisplay } from "../../../utils/date";
import dayjs from "dayjs";
import { LoadingContext } from "../../../contexts/LoadingProvider";

const headCells = [
  {
    label: "Ngày",
  },
  {
    label: "Mã vé",
  },
  {
    label: "Email đặt vé",
  },
  {
    label: "Phim",
  },
  {
    label: "Suất chiếu",
  },
  {
    label: "Phòng",
  },
  {
    label: "Ghế",
  },
  {
    label: "Giá trị",
  },
];

export default function Transactions() {
  const auth = useSelector((state) => state.auth);
  const [tickets, setTickets] = useState();
  const [startDate, setStartDate] = useState(getDate(new Date()));
  const [endDate, setEndDate] = useState(getDate(new Date()));
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    auth.user && getTickets();
  }, [auth, startDate, endDate]);

  const getTickets = async () => {
    setLoading(true);
    const ts = await filterTicketsByUserId({
      userId: auth.user.id,
      startDate,
      endDate,
    });
    setLoading(false);
    setTickets(ts);
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(getDate(newValue));
    setEndDate((prev) => {
      if (dayjs(endDate).isBefore(dayjs(newValue), "date")) {
        return getDate(newValue);
      }

      return prev;
    });
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(getDate(newValue));
  };

  return (
    <Stack gap={2}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        gap={{ xs: 2, sm: 12 }}
      >
        <CustomDateField
          defaultValue={startDate}
          onChange={handleChangeStartDate}
          label={"Từ"}
        />
        <CustomDateField
          defaultValue={endDate}
          label={"Đến"}
          onChange={handleChangeEndDate}
        />
      </Stack>
      <Paper square>
        <TableContainer>
          <Table>
            <TableHead
              sx={(theme) => ({
                backgroundColor: theme.palette.secondary.main,
              })}
            >
              {headCells.map((headCell) => {
                return (
                  <TableCell
                    key={headCell.label}
                    sx={(theme) => ({
                      color: theme.palette.common.white,
                    })}
                  >
                    {headCell.label}
                  </TableCell>
                );
              })}
            </TableHead>
            <TableBody>
              {tickets?.map((ticket) => {
                return (
                  <TableRow>
                    <TableCell>
                      {getDateToDisplay(ticket.showTime.date)}
                    </TableCell>
                    <TableCell>{ticket.tid}</TableCell>
                    <TableCell>{ticket.userInfo.email}</TableCell>
                    <TableCell>{ticket.movie.title}</TableCell>
                    <TableCell>{ticket.showTime.time.time}</TableCell>
                    <TableCell>{ticket.showTime.time.room}</TableCell>
                    <TableCell>{ticket.seats.join(", ")}</TableCell>
                    <TableCell>{formatNumber(ticket.total)} đ</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
