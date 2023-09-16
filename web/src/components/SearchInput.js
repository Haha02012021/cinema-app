import { IconButton, Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setValue("");
    navigate(`/search-results/${value.trim()}`);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Input
      value={value}
      placeholder="Tìm phim theo tên..."
      variant="standard"
      sx={(theme) => ({
        width: "32%",
        [theme.breakpoints.down("sm")]: {
          width: "96%",
        },
      })}
      onKeyDown={handleKeyDownSearch}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="search" edge="end" onClick={handleSearch}>
            <BiSearch />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
