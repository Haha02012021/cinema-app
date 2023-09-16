import dayjs from "dayjs";
import { IS_DATE } from "../constants";
import { getMovies } from "../services/movieServices";
import { checkNumberInRange } from "./number";
import { getDate } from "./date";

export async function filterMovies(filter) {
  const moviesData = await getMovies();

  const movies = moviesData.map((movie, i) => {
    const showingStatus = checkDateInRange(
      new Date(),
      movie.startDate,
      movie.endDate,
    );

    const {
      id,
      poster,
      title,
      genre,
      direction,
      rated,
      language,
      rating,
      ticket,
      showsTimes,
      runtime,
    } = movie;
    return {
      id,
      poster,
      title,
      genre,
      direction,
      rated,
      language,
      rating,
      ticket,
      showingStatus,
      showsTimes,
      runtime,
    };
  });

  return movies.filter((movie) => {
    return (
      checkItemOfArr1InArr2(movie.genre, filter.genre) &&
      checkItemOfArr1InArr2(movie.language, filter.language) &&
      (!filter.rated || filter.rated.includes(movie.rated)) &&
      checkNumberInRange(movie.rating, filter.rating) &&
      checkNumberInRange(movie.ticket, filter.ticket) &&
      (filter.showingStatus === undefined ||
        filter.showingStatus === movie.showingStatus)
    );
  });
}

export async function searchMoviesByKey(searchKey, filter) {
  if (!searchKey) return;
  const movies = filter ? filterMovies(filter) : await getMovies();

  return movies.filter((movie) => {
    const title = movie.title.toLowerCase();

    return title.match(new RegExp(`${searchKey.toLowerCase()}`));
  });
}

export function checkDateInRange(date, from, to) {
  const now = new Date(date).getTime();
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();

  if (now >= fromTime && now <= toTime) {
    return IS_DATE.inRange;
  }

  if (now <= fromTime) {
    return IS_DATE.afterRange;
  }

  return IS_DATE.default;
}

function checkItemOfArr1InArr2(arr1, arr2) {
  if (arr2) {
    const arr = [...new Set([...arr1, ...arr2])];

    return arr.length !== arr1.length + arr2.length;
  }

  return true;
}

export const getShowsTimeOk = (showsTimes, date) => {
  const selectingDate = getDate(date);
  const today = getDate(new Date());

  const sTs =
    new Date(selectingDate).getTime() < new Date(today)
      ? []
      : showsTimes?.find((sT) => {
          const currentDate = getDate(sT.date);
          let t = false;
          for (const time of sT.times) {
            const hour = new Date().getHours();
            const min = new Date().getMinutes();
            const [h, m] = time.time.split(":");

            if (Number(h) > hour) {
              t = true;
              break;
            } else if (Number(h) === hour && Number(m) >= min + 15) {
              t = true;
              break;
            }
          }

          return (
            (selectingDate === currentDate && currentDate !== today) ||
            (selectingDate === currentDate && selectingDate === today && t)
          );
        });
  return sTs;
};

export const checkTimeOk = (time, date) => {
  const now = Date.now();
  const [hour, min] = time.split(":");
  const t = new Date().setHours(hour, min);

  return now <= t || now <= new Date(date);
};
