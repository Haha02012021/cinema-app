import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomFormControl from "../../../components/CustomFormControl";
import CustomSelectField from "../../../components/CustomSelectField";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MESSAGES, SEX } from "../../../constants";
import CustomDateField from "../../../components/CustomDateField";
import PasswordInput from "../../../components/PasswordInput";
import { toast } from "react-toastify";
import { editPassword } from "../../../redux/actions/authActions";
import { getDate } from "../../../utils/date";

export default function UserInfoForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [hasPasswordEdit, setHasPasswordEdit] = useState(false);
  const [birthday, setBirthday] = useState({});
  const watchSex = watch("sex", "");

  useEffect(() => {
    auth.user && setDefaultForm();
  }, [auth]);

  const setDefaultForm = () => {
    setValue("fullname", auth.user.fullname);
    setValue("sex", auth.user.sex);
    setValue("phonenumber", auth.user.phonenumber);
    setValue("email", auth.user.email);
    birthday.value = dayjs(auth.user.birthday);
  };
  const handleSubmitForm = (data) => {
    const updateUser = {
      ...auth.user,
      ...data,
      birthday: getDate(birthday.value),
    };

    delete updateUser.newpassword;
    delete updateUser.repassword;

    try {
      dispatch(editPassword(data.newpassword, updateUser));
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {}
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
    <form onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}>
      <Stack gap={4}>
        <CustomFormControl
          label={"Họ và tên"}
          name={"fullname"}
          register={register}
          error={errors.fullname}
          rules={{ required: true }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomDateField
              label={"Ngày sinh"}
              error={birthday.error}
              onChange={handleChangeBirthday}
              defaultValue={birthday.value}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormControl
              fullWidth={true}
              label={"Số điện thoại"}
              type="phonenumber"
              name={"phonenumber"}
              register={register}
              error={errors.phonenumber}
              rules={{ required: true }}
            />
          </Grid>
        </Grid>
        <CustomFormControl
          fullWidth={true}
          label={"Email"}
          type="email"
          name={"email"}
          register={register}
          error={errors.email}
          rules={{ required: true }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasPasswordEdit}
              onChange={() => setHasPasswordEdit(!hasPasswordEdit)}
              color="secondary"
            />
          }
          label="Đổi mật khẩu"
        />
        {hasPasswordEdit && (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={"1rem"}>
            <PasswordInput
              fullWidth={true}
              label="Nhập mật khẩu mới"
              name="newpassword"
              register={register}
              hasStartIcon={false}
              error={errors.newpassword ? true : false}
              helperText={errors.newpassword?.message}
              rules={{
                validate: {
                  incorrect: (value, formValues) => {
                    return value === formValues.newpassword;
                  },
                },
              }}
            />
            <PasswordInput
              fullWidth={true}
              label="Nhập lại mật khẩu mới"
              name="repassword"
              register={register}
              hasStartIcon={false}
              error={errors.repassword ? true : false}
              helperText={errors.repassword?.message}
              rules={{
                validate: {
                  incorrect: (value, formValues) => {
                    return value === formValues.newpassword;
                  },
                },
              }}
            />
          </Stack>
        )}
        <Box>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ float: "right" }}
            type="submit"
          >
            Lưu
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
