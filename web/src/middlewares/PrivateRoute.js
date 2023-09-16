import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute({ role }) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLogedIn !== undefined && auth?.user?.role !== role) {
      navigate(-1);
    }
  }, [navigate]);

  if (auth.isLogedIn !== undefined) {
    if (auth.isLogedIn) {
      if (auth.user.role === role) {
        return <Outlet />;
      } else {
        return navigate(-1);
      }
    } else {
      return navigate("/auth");
    }
  }

  return (
    <Container>
      <Typography variant="h1" textAlign={"center"}>
        403
      </Typography>
      <Typography variant="h2" textAlign={"center"}>
        Bạn không có quyền truy cập trang này!
      </Typography>
    </Container>
  );
}
