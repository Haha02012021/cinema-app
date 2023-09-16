import instance from "../config/axios";

export function getNews(params) {
  return instance.get("/api/news", {
    params,
  });
}

export function getNewsById(id) {
  return instance.get(`/api/news/${id}`);
}
