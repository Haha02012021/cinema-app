import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_ROLE } from "../constants";

export default function BookTicketButton({ time, date, movieId }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const handleBookTicket = () => {
    if (auth.isLogedIn) {
      if (auth.user.role === USER_ROLE) {
        navigate("/book-ticket/step-1", {
          state: {
            movieId,
            time,
            date,
          },
        });
      } else {
        toast.error("Vui lòng đăng nhập role người dùng!");
      }
    } else {
      toast.error("Vui lòng đăng nhập!");
    }
  };
  return (
    <Button variant="outlined" onClick={movieId && handleBookTicket}>
      {time.time}
    </Button>
  );
}
