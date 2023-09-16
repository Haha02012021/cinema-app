import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import { checkLogedInAction } from "../redux/actions/authActions";
import Header from "../partials/DefaultLayout/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionTitle from "../components/SectionTitle";
import { LoadingContext } from "../contexts/LoadingProvider";

export default function DefaultLayout({ noRole = false }) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    checkLogedIn();
  }, [dispatch, auth.isLogedIn]);

  const checkLogedIn = async () => {
    setLoading(true);
    try {
      await dispatch(checkLogedInAction());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Có lỗi xảy ra!");
    }
  };

  return (
    <Box sx={styles.layout}>
      <Header noRole={noRole} />
      <main>
        <Box sx={styles.main}>
          <Outlet />
        </Box>
      </main>
      <Container>
        <SectionTitle title={"Cinema"} />
        <Box>
          <Typography
            component="p"
            style={{
              marginTop: "0in",
              marginRight: "0in",
              marginBottom: "10.0pt",
              marginLeft: "0in",
              textAlign: "justify",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              <span>
                <Link href={"/"}>
                  <b> Cinema </b>
                </Link>
                &nbsp;là một trong những công ty tư nhân đầu tiên về điện ảnh
                được thành lập từ năm 2003, đã khẳng định thương hiệu là 1 trong
                10 địa điểm vui chơi giải trí được yêu thích nhất. Ngoài hệ
                thống rạp chiếu phim hiện đại, thu hút hàng triệu lượt người đến
                xem,{" "}
                <Link href={"/"}>
                  <b>Cinema</b>
                </Link>{" "}
                còn hấp dẫn khán giả bởi không khí thân thiện cũng như chất
                lượng dịch vụ hàng đầu.
              </span>
            </span>
          </Typography>
          <Typography
            component="p"
            style={{
              marginTop: "0in",
              marginRight: "0in",
              marginBottom: "10.0pt",
              marginLeft: "0in",
              textAlign: "justify",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              <span>
                Đến website{" "}
                <Link href={"/"}>
                  <i>Cinema</i>
                </Link>
                , khách hàng&nbsp;sẽ dễ dàng tham khảo các{" "}
                <Link href="/movies/coming-soon">
                  <i>phim hay nhất</i>
                </Link>
                ,&nbsp;
                <Link href="/movies/now-showing">
                  <i>phim mới nhất</i>
                </Link>{" "}
                đang chiếu hoặc sắp chiếu luôn được cập nhật thường xuyên.{" "}
                <Link href="/movies/showstime">
                  <i>Lịch chiếu</i>
                </Link>{" "}
                tại tất cả hệ thống{" "}
                <Link href={"/"}>
                  <i>rạp chiếu phim</i>{" "}
                </Link>
                của{" "}
                <Link href={"/"}>
                  <i>Cinema</i>
                </Link>{" "}
                cũng được cập nhật đầy đủ hàng ngày hàng giờ trên
                <i> trang chủ</i>.{" "}
              </span>
            </span>
          </Typography>
          <Typography
            component="p"
            style={{
              marginTop: "0in",
              marginRight: "0in",
              marginBottom: "10.0pt",
              marginLeft: "0in",
              textAlign: "justify",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              <span>
                Từ vũ trụ điện ảnh Marvel, người hâm mộ sẽ có cuộc tái ngộ với
                Người Nhện qua <em>Spider-Man: No Way Home</em> hoặc{" "}
                <em>Doctor Strange 2</em>. Ngoài ra{" "}
                <em>
                  007: No Time To Die, Turning Red, Minions: The Rise Of Gru
                </em>
                ..., là những tác phẩm hứa hẹn sẽ gây bùng nổ&nbsp;phòng vé
                trong thời gian tới.
              </span>
            </span>
          </Typography>
          <Typography
            component="p"
            style={{
              marginTop: "0in",
              marginRight: "0in",
              marginBottom: "10.0pt",
              marginLeft: "0in",
              textAlign: "justify",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              <span>
                Giờ đây đặt vé tại{" "}
                <b>
                  <Link href={"/"}>
                    <b>Cinema</b>
                  </Link>
                  &nbsp;
                </b>
                càng thêm dễ dàng chỉ với&nbsp;vài thao tác vô cùng đơn giản. Để
                mua vé, hãy vào tab Mua vé. Quý khách có thể chọn Mua vé theo
                phim, theo rạp, hoặc theo ngày. Sau đó, tiến hành mua vé theo
                các bước hướng dẫn. Chỉ trong vài phút, quý khách sẽ nhận được
                tin nhắn và email phản hồi <i>Đặt vé thành công</i> của{" "}
                <Link href={"/"}>
                  <b>Cinema</b>
                </Link>
                . Quý khách có thể dùng tin nhắn lấy vé tại quầy vé của &nbsp;
                <Link href={"/"}>
                  <b>Cinema</b>
                </Link>
                &nbsp; hoặc quét mã QR để một bước vào rạp mà không cần tốn thêm
                bất kỳ công đoạn nào nữa.
              </span>
            </span>
          </Typography>
          <Typography
            component="p"
            style={{
              marginTop: "0in",
              marginRight: "0in",
              marginBottom: "10.0pt",
              marginLeft: "0in",
              textAlign: "justify",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              <span>
                <Link href="/">
                  <b> Cinema</b>
                </Link>{" "}
                luôn có những chương trình
                <Link href="/promotions">
                  {" "}
                  <i>khuyến mãi</i>, <i>ưu đãi</i>
                </Link>
                , quà tặng vô cùng hấp dẫn như <i>giảm giá</i> vé, tặng vé xem
                phim miễn phí, tặng Combo, tặng quà phim… &nbsp;dành cho các
                khách hàng.
              </span>
            </span>
          </Typography>
          <Typography
            component="p"
            style={{
              marginTop: "0in",
              marginRight: "0in",
              marginBottom: "10.0pt",
              marginLeft: "0in",
              textAlign: "justify",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              <span>
                Hiện nay,{" "}
                <Link href="/">
                  <strong> Cinema</strong>
                </Link>{" "}
                đang ngày càng phát triển hơn nữa với các chương trình đặc sắc,
                các khuyến mãi hấp dẫn, đem đến cho khán giả những bộ phim bom
                tấn của thế giới và Việt Nam nhanh chóng và sớm nhất.
              </span>
            </span>
          </Typography>
        </Box>
      </Container>
      <footer style={styles.footer}>
        <Box sx={styles.footer__container}>
          <Container>
            <Typography variant="sm">© Thiết kế bởi HAHA</Typography>
          </Container>
        </Box>
      </footer>
      <ToastContainer></ToastContainer>
    </Box>
  );
}

const useStyles = (theme) => {
  return {
    layout: {
      position: "relative",
    },
    main: {
      paddingTop: "2rem",
      paddingBottom: "calc(2rem + 48px)",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "48px",
    },
    footer__container: {
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      height: "100%",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
    },
  };
};
