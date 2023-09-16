import instance from "../config/axios";

export function getRoomsById(id) {
  return instance.get(`/api/rooms/${id}`);
}

export function getRooms() {
  return instance.get("/api/rooms");
}
