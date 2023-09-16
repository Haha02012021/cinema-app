import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import PasswordInput from "../../components/PasswordInput";
import { useForm } from "react-hook-form";
import { logInAction } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_ROLE, MESSAGES } from "../../constants";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingProvider";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (auth.user) {
      switch (auth.user.role) {
        case ADMIN_ROLE:
          navigate("/admin/users");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [auth.user]);

  const handleSubmitForm = async (data, event) => {
    const userAccount = data;

    setLoading(true);
    try {
      dispatch(logInAction(userAccount));
    } catch (error) {
      setError("email", MESSAGES.email.notExists);
    }
    setLoading(false);
  };

  const handleErrorForm = (errors) => {
    for (const name in errors) {
      if (Object.hasOwnProperty.call(errors, name)) {
        const type = errors[name].type;
        setError(name, {
          type,
          message: MESSAGES[name][type],
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)} noValidate>
      <Stack gap={"2rem"}>
        <Typography>
          Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận thêm
          nhiều ưu đãi từ chương trình thành viên Cinema.
        </Typography>
        <Stack gap={"1rem"}>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              required
              name="email"
              startAdornment={
                <InputAdornment position="start">
                  <AiOutlineMail />
                </InputAdornment>
              }
              label="Email"
              sx={{
                borderRadius: 0,
              }}
              {...register("email", {
                required: true,
              })}
              error={Boolean(errors.email)}
            />
            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <PasswordInput
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            register={register}
          />
          <Link
            sx={{
              textDecoration: "none",
              transition: "all 300ms ease",
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.primary.hoverText,
              },
            }}
          >
            Quên mật khẩu?
          </Link>
        </Stack>
        <Button variant="contained" type="submit">
          Đăng nhập
        </Button>
      </Stack>
    </form>
  );
}
