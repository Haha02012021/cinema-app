import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { deleteMovie } from "../../../services/movieServices";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LoadingContext } from "../../../contexts/LoadingProvider";

export default function DeleteAlert({ open, onClose, movieIds = [] }) {
  const { setLoading } = useContext(LoadingContext);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await movieIds.forEach(async (movieId) => {
        await deleteMovie(movieId);
      });
      setLoading(false);
      onClose(true);
      toast.success("Xóa phim thành công!");
    } catch (error) {
      setLoading(false);
      toast.error("Có lỗi xảy ra!");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          fontWeight={"medium"}
        >
          Xóa phim
        </Typography>
        <Stack gap={2}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bạn có chắc muốn xóa muốn xóa {movieIds.length} phim không?
          </Typography>
          <Stack gap={1} direction={"row"} justifyContent={"end"}>
            <Button variant="outlined" onClick={onClose}>
              Bỏ qua
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Xóa
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
