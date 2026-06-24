# Shesek — אתר ההרכב

אתר סטטי דו-לשוני (עברית/אנגלית), בלי שרת ובלי build. אסתטיקה אנלוגית/אוסילוסקופ, אקסנט ענבר.

## הרצה מקומית
פותחים את `index.html` בדפדפן. זהו. (אם ה-Spotify/פונטים לא נטענים — צריך חיבור אינטרנט.)

## עריכת תוכן — `data.js`
כל מה שמתעדכן יושב שם:
- **`links`** — כתובות הפרופילים (אינסטגרם/ספוטיפיי/יוטיוב/אפל/פייסבוק), מייל וטלפון. החליפו את ה-`#`.
- **`spotify`** — מזהה אלבום/פלייליסט. ברירת מחדל: הפלייליסט של ההרכב. לאלבום: `{ type:"album", id:"<ALBUM_ID>" }`.
- **`shows`** — הופעות קרובות. הוסיפו אובייקט לכל הופעה (תאריך, מקום, עיר, קישור כרטיסים). רשימה ריקה = מוצג "אין תאריכים".
- **`gallery`** — תמונות (`assets/gallery/...`) או וידאו (מזהה יוטיוב).
- **`merch`** — חולצות: שם, מחיר, מידות, נתיב תמונה (`assets/merch/...`).
- **`forms`** — endpoints של הטפסים (ראו למטה).

טקסטים (כותרות/כפתורים) נמצאים ב-`i18n.js` — לכל מפתח יש גרסה `he` ו-`en`.

## חיבור הטפסים (איסוף מיילים + הזמנות)
האתר סטטי, אז הטפסים עוברים דרך שירות חיצוני חינמי:
1. נכנסים ל-[formspree.io](https://formspree.io), פותחים חשבון חינם.
2. יוצרים 2 טפסים (אחד להזמנות, אחד לרשימת תפוצה), כל אחד מפנה ל-`shesek.band@gmail.com`.
3. מעתיקים את ה-endpoint (`https://formspree.io/f/XXXX`) ל-`data.js` → `forms.order` ו-`forms.newsletter`.

> כל עוד יש `REPLACE` ב-endpoint — הטופס מציג "נשלח" לדמו בלי לשלוח באמת.
> לרשימת תפוצה אמיתית עם דיוור: אפשר במקום זה להטמיע טופס של [MailerLite](https://mailerlite.com) (עד 1,000 נרשמים חינם).

## פריסה ל-GitHub Pages (חינם)
```
git init
git add .
git commit -m "Shesek site"
git branch -M main
git remote add origin https://github.com/<USER>/shesek-site.git
git push -u origin main
```
ואז: **Settings → Pages → Source: main / root**. האתר עולה תוך דקה ב-`https://<USER>.github.io/shesek-site`.

## נכסים — `assets/`
- `logo-bone.png` — הלוגו (חתימה) בגוון עצם, שקוף.
- `band.jpg` — תמונת ההרכב (צילום: תומר רבינוביץ׳).
- `epk/shesek-presskit-2024.pdf` — ערכת עיתונות.
- `gallery/`, `merch/` — להוסיף כאן תמונות חדשות ולהפנות אליהן ב-`data.js`.
