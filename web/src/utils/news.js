import { getNews } from "../services/newsServices";

export async function getNewsData({ limit = 6, page = 1 }) {
  const allNews = await getNews();

  const total = Math.ceil(allNews.length / limit);
  const data = allNews.slice((page - 1) * limit, page * limit);

  return {
    total,
    data,
  };
}
