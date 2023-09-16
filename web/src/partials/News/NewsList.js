import { useContext, useEffect, useState } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { getNewsData } from "../../utils/news";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingProvider";

dayjs.locale("vi");

export default function NewsList() {
  const [newsList, setNewsList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(0);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getNews();
  }, [currentPage]);

  const getNews = async () => {
    setLoading(true);
    const { data, total } = await getNewsData({ page: currentPage });
    setLoading(false);
    setNewsList(data);
    setPagesTotal(total);
  };

  const handleChangePage = (e, newPage) => {
    setCurrentPage(newPage);
  };

  const handleToNewsDetail = (newsId) => {
    navigate(`/news/${newsId}`);
  };
  return (
    <Stack gap={4} alignItems={"center"}>
      <Stack gap={2}>
        {newsList?.map((newsItem) => {
          return (
            <Stack
              direction={{ sm: "row" }}
              key={newsItem.id}
              gap={{ xs: 1, sm: 4 }}
            >
              <Image
                src={newsItem.thumbnail}
                alt={newsItem.title}
                onClick={() => handleToNewsDetail(newsItem.id)}
              />
              <Stack spacing={{ xs: 2, sm: 4 }}>
                <Stack spacing={1}>
                  <Typography
                    component={"h3"}
                    variant="h6"
                    onClick={() => handleToNewsDetail(newsItem.id)}
                    sx={(theme) => {
                      return {
                        cursor: "pointer",
                        transition: "all 300ms ease",
                        "&:hover": {
                          color: theme.palette.secondary.main,
                        },
                      };
                    }}
                  >
                    {newsItem.title}
                  </Typography>
                  <Typography fontStyle={"italic"}>
                    Cập nhật vào&nbsp;
                    {dayjs(newsItem.createdAt).format("HH:mm DD/MM/YYYY")}
                  </Typography>
                </Stack>
                <Typography component={"p"} color={grey[500]}>
                  {newsItem.description}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      {pagesTotal && (
        <Pagination
          count={pagesTotal}
          shape="rounded"
          color="secondary"
          onChange={handleChangePage}
        />
      )}
    </Stack>
  );
}

const Image = styled("img")(({ theme }) => {
  return {
    width: 280,
    height: 186,
    objectFit: "cover",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
    },
  };
});
