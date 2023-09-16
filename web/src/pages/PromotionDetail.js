import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPromotionById } from "../services/promotionServices";
import CustomLink from "../components/CustomLink";
import PromotionsList from "../partials/DefaultLayout/PromotionsList";
import ReactHtmlParser from "html-react-parser";
import NowShowingMovies from "../partials/DefaultLayout/NowShowingMovies";
import { LoadingContext } from "../contexts/LoadingProvider";

export default function PromotionDetail() {
  const { promotionId } = useParams();
  const [promotion, setPromotion] = useState();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    promotionId && getPromotionData();
  }, [promotionId]);

  const getPromotionData = async () => {
    setLoading(true);
    const promotionData = await getPromotionById(promotionId);
    setPromotion(promotionData);
    setLoading(false);
  };

  return (
    <Container>
      <Stack gap={2}>
        <Breadcrumbs>
          <CustomLink to="/">Trang chủ</CustomLink>
          <Typography>Khuyến mãi</Typography>
        </Breadcrumbs>
        {promotion && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={9}>
              <Stack gap={6}>
                <Stack gap={2}>
                  <Typography component={"h1"} variant="h5">
                    {promotion.title}
                  </Typography>
                  <div className="promotion-content">
                    {ReactHtmlParser(promotion.content)}
                  </div>
                </Stack>
                <Box>
                  <PromotionsList />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={3}>
              <NowShowingMovies />
            </Grid>
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
