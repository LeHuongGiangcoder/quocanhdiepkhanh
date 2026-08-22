import { Decor } from "./Decor";
import { Reveal } from "./Reveal";
import { agenda } from "@/data/wedding";
import s from "./Agenda.module.css";

/*
  Sợi dây uốn lượn nối các mốc giờ.
  Mỗi mốc chiếm một ô vuông 100×100 trong viewBox, dây cong sang trái/phải xen
  kẽ nên nối lại thành một đường liền mạch. Chấm tròn đặt ngay đỉnh cong —
  toạ độ x tính bằng công thức Bézier bậc ba tại t = 0,5:
      x = (P0 + 3·P1 + 3·P2 + P3) / 8 = (50 + 6·bulge + 50) / 8
*/
const BULGE = 92;
const CELL = 100;

/** Vị trí chấm tròn, tính theo phần trăm bề ngang cột dây */
function dotX(index: number) {
  const bulge = index % 2 === 0 ? BULGE : CELL - BULGE;
  return (100 + 6 * bulge) / 8;
}

function railPath(count: number) {
  let d = "M 50 0";
  for (let i = 0; i < count; i += 1) {
    const bulge = i % 2 === 0 ? BULGE : CELL - BULGE;
    const top = i * CELL;
    d += ` C ${bulge} ${top + 28}, ${bulge} ${top + 72}, 50 ${top + CELL}`;
  }
  return d;
}

export function Agenda() {
  const height = agenda.length * CELL;

  return (
    <section id="agenda" className="section section--red section--red-stripe" aria-labelledby="agenda-title">
      {/* Nền đỏ nên hoạ tiết dùng bộ kem */}
      <Decor src="beige/sparkle" x="4%" y="46%" w="clamp(26px, 6.5vw, 58px)" motion="twinkle" duration="4.8s" />
      <Decor src="beige/starburst" x="88%" y="62%" w="clamp(26px, 6.5vw, 58px)" motion="twinkle" duration="5.6s" delay="-2s" />
      <Decor src="beige/bouquet" x="-2%" y="84%" w="clamp(58px, 14vw, 124px)" r="8deg" motion="sway" duration="9.5s" delay="-3s" hideOnMobile />

      <div className="container container--content">
        <Reveal className="section-head">
          <p className="eyebrow">Agenda</p>
          <h2 id="agenda-title" className="h2">
            Buổi tối hôm đó sẽ diễn ra như vầy
          </h2>
        </Reveal>

        <div className={s.timeline}>
          <svg
            className={s.rail}
            viewBox={`0 0 ${CELL} ${height}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d={railPath(agenda.length)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          {/*
            Chấm tròn vẽ bằng HTML chứ không phải <circle>: SVG bị kéo giãn không
            đều (preserveAspectRatio="none") nên hình tròn trong đó sẽ méo thành bầu dục.
          */}
          <div className={s.dots} aria-hidden="true">
            {agenda.map((item, i) => (
              <span
                key={item.time}
                className={s.dot}
                style={{ left: `${dotX(i)}%`, top: `${((i + 0.5) / agenda.length) * 100}%` }}
              />
            ))}
            {/* Trái tim nhỏ khép lại cuối sợi dây */}
            <svg className={s.heart} viewBox="0 0 24 22" fill="currentColor">
              <path d="M12 21S1.8 14.3 1.8 7.6A5.6 5.6 0 0 1 12 4.4a5.6 5.6 0 0 1 10.2 3.2C22.2 14.3 12 21 12 21Z" />
            </svg>
          </div>

          <ol className={s.list}>
            {agenda.map((item, i) => (
              <Reveal
                as="li"
                key={item.time}
                className={`${s.row} ${i % 2 === 0 ? s.left : s.right}`}
                style={{ gridRow: i + 1 }}
                delay={i * 90}
              >
                <div className={s.entry}>
                  <img
                    className={`${s.icon} sway`}
                    style={{ "--dur": `${7 + i}s`, "--delay": `${-i * 1.3}s` } as React.CSSProperties}
                    src={`/art/beige/${item.icon}.webp`}
                    alt=""
                    aria-hidden="true"
                  />
                  <p className={s.time}>{item.time}</p>
                  <h3 className={s.title}>{item.title}</h3>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
