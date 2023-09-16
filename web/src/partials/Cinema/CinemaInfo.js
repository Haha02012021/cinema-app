import { Box, Stack, Typography } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { grey } from "@mui/material/colors";

export default function CinemaInfo() {
  return (
    <>
      <SectionTitle title={"Thông tin rạp"} />
      <Stack gap={3}>
        <Stack>
          <Stack direction={"row"} gap={1}>
            <Typography color={grey[600]} sx={{ minWidth: "fit-content" }}>
              Địa chỉ:{" "}
            </Typography>
            <Typography>
              144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography color={grey[600]}>Số điện thoại: </Typography>
            <Typography>0123 456 789</Typography>
          </Stack>
        </Stack>
        <Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8681607200683!2d105.77986877500074!3d21.037960587463044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454cab31a67a9%3A0x5244ae138a86f8dc!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBMdeG6rXQgLSDEkOG6oWkgaOG7jWMgcXXhu5FjIGdpYSBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1694615178110!5m2!1svi!2s"
            style={{
              border: 0,
              width: "100%",
              height: 480,
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </Box>
        <Typography>
          Cinema – rạp chiếu phim được xây dựng theo tiêu chuẩn quốc tế gồm 6
          phòng chiếu 2D&3D, âm thanh Dobly 7.1. Thiết kế trẻ trung, dịch vụ
          thân thiện, cập nhật liên tục những bộ phim mới nhất phim hay nhất
          trong nước cũng như quốc tế và mức giá vô cùng “hạt dẻ”.
        </Typography>
      </Stack>
    </>
  );
}
