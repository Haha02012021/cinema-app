import instance from "../config/axios";

export function createTicket(data) {
  return instance.post("/api/tickets", data);
}

export function getTicketsByUserId(userId) {
  return instance.get(
    `/api/tickets?userId=${userId}&_expand=movie&_sort=createAt&_order=desc`,
  );
}

export function getTickets(filter) {
  return instance.get(
    `/api/tickets?_expand=movie&_sort=createAt&_order=desc${
      filter &&
      Object.entries(filter)
        .map(([key, value]) => {
          return `&${key}=${value}`;
        })
        .join("")
    }`,
  );
}

export function getTicketById(id) {
  return instance.get(`/api/tickets/${id}?_expand=movie`);
}
