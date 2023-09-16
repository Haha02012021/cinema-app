import dayjs from "dayjs";
import { getTickets } from "../services/ticketService";
import { filterTicketsByDateRange } from "./tickets";

export async function getRevenue({ type, start, end }) {
  const tickets = await getTickets();
  const r = [];

  switch (type) {
    case "date":
      for (const ticket of filterTicketsByDateRange(
        tickets,
        start,
        end,
        type,
      )) {
        const existI = r.find((i) => i.date === ticket.showTime.date);
        if (existI) {
          existI.count += ticket.seats.length;
          existI.total += ticket.total;
        } else {
          const i = {
            date: ticket.showTime.date,
            total: ticket.total,
            count: ticket.seats.length,
          };
          r.push(i);
        }
      }

      return r;
    case "month":
    case "year":
      for (const ticket of filterTicketsByDateRange(
        tickets,
        start,
        end,
        type,
      )) {
        const existI = r.find((i) => i.date.isSame(ticket.showTime.date, type));
        if (existI) {
          existI.count += ticket.seats.length;
          existI.total += ticket.total;
        } else {
          const i = {
            date: dayjs(ticket.showTime.date).startOf(type),
            total: ticket.total,
            count: ticket.seats.length,
          };
          r.push(i);
        }
      }

      return r;
    default:
      break;
  }
}
