"use client";

import { useEffect, useRef, useState } from "react";
import { Puzzle } from "./Puzzle";
import { Reveal } from "./Reveal";
import { gallery } from "@/data/wedding";
import s from "./Gallery.module.css";

/** Cuộn đi bao nhiêu thì coi như người xem đã hiểu là kéo ngang được */
const SEEN = 24;

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState(false);

  /*
     Lần đầu cuộn tới, đẩy dải phim nhích một nhịp rồi trả về chỗ cũ. Nói "kéo
     ngang được" bằng chuyển động thì nhanh hơn mọi dòng chữ.
  */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (track.scrollLeft > SEEN) return;
        track.scrollTo({ left: 64, behavior: "smooth" });
        window.setTimeout(() => track.scrollTo({ left: 0, behavior: "smooth" }), 620);
      },
      { threshold: 0.35 },
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="album" className="section section--beige section--beige-light section--grain" aria-labelledby="album-title">
      <div className="container">
        <Reveal className="section-head" delay={60}>
          <p className="eyebrow">{gallery.eyebrow}</p>
          <h2 id="album-title" className="h2">
            {gallery.title}
          </h2>
          <p className="lead">{gallery.note}</p>
        </Reveal>
      </div>

      <div className={s.reel}>
        <img className={s.can} src="/art/film-can.webp" alt="" aria-hidden="true" />

        <div
          ref={trackRef}
          className={s.track}
          tabIndex={0}
          role="group"
          aria-label={gallery.title}
          onScroll={(e) => setMoved(e.currentTarget.scrollLeft > SEEN)}
        >
          {gallery.shots.map((shot) => (
            <figure key={shot.src} className={s.frame}>
              <img className={s.photo} src={shot.src} alt={shot.alt} width={760} height={541} />
              {/* Khung phim nằm đè lên ảnh, lỗ răng cưa là phần trong suốt của file */}
              <img className={s.film} src="/art/film-frame.webp" alt="" aria-hidden="true" />
            </figure>
          ))}
        </div>

        <div className={s.fade} aria-hidden="true" />
      </div>

      <p className={s.hint} data-done={moved || undefined}>
        {gallery.hint}
        <span className={s.arrow} aria-hidden="true">
          →
        </span>
      </p>

      <div className="container container--content">
        <Reveal className={s.puzzle} delay={120}>
          <Puzzle />
        </Reveal>
      </div>
    </section>
  );
}
