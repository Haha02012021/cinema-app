import instance from "../config/axios";

export function getPromotions() {
  return instance.get("/api/promotions");
}

export function getPromotionById(id) {
  return instance.get(`/api/promotions/${id}`);
}
