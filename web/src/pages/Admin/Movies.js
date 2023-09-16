import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useEffect, useState, useCallback, useContext } from "react";
import EnhancedTable from "../../components/EnhancedTable";
import MovieForm from "../../partials/Admin/Movies/MovieForm";
import DeleteAlert from "../../partials/Admin/Movies/DeleteAlert";
import MovieFilter from "../../partials/Admin/Movies/MovieFilter";
import { filterMovies } from "../../utils/movies";
import { BsCalendarWeek } from "react-icons/bs";
import ShowTimes from "../../partials/Admin/Movies/ShowTimes";
import ShowtimeButton from "../../components/ShowtimeButton";
import { LoadingContext } from "../../contexts/LoadingProvider";

const headCells = [
  {
    id: "id",
    numeric: true,
    order: true,
    label: "STT",
  },
  {
    id: "poster",
    numeric: false,
    order: false,
    label: "Poster",
  },
  {
    id: "title",
    numeric: false,
    order: true,
    label: "Tiêu đề",
  },
  {
    id: "genre",
    numeric: false,
    order: false,
    label: "Thể loại",
  },
  {
    id: "direction",
    numeric: false,
    order: false,
    label: "Đạo diễn",
  },
  {
    id: "rated",
    numeric: false,
    order: false,
    label: "Giới hạn lứa tuổi",
  },
  {
    id: "language",
    numeric: false,
    order: false,
    label: "Ngôn ngữ",
  },
  {
    id: "rating",
    numeric: true,
    order: true,
    label: "Đánh giá",
  },
  {
    id: "ticket",
    numeric: true,
    order: true,
    label: "Giá vé",
  },
  {
    id: "actions",
    order: false,
    numeric: false,
    label: "Thao tác",
  },
];

export default function Movies() {
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentSelectedId, setCurrentSelectedId] = useState(0);
  const [addMovie, setAddMovie] = useState(false);
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [showTimes, setShowTimes] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (!addMovie || !deleteMovie || !currentSelectedId) && getMoviesData();
  }, [addMovie, deleteMovie, currentSelectedId]);

  const getMoviesData = async () => {
    setLoading(true);
    const movies = await filterMovies({});
    setLoading(false);
    setRows(movies);
  };

  const renderTable = useCallback(() => {
    return (
      <EnhancedTable
        title={"Danh sách phim"}
        headCells={headCells}
        rows={rows}
        onEditRow={handleEditMovie}
        onDeleteAll={handleDeleteAll}
        onSelectRow={handleSelectMovie}
        defaultSelected={selectedIds}
        toobarChildren={<MovieFilter onFilter={handleFilter} />}
        tableActionsChildren={<ShowtimeButton onOpen={handleOpenShowTimes} />}
      />
    );
  }, [rows]);

  const handleFilter = async (filter) => {
    const movies = await filterMovies(filter);
    setRows(movies);
  };

  const handleEditMovie = (movieId) => {
    setCurrentSelectedId(movieId);
  };

  const handleDeleteAll = () => {
    setDeleteMovie(true);
  };

  const handleSelectMovie = (selected) => {
    setSelectedIds(selected);
  };

  const handleCloseEditMovieForm = () => {
    setCurrentSelectedId(0);
  };

  const handleAddMovie = () => {
    setAddMovie(true);
  };

  const handleCloseAddMovieForm = () => {
    setAddMovie(false);
  };

  const handleCloseDeleteMovieAlert = (isDeleted) => {
    setDeleteMovie(false);

    if (isDeleted) {
      setSelectedIds([]);
    }
  };

  const handleCloseShowTimes = () => {
    setShowTimes(!showTimes);
  };

  const handleOpenShowTimes = (movieId) => {
    setShowTimes(movieId);
  };

  return (
    <Container>
      <Stack gap={2}>
        <Box>
          <Button
            sx={{
              float: "right",
            }}
            variant="contained"
            onClick={handleAddMovie}
          >
            Thêm phim
          </Button>
        </Box>
        {renderTable()}
      </Stack>
      <MovieForm
        open={Boolean(currentSelectedId)}
        onClose={handleCloseEditMovieForm}
        movieId={currentSelectedId}
      />
      <MovieForm open={addMovie} onClose={handleCloseAddMovieForm} />
      <DeleteAlert
        open={deleteMovie}
        onClose={handleCloseDeleteMovieAlert}
        movieIds={selectedIds}
      />
      <ShowTimes
        open={Boolean(showTimes)}
        onClose={handleCloseShowTimes}
        movieId={showTimes}
      />
    </Container>
  );
}
