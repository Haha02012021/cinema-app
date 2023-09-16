import instance from "../config/axios";

export function getMovies(params = {}) {
  return instance.get("/api/movies?_sort=createAt&_order=desc", {
    params: params,
  });
}

export function getMovieById(movieId) {
  return instance.get(`/api/movies/${movieId}`);
}

export function deleteMovie(id) {
  return instance.delete(`/api/movies/${id}`);
}

export function createMovie(newMovie) {
  return instance.post("/api/movies", newMovie);
}

export function editMovie(id, movie) {
  return instance.put(`/api/movies/${id}`, movie);
}
