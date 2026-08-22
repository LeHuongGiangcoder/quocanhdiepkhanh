import { Calendar } from "./Calendar";
import { Decor } from "./Decor";
import { Reveal } from "./Reveal";
import { venue } from "@/data/wedding";
import s from "./Details.module.css";

export function Details() {
  return (
    <section id="thong-tin" className="section section--stripe" aria-labelledby="thong-tin-title">
      {/* Nền be nên hoạ tiết dùng bộ đỏ */}
      <Decor src="red/dove" x="82%" y="7%" w="clamp(66px, 16vw, 134px)" r="-8deg" motion="float" duration="8s" />
      <Decor src="red/bouquet" x="-2%" y="80%" w="clamp(66px, 16vw, 140px)" r="-7deg" motion="float" duration="9.5s" delay="-2s" />

      <div className="container container--content sheet">
        <img className="seal" src="/art/seal.webp" alt="" aria-hidden="true" />

        <Reveal className="section-head" delay={60}>
          <p className="eyebrow">Thông tin lễ cưới</p>
          <h2 id="thong-tin-title" className="h2">
            Ngày tụi mình về chung một nhà
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <Calendar />
        </Reveal>

        <hr className={s.divider} />

        <Reveal className={s.venue} delay={180}>
          <img className={`${s.illustration} sway`} src="/art/venue.webp" alt="" aria-hidden="true" />
          <p className="eyebrow">Địa điểm</p>
          <h3 className="h3">{venue.name}</h3>
          <p className="h4">{venue.hall}</p>
          <p className="muted">{venue.address}</p>
          <p className="script">{venue.note}</p>
          <a className="btn btn--stamp" href={venue.mapUrl} target="_blank" rel="noreferrer noopener">
            <span className="btn__star" aria-hidden="true">
              ★
            </span>
            Xem bản đồ
            <span className="btn__star" aria-hidden="true">
              ★
            </span>
          </a>
        </Reveal>

      </div>
    </section>
  );
}
