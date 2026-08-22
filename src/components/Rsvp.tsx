"use client";

import { useState, type FormEvent } from "react";
import { Decor } from "./Decor";
import { Reveal } from "./Reveal";
import { rsvp } from "@/data/wedding";
import s from "./Rsvp.module.css";

type Status = "idle" | "sending" | "sent" | "error";

type Payload = {
  name: string;
  phone: string;
  attending: "yes" | "no";
  guests: string;
  message: string;
  submittedAt: string;
};

const STORE_KEY = "rsvp-submissions";

/** Lưu lại ở máy khách để không mất dữ liệu khi chưa cắm Google Sheets. */
function keepLocally(payload: Payload) {
  try {
    const prev = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]") as Payload[];
    localStorage.setItem(STORE_KEY, JSON.stringify([...prev, payload]));
  } catch {
    // Trình duyệt chặn localStorage (chế độ ẩn danh) — không sao.
  }
}

export function Rsvp() {
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: Payload = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      attending,
      guests: attending === "yes" ? String(data.get("guests") ?? "1") : "0",
      message: String(data.get("message") ?? "").trim(),
      submittedAt: new Date().toISOString(),
    };

    setStatus("sending");
    keepLocally(payload);

    if (!rsvp.endpoint) {
      // Chưa có endpoint: coi như gửi thành công, dữ liệu nằm ở localStorage.
      setStatus("sent");
      return;
    }

    try {
      // text/plain để Apps Script không bị chặn bởi CORS preflight.
      await fetch(rsvp.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="section section--red" aria-labelledby="rsvp-title">
      {/* Nền đỏ nên hoạ tiết dùng bộ kem */}
      <Decor src="beige/letters" x="-6%" y="6%" w="clamp(78px, 19vw, 172px)" r="-8deg" motion="sway" duration="10s" />
      <Decor src="beige/bow" x="82%" y="3%" w="clamp(72px, 18vw, 158px)" r="7deg" motion="sway" duration="9s" delay="-2s" />
      <Decor src="beige/dove" x="86%" y="74%" w="clamp(54px, 13vw, 112px)" r="-9deg" motion="float" duration="8s" delay="-1s" />
      <Decor src="beige/starburst" x="2%" y="68%" w="clamp(28px, 7vw, 66px)" motion="twinkle" duration="5.2s" />

      <div className="container container--narrow sheet">
        <img className="seal" src="/art/seal.webp" alt="" aria-hidden="true" />
        <Reveal className="section-head">
          <p className="eyebrow">RSVP</p>
          <h2 id="rsvp-title" className="h2">
            {rsvp.title}
          </h2>
          <p className="lead">{rsvp.note}</p>
        </Reveal>

        <Reveal delay={100}>
          {status === "sent" ? (
            <div className={s.done}>
              <img className={s.seal} src="/art/seal.webp" alt="" aria-hidden="true" />
              <h3 className="h3">{rsvp.successTitle}</h3>
              <p className="script">{rsvp.successNote}</p>
              <button type="button" className="btn btn--outline" onClick={() => setStatus("idle")}>
                Gửi thêm một lời nữa
              </button>
            </div>
          ) : (
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.two}>
                <div className="field">
                  <label className="label" htmlFor="rsvp-name">
                    Tên của bạn
                  </label>
                  <input className="input" id="rsvp-name" name="name" required autoComplete="name" placeholder="Nguyễn Văn A" />
                </div>
                <div className="field">
                  <label className="label" htmlFor="rsvp-phone">
                    Số điện thoại
                  </label>
                  <input
                    className="input"
                    id="rsvp-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="09xx xxx xxx"
                  />
                </div>
              </div>

              <fieldset className={s.fieldset}>
                <legend className="label">Bạn tới được không?</legend>
                <div className="choice">
                  <label className="choice__item">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === "yes"}
                      onChange={() => setAttending("yes")}
                    />
                    <span>Có chứ, tui tới!</span>
                  </label>
                  <label className="choice__item">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === "no"}
                      onChange={() => setAttending("no")}
                    />
                    <span>Tiếc quá, tui bận mất rồi</span>
                  </label>
                </div>
              </fieldset>

              {attending === "yes" ? (
                <div className="field">
                  <label className="label" htmlFor="rsvp-guests">
                    Bạn đi mấy người?
                  </label>
                  <select className="select" id="rsvp-guests" name="guests" defaultValue="1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} người
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="field">
                <label className="label" htmlFor="rsvp-message">
                  Nhắn cho tụi mình một câu nha
                </label>
                <textarea
                  className="textarea"
                  id="rsvp-message"
                  name="message"
                  placeholder="Chúc hai đứa cưới xong vẫn còn thương nhau nhiều như vậy…"
                />
              </div>

              {status === "error" ? (
                <p className="error">Gửi chưa được, bạn thử lại giúp tụi mình một lần nữa nha.</p>
              ) : null}

              <div className={s.submit}>
                <button type="submit" className="btn btn--stamp" disabled={status === "sending"}>
                  <span className="btn__star" aria-hidden="true">
                    ★
                  </span>
                  {status === "sending" ? "Đang gửi…" : "Gửi lời hồi âm"}
                  <span className="btn__star" aria-hidden="true">
                    ★
                  </span>
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
