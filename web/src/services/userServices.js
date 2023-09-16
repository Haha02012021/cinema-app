import instance from "../config/axios.js";

export function createUser(userData) {
  return instance.post("/api/users", userData);
}

export function getUserByEmail(email) {
  return instance.get(`/api/users?email=${email}`);
}

export function getUsers(params) {
  return instance.get("api/users", {
    params,
  });
}

export function editUser(id, user) {
  return instance.put(`/api/users/${id}`, user);
}

export function deleteUser(id) {
  return instance.delete(`api/users/${id}`);
}
