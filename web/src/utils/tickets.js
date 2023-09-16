import dayjs from "dayjs";
import { IS_DATE, PAYMENT_OPTIONS } from "../constants";
import { getTickets, getTicketsByUserId } from "../services/ticketService";
import { getDateToDisplay } from "./date";
import { checkDateInRange } from "./movies";

export async function filterTicketsByUserId({ userId, startDate, endDate }) {
  const tickets = await getTicketsByUserId(userId);

  return tickets.filter((ticket) => {
    return (
      checkDateInRange(ticket.showTime.date, startDate, endDate) ===
      IS_DATE.inRange
    );
  });
}

export function filterTicketsByDateRange(tickets, startDate, endDate, type) {
  return tickets.filter((ticket) => {
    const date = dayjs(ticket.showTime.date);
    return (
      date.isAfter(startDate.add(-1, type), type) &&
      date.isBefore(endDate.add(1, type), type)
    );
  });
}

export async function filterTickets({}) {
  const tickets = await getTickets();

  return tickets.map((ticket) => {
    const {
      id,
      tid,
      userInfo,
      movie,
      showTime,
      seats,
      total,
      createdAt,
      paymentMethod,
    } = ticket;

    return {
      id,
      tid,
      fullname: userInfo.fullname,
      email: userInfo.email,
      movieTitle: movie.title,
      showTime: `${showTime.time.time} | ${getDateToDisplay(showTime.date)}`,
      seats,
      toMoney: total,
      createdAt: getDateToDisplay(createdAt),
      paymentMethod: PAYMENT_OPTIONS[paymentMethod],
    };
  });
}

export async function getBoughtSeats(movieId, showTime) {
  const ticketsInRoom = await getTickets({
    movieId,
    "showTime.time.time": showTime.time.time,
    "showTime.time.room": showTime.time.room,
    "showTime.date": showTime.date,
  });

  const seats = ticketsInRoom.reduce(
    (ss, ticket) => [...ss, ...ticket.seats],
    [],
  );
  return seats;
}
