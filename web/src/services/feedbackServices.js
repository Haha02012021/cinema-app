import instance from "../config/axios";

export function createFeedback(data) {
  return instance.post("/api/feedbacks", data);
}
