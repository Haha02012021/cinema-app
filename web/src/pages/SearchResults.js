import {
  Container,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { searchMoviesByKey } from "../utils/movies";
import { useDebounce } from "@uidotdev/usehooks";
import { LoadingContext } from "../contexts/LoadingProvider";

export default function SearchResults() {
  const { searchKey } = useParams();
  const [searchValue, setSearchValue] = useState(searchKey);
  const [searchResults, setSearchResults] = useState();
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getSearchResults();
  }, [debouncedSearchValue]);

  const getSearchResults = async () => {
    setLoading(true);
    const movies = await searchMoviesByKey(searchValue);
    setLoading(false);
    setSearchResults(movies);
  };

  const handleChangeSearch = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  const handleResetInput = () => {
    setSearchValue("");
  };

  const handleClickMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <Container>
      <Stack gap={4}>
        <Stack gap={".5rem"}>
          <Stack direction={"row"} justifyContent={"center"}>
            <Stack direction={"row"} width={{ xs: "80%", sm: "50%" }}>
              <SearchInput
                autoFocus
                value={searchValue}
                placeholder="Tìm kiếm"
                onChange={handleChangeSearch}
              />
              {searchValue && (
                <IconButton onClick={handleResetInput}>
                  <BsXLg size={"1.5rem"} />
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Divider />
        </Stack>
        {searchResults && (
          <ImageList cols={matchDownSm ? 2 : 4} gap={8}>
            {searchResults.map((searchResult) => {
              return (
                <ImageListItem
                  key={searchResult.id}
                  onClick={() => handleClickMovie(searchResult.id)}
                >
                  <img src={searchResult.poster} alt={searchResult.title} />
                  <ImageListItemBar title={searchResult.title} />
                </ImageListItem>
              );
            })}
          </ImageList>
        )}
      </Stack>
    </Container>
  );
}

const SearchInput = styled("input")((theme) => ({
  border: 0,
  outline: 0,
  fontFamily: "Bricolage Grotesque, sans-serif",
  width: "100%",
  fontSize: "2rem",
  maxHeight: "2.5rem",
}));
