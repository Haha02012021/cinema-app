import dayjs from "dayjs";

export function getDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function getDateToDisplay(date) {
  return dayjs(date).format("DD/MM/YYYY");
}
