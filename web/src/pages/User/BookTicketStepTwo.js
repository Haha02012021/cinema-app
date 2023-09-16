import { Button, Container, Grid, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import CustomFormControl from "../../components/CustomFormControl";
import CustomSelectField from "../../components/CustomSelectField";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { MESSAGES, PAYMENT_OPTIONS } from "../../constants";
import MovieCard from "../../partials/User/BookTicket/MovieCard";
import { createTicket } from "../../services/ticketService";
import { toast } from "react-toastify";
import { LoadingContext } from "../../contexts/LoadingProvider";

export default function BookTicketStepTwo() {
  const auth = useSelector((state) => state.auth);
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const watchPaymentMethod = watch("paymentMethod");
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    auth?.user && setDefaultForm();
  }, [auth.user]);

  const setDefaultForm = () => {
    setValue("paymentMethod", state.paymentMethod);
    setValue("fullname", auth.user.fullname);
    setValue("email", auth.user.email);
    setValue("phonenumber", auth.user.phonenumber);
  };

  const handleSubmitForm = async (data) => {
    const newTicket = {
      movieId: state.movie.id,
      showTime: {
        time: state.time,
        date: state.date,
      },
      userId: auth.user.id,
      seats: state.seats,
      total: state.total,
      userInfo: {
        fullname: data.fullname,
        email: data.email,
        phonenumber: data.phonenumber,
      },
      paymentMethod: data.paymentMethod,
      tid: Math.random().toFixed(16).split(".")[1],
    };
    setLoading(true);
    try {
      await createTicket(newTicket);
      setLoading(false);
      toast.success("Đặt vé thành công!");
      navigate(`/profile/${auth.user.id}/transactions`);
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
  };

  const handleBack = () => {
    navigate("/book-ticket/step-1", {
      state: {
        ...state,
        ...getValues(),
      },
    });
  };

  return (
    <Container>
      <SectionTitle title={"Vui lòng thanh toán"} />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <Container
            sx={(theme) => ({
              width: "60%",
              [theme.breakpoints.down("sm")]: {
                width: "96%",
              },
            })}
          >
            <form onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}>
              <Stack gap={4}>
                <Stack spacing={4}>
                  <CustomSelectField
                    name={"paymentMethod"}
                    label={"Phương thức thanh toán"}
                    register={register}
                    rules={{
                      required: true,
                    }}
                    options={Object.entries(PAYMENT_OPTIONS).map(
                      ([key, value]) => {
                        return {
                          value: key,
                          label: value,
                        };
                      },
                    )}
                    error={errors.paymentMethod}
                    watch={watchPaymentMethod}
                  />
                  <CustomFormControl
                    fullWidth={true}
                    label={"Họ và tên"}
                    register={register}
                    name={"fullname"}
                    rules={{
                      required: true,
                    }}
                    error={errors.fullname}
                  />
                  <CustomFormControl
                    fullWidth={true}
                    label={"Email"}
                    register={register}
                    name={"email"}
                    rules={{
                      required: true,
                    }}
                    error={errors.email}
                  />
                  <CustomFormControl
                    fullWidth={true}
                    label={"Số điện thoại"}
                    register={register}
                    name={"phonenumber"}
                    type={"phonenumber"}
                    rules={{
                      required: true,
                    }}
                    error={errors.phonenumber}
                  />
                </Stack>
                <Stack direction={"row"} gap={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "100%" }}
                    size="large"
                    onClick={handleBack}
                  >
                    Quay lại
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "100%" }}
                    size="large"
                    type="submit"
                  >
                    Thanh toán
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Container>
        </Grid>
        <Grid item xs={12} sm={3}>
          <MovieCard
            movie={state.movie}
            time={state.time}
            date={state.date}
            selectingSeats={state.seats}
            total={state.total}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
