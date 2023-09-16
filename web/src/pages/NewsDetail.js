import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CustomLink from "../components/CustomLink";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getNewsById } from "../services/newsServices";
import dayjs from "dayjs";
import ReactHtmlParser from "html-react-parser";
import NowShowingMovies from "../partials/DefaultLayout/NowShowingMovies";
import { grey } from "@mui/material/colors";
import { LoadingContext } from "../contexts/LoadingProvider";

export default function NewsDetail() {
  const [news, setNews] = useState();
  const { newsId } = useParams();
  const theme = useTheme();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    newsId && getNewsData();
  }, [newsId]);

  const getNewsData = async () => {
    setLoading(true);
    const newsData = await getNewsById(newsId);
    setNews(newsData);
    setLoading(false);
  };
  return (
    <Container>
      <Stack gap={2}>
        <Breadcrumbs>
          <CustomLink to="/">Trang chủ</CustomLink>
          <Typography>Tin tức</Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={9}>
            {news && (
              <Stack gap={1.5}>
                <Typography component={"h1"} variant="h5">
                  {news.title}
                </Typography>
                <Typography
                  fontStyle={"italic"}
                  fontSize={".9rem"}
                  color={grey[500]}
                >
                  Cập nhật vào&nbsp;
                  {dayjs(news.createdAt).format("HH:mm DD/MM/YYYY")}
                </Typography>
                <Box
                  sx={(them) => ({
                    "& a": {
                      color: theme.palette.primary.main,
                      fontStyle: "italic",
                      textDecoration: "none",
                    },
                    "& img": {
                      [theme.breakpoints.down("md")]: {
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover",
                      },
                    },
                  })}
                >
                  {ReactHtmlParser(news.content)}
                </Box>
              </Stack>
            )}
          </Grid>
          <Grid item xs={12} sm={3}>
            <NowShowingMovies />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
