import { dateLabel, weddingDate } from "@/data/wedding";

const DOW = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/**
 * Lịch tháng cưới, khoanh tròn đúng ngày.
 * Tính bằng UTC để kết quả trên server và trên máy khách luôn khớp nhau, bất kể
 * múi giờ của người xem — nếu dùng giờ địa phương thì ngày sẽ lệch và hydration lỗi.
 */
function monthGrid(iso: string) {
  const d = new Date(iso);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();

  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  // getUTCDay(): 0 = Chủ Nhật. Lịch bắt đầu từ Thứ Hai nên dịch lại một nhịp.
  const leading = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;

  return {
    day,
    cells: [
      ...Array.from({ length: leading }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ],
  };
}

export function Calendar() {
  const { day, cells } = monthGrid(weddingDate);

  return (
    <div className="calendar">
      <p className="calendar__month">
        Tháng {dateLabel.month} · {dateLabel.year}
      </p>

      <ul className="calendar__grid">
        {DOW.map((label) => (
          <li key={label} className="calendar__dow" aria-hidden="true">
            {label}
          </li>
        ))}
        {cells.map((n, i) => (
          <li
            key={n ?? `empty-${i}`}
            className={`calendar__day${n === null ? " calendar__day--empty" : ""}${n === day ? " calendar__day--mark" : ""}`}
          >
            {n ?? ""}
          </li>
        ))}
      </ul>

      <hr className="calendar__rule" />

      <p className="calendar__label">Save the date</p>
      <p className="calendar__date">
        {dateLabel.day}.{dateLabel.month}.{dateLabel.year}
      </p>
      <svg className="calendar__heart" viewBox="0 0 24 22" fill="currentColor" aria-hidden="true">
        <path d="M12 21S1.8 14.3 1.8 7.6A5.6 5.6 0 0 1 12 4.4a5.6 5.6 0 0 1 10.2 3.2C22.2 14.3 12 21 12 21Z" />
      </svg>
    </div>
  );
}
