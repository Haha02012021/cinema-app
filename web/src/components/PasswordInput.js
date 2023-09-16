import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export default function PasswordInput({
  label = "Mật khẩu",
  name = "password",
  register,
  hasStartIcon = true,
  error,
  helperText = "",
  rules = {},
  fullWidth = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <TextField
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        required
        variant="outlined"
        label={label}
        InputProps={{
          sx: {
            borderRadius: 0,
          },
          startAdornment: hasStartIcon && (
            <InputAdornment position="start">
              <RiLockPasswordLine />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register(name, {
          ...rules,
          required: true,
          minLength: 8,
        })}
        error={error}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
}
