import { blue, green, grey, red } from "@mui/material/colors";

export const USER_ROLE = 0;
export const ADMIN_ROLE = 1;

export const SEX = {
  0: "Nữ",
  1: "Nam",
};

export const DEFAULT_MENU_ITEMS = [
  {
    content: "Mua vé",
    href: "/book-ticket",
  },
  {
    content: "Phim",
    children: [
      {
        content: "Phim sắp chiếu",
        href: "/movies/coming-soon",
      },
      {
        content: "Phim đang chiếu",
        href: "/movies/now-showing",
      },
    ],
  },
  {
    content: "Tin tức",
    href: "/news",
  },
  {
    content: "Rạp",
    href: "/cinema",
  },
  {
    content: "Hỗ trợ",
    href: "/support",
  },
];

export const ADMIN_MENU_ITEMS = [
  { content: "Người dùng", href: "/admin/users" },
  { content: "Phim", href: "/admin/movies" },
  { content: "Doanh thu", href: "/admin/revenue" },
  { content: "Vé", href: "/admin/tickets" },
];

export const MESSAGES = {
  fullname: {
    required: "Hãy nhập Họ và tên!",
  },
  phonenumber: {
    required: "Hãy nhập Số điện thoại!",
  },
  email: {
    required: "Hãy nhập email!",
    notExists: "Email không tồn tại!",
    format: "Email không đúng định dạng!",
  },
  sex: {
    required: "Hãy chọn giới tính!",
  },
  password: {
    required: "Hãy nhập mật khẩu!",
    minLength: "Mật khẩu phải có ít nhất 8 ký tự!",
    incorrect:
      "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số, một ký tực đặc biệt!",
    maxLength: "Mật khẩu tối đa 30 ký tự!",
  },
  repassword: {
    required: "Hãy nhập lại mật khẩu!",
    incorrect: "Mật khẩu nhập lại không đúng!",
  },
  birthday: {
    required: "Hãy chọn ngày sinh!",
  },
  poster: {
    required: "Hãy nhập link ảnh!",
  },
  title: {
    required: "Hãy nhập tiêu đề!",
  },
  genre: {
    required: "Hãy chọn ít nhất một thể loại!",
  },
  direction: {
    required: "Hãy nhập tên đạo diễn!",
  },
  writer: {
    required: "Hãy nhập ít nhất một tên biên kịch!",
  },
  actor: {
    required: "Hãy nhập ít nhất một tên diễn viên!",
  },
  runtime: {
    required: "Hãy nhập thời lượng phim!",
  },
  rated: {
    required: "Hãy chọn giới hạn độ tuổi!",
  },
  released: {
    required: "Hãy chọn ngày ra mắt!",
  },
  startDate: {
    required: "Hãy điền ngày chiếu đầu tiên!",
  },
  endDate: {
    required: "Hãy điền ngày chiếu cuối cùng!",
  },
  paymentMethod: {
    required: "Hãy chọn phương thức thanh toán!",
  },
};

export const CELL_TYPES = {
  image: ["poster"],
  price: ["ticket", "toMoney"],
};

export const REATEDS = [
  {
    symbol: "G",
    note: "Phim dành cho mọi lứa tuổi.",
  },
  {
    symbol: "PG",
    note: "Phim có thể có một số chi tiết (hình ảnh, từ ngữ) không phù hợp với trẻ nhỏ. Bố mẹ cần cân nhắc khi cho con cái xem phim.",
  },
  {
    symbol: "PG-13",
    note: "Phim có một số chi tiết không phù hợp với trẻ dưới 13 tuổi.",
  },
  {
    symbol: "R",
    note: "Thanh thiếu niên dưới 17 tuổi không được xem phim nếu không có sự đồng ý của người lớn.",
  },
  {
    symbol: "NC-17",
    note: "Phim hoàn toàn không dành cho khán giả dưới 17 tuổi, do có nhiều yếu tố gây ảnh hưởng xấu đến nhân cách, đạo đức, khuyến khích hành vi phạm tội.",
  },
];

export const GENRES = [
  {
    id: 1,
    name: "Hành động",
  },
  {
    id: 2,
    name: "Phiêu lưu",
  },
  {
    id: 3,
    name: "Hài",
  },
  {
    id: 4,
    name: "Chính kịch",
  },
  {
    id: 5,
    name: "Giả tưởng",
  },
  {
    id: 6,
    name: "Kinh dị",
  },
  {
    id: 7,
    name: "Nhạc",
  },
  {
    id: 8,
    name: "Bí ẩn",
  },
  {
    id: 9,
    name: "Lãng mạn",
  },
  {
    id: 10,
    name: "Khoa học viễn tưởng",
  },
  {
    id: 11,
    name: "Thể thao",
  },
  {
    id: 12,
    name: "Phương Tây",
  },
  {
    id: 13,
    name: "Hoạt hình",
  },
  {
    id: 14,
    name: "Lịch sử",
  },
  {
    id: 15,
    name: "Tội phạm",
  },
  {
    id: 16,
    name: "Tâm lý - Tình cảm",
  },
  {
    id: 17,
    name: "Học đường",
  },
];

export const LANGUAGES = [
  "Tiếng Việt",
  "Tiếng Anh",
  "Tiếng Nhật",
  "Tiếng Pháp",
  "Tiếng Tây Ban Nha",
  "Tiếng Thái",
  "Tiếng Hàn",
];

export const COUNTRIES = [
  "Việt Nam",
  "Anh",
  "Nhật Bản",
  "Tây Ban Nha",
  "Mỹ",
  "Thái Lan",
  "Hàn Quốc",
];

export const RATING_RANGE_OPTIONS = ["0 - 4", "4 - 6", "6 - 8", "8 - 10"];

export const PRICE_RANGE_OPTIONS = [
  "0 - 50000",
  "50000 - 100000",
  "100000 - 200000",
];

export const AGE_RANGE_OPTIONS = ["18 - 30", "30 - 40", "40 - 60"];

export const TICKET_AMOUNT_RANGE_OPTIONS = ["0 - 5", "5 - 10", "> 10"];

export const IS_DATE = {
  inRange: 0,
  afterRange: 1,
  default: -2,
};

export const SEAT_STATUSES = {
  isSelecting: {
    label: "Ghế đang chọn",
    color: green[600],
  },
  bought: {
    label: "Ghế đã bán",
    color: red[600],
  },
  available: {
    label: "Ghế có thể chọn",
    color: grey[200],
  },
  unavailable: {
    label: "Ghế không thể chọn",
    color: blue[600],
  },
};

export const SEATS_TYPES = {
  normal: {
    rows: ["A", "B", "C", "D"],
    pricePlus: 0,
  },
  vip: {
    pricePlus: 5000,
  },
};

export const PAYMENT_OPTIONS = {
  1: "Thanh toán tại quầy",
  2: "Thanh toán online",
};
