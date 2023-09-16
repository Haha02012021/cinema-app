import { Container } from "@mui/material";
import MoviesList from "../partials/DefaultLayout/MoviesList";
import PromotionsList from "../partials/DefaultLayout/PromotionsList";

export default function HomePage() {
  return (
    <Container>
      <MoviesList seeMore={true} />
      <PromotionsList />
    </Container>
  );
}
