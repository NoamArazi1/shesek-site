/* =========================================================================
   data.js — תוכן שמתעדכן לעיתים קרובות. ערוך כאן בלי לגעת בשאר הקוד.
   ========================================================================= */
window.SITE = {

  /* ---- קישורים חיצוניים ----
     החלף את ה-# בכתובות האמיתיות של הפרופילים. */
  links: {
    instagram: "https://instagram.com/shesek.band",   // ← אם ה-handle שונה, עדכנו
    facebook:  "https://www.facebook.com/shesek.band/",
    spotify:   "https://open.spotify.com/artist/3QxukPZIq9Qr7JtdWGQRog",
    apple:     "https://music.apple.com/us/artist/shesek/1594417420",
    youtube:   "https://youtu.be/9mIG5RQPYtc",         // ← רצוי קישור לערוץ
    email:     "shesek.band@gmail.com",
    phone:     "+972587102010",
    phoneDisplay: "058-710-2010"
  },

  /* ---- Spotify embed ----
     מוטמע האלבום האחרון "Wow No!" (2025). להחלפה: type:"album"/"playlist", id:"<ID>". */
  spotify: { type: "album", id: "4cXepIVNJ6S6F5mqrJV6QO" },

  /* ---- סרטון מוטמע בראש סקשן המוזיקה (מזהה יוטיוב) ---- */
  featuredVideo: "9mIG5RQPYtc",

  /* ---- נתונים מספריים (About) ---- */
  stats: [
    { num: "2",    key: "about.stat1.label" },   // מערכות תופים
    { num: "’23",  key: "about.stat2.label" },   // אלבום בכורה — The Legend of Tao
    { num: "’25",  key: "about.stat3.label" }    // אלבום שני — Wow No!
  ],

  /* ---- הופעות קרובות ----
     כל אובייקט: { date:"2026-07-15", venue:{he,en}, city:{he,en}, tickets:"URL" }
     רשימה ריקה => מוצג טקסט "אין תאריכים". */
  shows: [
    // דוגמה (מחק/ערוך):
    // { date: "2026-08-12", venue: { he: "לבונטין 7", en: "Levontin 7" },
    //   city: { he: "תל אביב", en: "Tel Aviv" }, tickets: "#" }
  ],

  /* ---- גלריה ----
     type: "image" | "video". image: src=נתיב קובץ. video: id=מזהה יוטיוב.
     הוסף קבצים ל-assets/gallery/ והפנה אליהם כאן. */
  gallery: [
    { type: "video", id: "9mIG5RQPYtc", caption: "Shesek — latest video" },
    { type: "image", src: "assets/gallery/live-1.jpg", caption: "Live" },
    { type: "image", src: "assets/gallery/live-3.jpg", caption: "Live" },
    { type: "image", src: "assets/gallery/live-2.jpg", caption: "Live" },
    { type: "image", src: "assets/gallery/live-5.jpg", caption: "Live" },
    { type: "image", src: "assets/gallery/live-4.jpg", caption: "Live" },
    { type: "image", src: "assets/band.jpg", caption: "Shesek" }
  ],

  /* ---- סלайדשו רקע בהירו (מתחלף) — תמונות רוחביות עובדות הכי טוב ---- */
  heroSlides: [
    "assets/gallery/live-1.jpg",
    "assets/gallery/live-4.jpg",
    "assets/gallery/live-5.jpg",
    "assets/gallery/live-2.jpg"
  ],

  /* ---- חולצות ----
     price: מספר בש"ח. sizes: רשימת מידות. img: נתיב תמונה (assets/merch/...). */
  merch: [
    { id: "tee-signature",
      name: { he: "חולצת שסק", en: "Shesek Tee" },
      price: 85, sizes: ["S", "M", "L", "XL"],
      img:     "assets/merch/tee-front.jpg",   // חזית — חתימה
      imgBack: "assets/merch/tee-back.jpg" }   // גב — איור ענף השסק
  ],

  /* ---- Endpoints של טפסים ----
     החלף ב-endpoint של Formspree (https://formspree.io/f/XXXX).
     כל עוד הערך מכיל "REPLACE" — הטופס מציג הצלחה לדמו בלי לשלוח באמת. */
  forms: {
    order:      "https://formspree.io/f/REPLACE_ORDER_ID",
    newsletter: "https://formspree.io/f/REPLACE_NEWS_ID"
  }
};
