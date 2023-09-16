import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/userServices";
import { useContext } from "react";
import { LoadingContext } from "../../../contexts/LoadingProvider";

export default function DeleteAlert({ open, onClose, userIds = [] }) {
  const { setLoading } = useContext(LoadingContext);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await userIds.forEach(async (userId) => {
        await deleteUser(userId);
      });
      setLoading(false);
      onClose(true);
      toast.success("Xóa nguời dùng thành công!");
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
          Xóa người dùng
        </Typography>
        <Stack gap={2}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bạn có chắc muốn xóa muốn xóa {userIds.length} người dùng không?
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
