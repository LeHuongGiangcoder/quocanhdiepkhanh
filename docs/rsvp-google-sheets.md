# Nối form RSVP vào Google Sheets

Form vẫn chạy được khi chưa nối — dữ liệu lưu tạm trong `localStorage` của khách,
không mất nhưng cũng không gửi đi đâu. Làm theo 5 bước dưới đây để nhận thẳng vào Sheet.

## 1. Tạo Sheet

Tạo một Google Sheet mới, đặt tên tab đầu tiên là `RSVP`, và điền hàng tiêu đề:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Thời gian | Họ tên | Điện thoại | Tham dự | Số người | Buổi tham dự | Lời nhắn |

## 2. Dán Apps Script

Trong Sheet: **Extensions → Apps Script**, xoá hết code mẫu rồi dán:

```javascript
const SHEET_NAME = 'RSVP';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),
      data.name || '',
      "'" + (data.phone || ''), // dấu nháy để Sheets không cắt số 0 ở đầu
      data.attending === 'yes' ? 'Có' : 'Không',
      data.guests || '',
      (data.events || []).join(', '),
      data.message || '',
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. Deploy

**Deploy → New deployment → Web app**

- Execute as: **Me**
- Who has access: **Anyone**

Bấm Deploy, cấp quyền, rồi copy **Web app URL** (dạng
`https://script.google.com/macros/s/AKfy.../exec`).

## 4. Khai báo URL

Ở máy, tạo file `.env.local`:

```
NEXT_PUBLIC_RSVP_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
```

Trên Vercel: **Settings → Environment Variables**, thêm đúng tên biến đó cho cả
Production và Preview, rồi redeploy.

## 5. Thử

Điền form và bấm gửi — một dòng mới phải hiện ra trong Sheet trong vài giây.

## Vài điểm cần biết

- Request gửi bằng `Content-Type: text/plain` để trình duyệt không phải hỏi
  preflight CORS. Apps Script vẫn đọc được nguyên vẹn chuỗi JSON.
- Mỗi lần **sửa code** Apps Script phải **Deploy → Manage deployments → Edit →
  New version**, nếu không URL cũ vẫn chạy code cũ.
- Mọi lượt gửi đều được ghi thêm vào `localStorage` của khách (khoá
  `rsvp-submissions`) như một bản sao dự phòng.
- Muốn nhận email mỗi lần có người trả lời: trong Sheet vào **Tools → Notification
  settings**.
