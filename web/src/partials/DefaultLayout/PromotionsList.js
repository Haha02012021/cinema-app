import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { useContext, useEffect, useState } from "react";
import { getPromotions } from "../../services/promotionServices";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingProvider";

export default function PromotionsList({ seeMore = false }) {
  const [promotions, setPromotions] = useState();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getPromotionsData();
  }, []);

  const getPromotionsData = async () => {
    setLoading(true);
    const promotionsData = await getPromotions();
    setLoading(false);
    setPromotions(seeMore ? promotionsData.slice(0, 4) : promotionsData);
  };

  const handleClickPromotion = (promotionId) => {
    navigate(`/promotion/${promotionId}`);
  };
  return (
    <>
      <SectionTitle title={"Tin khuyến mãi"} />
      {promotions && (
        <ImageList gap={8} cols={matchDownMd ? 2 : 4}>
          {promotions.map((promotion) => {
            return (
              <ImageListItem
                key={promotion.id}
                sx={{
                  "& > .promotion-hover": {
                    opacity: 0,
                  },
                  "&:hover": {
                    "& > .promotion-hover": {
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => handleClickPromotion(promotion.id)}
              >
                <img src={promotion.thumbnail} alt={promotion.title} />
                <Stack
                  sx={{
                    position: "absolute",
                    p: "1rem",
                    height: "100%",
                    color: theme.palette.common.white,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    cursor: "pointer",
                    transition: "all 300ms ease",
                  }}
                  justifyContent={"space-between"}
                  direction={"column"}
                  className="promotion-hover"
                >
                  <Stack gap={2}>
                    <Typography component={"h3"} variant="h5">
                      {promotion.title}
                    </Typography>
                    <Typography component={"p"}>
                      {promotion.description}
                    </Typography>
                  </Stack>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.common.white,
                      color: theme.palette.common.white,
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        backgroundColor: theme.palette.secondary.main,
                      },
                    }}
                  >
                    Chi tiết
                  </Button>
                </Stack>
              </ImageListItem>
            );
          })}
        </ImageList>
      )}
    </>
  );
}
