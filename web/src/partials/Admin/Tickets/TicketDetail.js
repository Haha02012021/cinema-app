import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getTicketById } from "../../../services/ticketService";
import dayjs from "dayjs";
import { arrayToString } from "../../../utils/string";
import { PAYMENT_OPTIONS } from "../../../constants";
import { getDateToDisplay } from "../../../utils/date";
import { formatNumber } from "../../../utils/number";

export default function TicketDetail({ open, onClose, ticketId }) {
  const [ticket, setTicket] = useState();

  useEffect(() => {
    ticketId && getTicketData();
  }, [ticketId]);

  const getTicketData = async () => {
    const t = await getTicketById(ticketId);

    setTicket(t);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="ticket-dialog-title"
      aria-describedby="modal-modal-description"
      scroll="paper"
      fullWidth
    >
      {ticket && (
        <>
          <DialogTitle id="ticket-dialog-title">
            Chi tiết vé
            <Typography fontStyle={"italic"}>Mã vé: {ticket.tid}</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <List>
              <ListItem
                sx={(theme) => ({
                  px: 0,
                })}
              >
                <Typography fontWeight={"medium"}>Họ và tên:&nbsp;</Typography>
                <Typography>{ticket.userInfo.fullname}</Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Typography fontWeight={"medium"}>Email:&nbsp;</Typography>
                <Typography sx={{ minWidth: "fit-content" }}>
                  {ticket.userInfo.email}
                </Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Typography fontWeight={"medium"}>
                  Số điện thoại:&nbsp;
                </Typography>
                <Typography>{ticket.userInfo.phonenumber}</Typography>
              </ListItem>
            </List>
            <Stack gap={4} direction={"row"}>
              <Image src={ticket.movie.poster} alt={ticket.movie.title} />
              <List>
                <ListItem sx={{ px: 0 }}>
                  <Typography
                    sx={{ minWidth: "fit-content" }}
                    fontWeight={"medium"}
                  >
                    Tên phim:&nbsp;
                  </Typography>
                  <Typography sx={{ minWidth: "fit-content" }}>
                    {ticket.movie.title}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{ px: 0, display: "flex", alignItems: "baseline" }}
                >
                  <Typography
                    fontWeight={"medium"}
                    sx={{ minWidth: "fit-content" }}
                  >
                    Suất chiếu:&nbsp;
                  </Typography>
                  <Typography>
                    {ticket.showTime.time.time} |{" "}
                    <Typography
                      sx={{
                        display: "inline-block",
                        "&:first-letter": {
                          textTransform: "uppercase",
                        },
                      }}
                    >
                      {dayjs(ticket.showTime.date).format("dddd, DD/MM/YYYY")}
                    </Typography>
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Typography fontWeight={"medium"}>
                    Phòng chiếu:&nbsp;
                  </Typography>
                  <Typography>{ticket.showTime.time.room}</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Typography fontWeight={"medium"}>Ghế:&nbsp;</Typography>
                  <Typography>{arrayToString(ticket.seats)}</Typography>
                </ListItem>
                <ListItem
                  sx={{ px: 0, display: "flex", alignItems: "baseline" }}
                >
                  <Typography
                    fontWeight={"medium"}
                    sx={{ minWidth: "fit-content" }}
                  >
                    Hình thức thanh toán:&nbsp;
                  </Typography>
                  <Typography>
                    {PAYMENT_OPTIONS[ticket.paymentMethod]}
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Typography fontWeight={"medium"}>
                    Thời gian đặt vé:&nbsp;
                  </Typography>
                  <Typography>
                    {dayjs(ticket.createdAt).format("HH:mm, DD/MM/YYYY")}
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Typography fontWeight={"medium"} fontSize={"1.25rem"}>
                    Tổng thanh toán:&nbsp;
                  </Typography>
                  <Typography fontSize={"1.25rem"}>
                    {formatNumber(ticket.total)} VNĐ
                  </Typography>
                </ListItem>
              </List>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

const Image = styled("img")(({ theme }) => ({
  width: 200,
  objectFit: "cover",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
