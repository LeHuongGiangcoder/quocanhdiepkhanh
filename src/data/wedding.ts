/**
 * Toàn bộ nội dung của website nằm ở file này.
 * Sửa ở đây là xong — không cần đụng vào code của các section.
 *
 * ⚠️ Các giá trị hiện tại là DỮ LIỆU GIẢ (placeholder) để dựng giao diện.
 */

export type Attendance = "yes" | "no";

export const couple = {
  /** Tên hiển thị lớn ở hero */
  groom: "Quốc Anh",
  bride: "Diệp Khanh",
  groomFull: "Nguyễn Quốc Anh",
  brideFull: "Phạm Diệp Khanh",
  groomParents: ["Ông Nguyễn Văn Hùng", "Bà Trần Thị Lan"],
  brideParents: ["Ông Phạm Minh Tuấn", "Bà Lê Thị Hồng"],
  hashtag: "#QuocAnhCuoiDiepKhanh",
};

/** Mốc thời gian dùng cho đồng hồ đếm ngược (giờ Việt Nam, UTC+7) */
export const weddingDate = "2026-11-08T11:00:00+07:00";

export const dateLabel = {
  weekday: "Chủ Nhật",
  day: "08",
  month: "11",
  year: "2026",
  lunar: "Nhằm ngày 30 tháng 9 năm Bính Ngọ",
};

export const venue = {
  name: "Trung tâm Hội nghị Hoa Sứ",
  hall: "Sảnh Ngọc Lan · Lầu 2",
  address: "45 Trần Hưng Đạo, P. Bến Nghé, Q.1, TP. Hồ Chí Minh",
  mapUrl: "https://maps.google.com/?q=45+Tran+Hung+Dao+Ben+Nghe+Quan+1+Ho+Chi+Minh",
  note: "Có bãi giữ xe ngay trong sân, bạn cứ chạy thẳng vào nha.",
};

/** `icon` là tên file trong /public/art/beige và /public/art/red (cùng tên, hai màu) */
export type AgendaItem = { time: string; title: string; icon: string };

export const agenda: AgendaItem[] = [
  { time: "17:00", title: "Đón khách", icon: "letters" },
  { time: "18:00", title: "Khai tiệc", icon: "champagne" },
  { time: "18:30", title: "Lễ thành hôn", icon: "bow" },
  { time: "19:00", title: "Cắt bánh", icon: "cake" },
  { time: "19:30", title: "Dùng tiệc", icon: "cake-slice" },
  { time: "20:30", title: "Chụp ảnh lưu niệm", icon: "cupcake" },
];

export const dresscode = {
  title: "Dresscode",
  headline: "Bộ đồ đẹp nhất trong tủ đồ của bạn",
  note: "Không luật lệ gì đâu — mặc thứ khiến bạn thấy mình xinh nhất là được rồi.",
};

export const rsvp = {
  title: "Bạn tới với tụi mình nha?",
  note: "Nhắn giùm tụi mình một tiếng để còn chuẩn bị chỗ ngồi thật đẹp cho bạn.",
  /**
   * URL của Google Apps Script Web App (xem docs/rsvp-google-sheets.md).
   * Để trống thì form vẫn chạy bình thường, dữ liệu lưu tạm ở localStorage.
   */
  endpoint: process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? "",
  successTitle: "Nhận được rồi nè!",
  successNote: "Cảm ơn bạn thiệt nhiều. Tụi mình sẽ giữ sẵn một chỗ ngồi xinh xinh cho bạn.",
};

export const thanks = {
  title: "Cảm ơn bạn",
  lines: [
    "Ngày vui mà thiếu bạn thì không trọn được.",
    "Hẹn gặp bạn ở đám cưới — nhớ đói bụng sẵn nha!",
  ],
  signature: "Thương nhiều, Quốc Anh & Diệp Khanh",
  /** Ba bé mèo trong tranh — để trống mảng này nếu không muốn hiện tên */
  cats: ["Bơ", "Sữa", "Mochi"],
};

/**
 * Nhạc nền — bật sau khi bấm "Print now".
 * Bỏ file mp3 vào /public/audio/ rồi điền tên file vào đây.
 * Để trống thì nút nhạc tự ẩn.
 */
export const music = {
  src: "",
  title: "",
};
