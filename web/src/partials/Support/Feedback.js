import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { MdEmail, MdPhone } from "react-icons/md";
import { grey } from "@mui/material/colors";
import CustomFormControl from "../../components/CustomFormControl";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { MESSAGES } from "../../constants";
import { createFeedback } from "../../services/feedbackServices";
import { toast } from "react-toastify";

export default function Feedback() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    auth.user && setDefaultForm();
  }, [auth]);

  const setDefaultForm = () => {
    setValue(auth.user.fullname);
    setValue(auth.user.email);
    setValue(auth.user.phonenumber);
  };

  const handleSubmitForm = async (data) => {
    const newFeedback = data;

    if (auth.user) {
      newFeedback.userId = auth.user.id;
    }
    try {
      await createFeedback(newFeedback);
      reset();
      toast.success("Bạn đã gửi góp ý thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
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
  };
  return (
    <>
      <SectionTitle title={"Góp ý"} />
      <Paper sx={{ pt: 4 }} square>
        <Stack gap={4} sx={{ pb: 2 }}>
          <Typography component={"h2"} variant="h4" textAlign={"center"}>
            Bạn có gì muốn nhắn nhủ Cinema?
          </Typography>
          <Stack
            gap={{ xs: 2, sm: 4 }}
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"center"}
            alignItems={{ xs: "center" }}
          >
            <Typography
              display={"flex"}
              alignItems={"center"}
              gap={".5rem"}
              color={grey[600]}
            >
              <MdEmail size={"1.5rem"} />
              supports@cinema.com.vn
            </Typography>
            <Typography
              display={"flex"}
              alignItems={"center"}
              gap={".5rem"}
              color={grey[600]}
            >
              <MdPhone size={"1.5rem"} />
              0123 456 789
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ py: 4, px: 4, backgroundColor: grey[200] }}>
          <form onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}>
            <Stack gap={2}>
              <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                <CustomFormControl
                  name={"fullname"}
                  label={"Họ và tên"}
                  type={"text"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  error={errors.fullname}
                  fullWidth={true}
                />
                <CustomFormControl
                  name={"email"}
                  label={"Email"}
                  type={"email"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  error={errors.email}
                  fullWidth={true}
                />
                <CustomFormControl
                  name={"phonenumber"}
                  label={"Số điện thoại"}
                  type={"phonenumber"}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  error={errors.phonenumber}
                  fullWidth={true}
                />
              </Stack>
              <CustomFormControl
                name={"content"}
                label={"Nội dung"}
                type={"content"}
                register={register}
                rules={{
                  required: true,
                }}
                error={errors.content}
                fullWidth={true}
                fieldType="textarea"
              />
              <Box>
                <Button
                  variant="contained"
                  sx={{ float: "right" }}
                  type="submit"
                >
                  Gửi
                </Button>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </>
  );
}
