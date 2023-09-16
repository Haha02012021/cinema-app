import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomLink({ to, children }) {
  return <LinkStyle to={to}>{children}</LinkStyle>;
}

const LinkStyle = styled(Link)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  };
});
