import { Box, Button, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../components/PasswordInput";
import { MESSAGES, SEX, USER_ROLE } from "../../constants";
import { registerAction } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import CustomDateField from "../../components/CustomDateField";
import CustomFormControl from "../../components/CustomFormControl";
import CustomSelectField from "../../components/CustomSelectField";
import { getDate } from "../../utils/date";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { toast } from "react-toastify";

export default function RegisterForm({ setCurrentTabValue }) {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [birthday, setBirthday] = useState({});
  const watchSex = watch("sex", "");
  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadingContext);

  const handleSubmitForm = async (data, event) => {
    const newUser = {
      ...data,
      birthday: getDate(birthday.value),
      role: USER_ROLE,
    };

    setLoading(true);
    try {
      dispatch(registerAction(newUser));
      setLoading(false);
      setCurrentTabValue(0);
    } catch (error) {
      setLoading(false);
      toast.error("Có lỗi xảy ra!");
    }
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
    if (!birthday.value) {
      setBirthday((prev) => {
        return {
          ...prev,
          error: MESSAGES.birthday.required,
        };
      });
    }
  };

  const handleChangeBirthday = (newDate) => {
    setBirthday({ value: newDate });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)} noValidate>
      <Stack gap="2rem">
        <Stack gap={"1rem"}>
          <CustomFormControl
            label={"Họ và tên"}
            name={"fullname"}
            register={register}
            error={errors.fullname}
            rules={{ required: true }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
            <CustomFormControl
              fullWidth={true}
              label={"Số điện thoại"}
              type="phonenumber"
              register={register}
              error={errors.phonenumber}
              rules={{ required: true }}
              name={"phonenumber"}
            />
            <CustomSelectField
              name={"sex"}
              label={"Giới tính"}
              register={register}
              watch={watchSex}
              options={Object.entries(SEX).map(([key, value]) => {
                return {
                  value: key,
                  label: value,
                };
              })}
            />
          </Stack>
          <CustomFormControl
            fullWidth={true}
            label={"Email"}
            type="email"
            name={"email"}
            register={register}
            error={errors.email}
            rules={{ required: true }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={"1rem"}>
            <PasswordInput
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              register={register}
              hasStartIcon={false}
              rules={{
                validate: {
                  incorrect: (value, formValues) => {
                    const regex = new RegExp(
                      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$",
                    );
                    return regex.test(value);
                  },
                },
              }}
            />
            <PasswordInput
              label="Nhập lại mật khẩu"
              name="repassword"
              register={register}
              hasStartIcon={false}
              error={errors.repassword ? true : false}
              helperText={errors.repassword?.message}
              rules={{
                validate: {
                  incorrect: (value, formValues) => {
                    return value === formValues.password;
                  },
                },
              }}
            />
          </Stack>
          <CustomDateField
            label={"Ngày sinh"}
            error={birthday.error}
            onChange={handleChangeBirthday}
          />
        </Stack>
        <Button variant="contained" type="submit" fullWidth>
          Đăng ký
        </Button>
      </Stack>
    </form>
  );
}
