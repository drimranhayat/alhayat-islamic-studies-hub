(function () {
  const data = window.ALHAYAT_DATA;
  const app = document.getElementById("app");
  const page = document.body.dataset.page || "home";
  const params = new URLSearchParams(window.location.search);
  const inSubdir = !location.pathname.endsWith("/") || location.pathname.split("/").filter(Boolean).length > 1;
  const root = page === "home" ? "" : "../";

  const icons = {
    "book-open": "M4 5.5c2.8 0 4.7.8 6 2.1 1.3-1.3 3.2-2.1 6-2.1 1.1 0 2 .2 3 .5v12.7c-1-.3-1.9-.5-3-.5-2.8 0-4.7.8-6 2.1-1.3-1.3-3.2-2.1-6-2.1-1.1 0-2 .2-3 .5V6c1-.3 1.9-.5 3-.5Z",
    scroll: "M7 4h9a3 3 0 0 1 3 3v10H8a3 3 0 0 0-3 3V7a3 3 0 0 1 3-3Zm1 16h11",
    scale: "M12 3v18M5 7h14M7 7l-4 7h8L7 7Zm10 0l-4 7h8l-4-7Z",
    mosque: "M4 20V10l8-6 8 6v10M8 20v-6a4 4 0 0 1 8 0v6M3 10h18",
    star: "m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
    lightbulb: "M9 18h6M10 22h4M8 14a6 6 0 1 1 8 0c-.8.7-1 1.5-1 2H9c0-.5-.2-1.3-1-2Z",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.4 2.5 3.5 5.5 3.5 9S14.4 18.5 12 21C9.6 18.5 8.5 15.5 8.5 12S9.6 5.5 12 3Z",
    leaf: "M20 4C11 4 5 8 5 16c0 2.7 2 5 5 5 7 0 10-8 10-17ZM5 20c3-5 7-8 13-10",
    arabic: "M6 17c4 2 11 2 12-3 .5-2-1-4-4-4-2 0-4 1.5-4 4 0 4 6 5 9 2M5 7h.1M9 7h.1",
    network: "M7 7h.1M17 7h.1M12 17h.1M7 7l5 10 5-10M7 7h10",
    city: "M4 20V8h5v12M9 20V4h6v16M15 20V10h5v10M3 20h18",
    compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3-12-2 6-6 2 2-6 6-2Z",
    clipboard: "M9 4h6l1 2h3v15H5V6h3l1-2Zm0 7h6M9 15h6",
    library: "M4 19h16M6 17V5h3v12M11 17V5h3v12M16 17V5h3v12",
    database: "M5 6c0-2 14-2 14 0s-14 2-14 0Zm0 0v12c0 2 14 2 14 0V6M5 12c0 2 14 2 14 0",
    graduation: "M3 8l9-4 9 4-9 4-9-4Zm4 3v4c2 2 8 2 10 0v-4",
    route: "M5 5h5a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h10M5 5l2-2M5 5l2 2M19 17l-2-2M19 17l-2 2",
    users: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 2a3 3 0 1 0 0-6M2 21a6 6 0 0 1 12 0M14 21a5 5 0 0 1 8 0",
    tags: "M4 4h7l9 9-7 7-9-9V4Zm4 4h.1",
    hands: "M7 12V5a2 2 0 0 1 4 0v6M11 11V4a2 2 0 0 1 4 0v8M5 12c-2 1-2 5 1 7l3 2h7c3-2 4-5 4-9v-2",
    search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm6-2 4 4",
    pen: "M4 20h4L19 9l-4-4L4 16v4Zm10-14 4 4",
    quote: "M8 7H5v5h3v5H3V7h5Zm13 0h-3v5h3v5h-5V7h5Z",
    layers: "m12 3 9 5-9 5-9-5 9-5Zm-7 9 7 4 7-4M5 16l7 4 7-4",
    heart: "M20 8c0 6-8 11-8 11S4 14 4 8a4 4 0 0 1 7-2.6A4 4 0 0 1 20 8Z",
    family: "M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 21a6 6 0 0 1 12 0M13 21a4 4 0 0 1 8 0",
    gavel: "m14 5 5 5M11 8l5 5M4 21l8-8M6 3l8 8-3 3-8-8 3-3Zm9 12 6 6",
    shield: "M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z",
    atom: "M12 12h.1M19 12c0 2-3.1 4-7 4s-7-2-7-4 3.1-4 7-4 7 2 7 4ZM12 5c2 0 4 3.1 4 7s-2 7-4 7-4-3.1-4-7 2-7 4-7Z",
    file: "M7 3h7l5 5v13H7V3Zm7 0v5h5M10 13h6M10 17h6",
    kaaba: "M4 9 12 5l8 4v10H4V9Zm2 3h12M8 10v9M16 10v9",
    minaret: "M10 21V8l2-4 2 4v13M8 21h8M9 8h6M11 12h2M11 16h2",
    balance: "M12 4v17M6 8h12M6 8l-3 6h6L6 8Zm12 0l-3 6h6l-3-6Z",
    sprout: "M12 21V9M12 13c-4 0-7-2-8-6 4 0 7 2 8 6Zm0-1c4 0 7-2 8-6-4 0-7 2-8 6Z"
  };

  function icon(name, cls = "") {
    const d = icons[name] || icons["book-open"];
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  }

  function subjectById(id) {
    return data.subjects.find((subject) => subject.id === id) || data.subjects[0];
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
  }

  function sectionUrl(subject, index) {
    return `${root}subjects/?subject=${subject.id}&section=${index}`;
  }

  function subjectUrl(subject) {
    return `${root}subjects/?subject=${subject.id}`;
  }

  function lessonUrl(lesson) {
    return `${root}subjects/?lesson=${lesson.id}`;
  }

  function sectionIcon(title, fallback = "book-open") {
    const rules = [
      [/قرآن|تفسیر|آیات|سور|تلاوت|قراء|تجوید|وحی|نزول/, "book-open"],
      [/حدیث|سنت|روایت|سند|متن|محدث|رجال|جرح/, "scroll"],
      [/فقہ|قانون|شرعی|قضا|حدود|تعزیر|عدل|عدالت|دستور/, "scale"],
      [/مقاصد|مصلحت|مفسدت|قواعد/, "compass"],
      [/سیرت|نبوی|صحابہ|اہلِ بیت|غزوات|خلفا|تاریخ/, "mosque"],
      [/عقیدہ|ایمان|توحید|کلام|نبوت|آخرت|غیبیات/, "star"],
      [/فکر|فلسفہ|عقل|معرفت|تجدید|جدیدیت/, "lightbulb"],
      [/ادیان|مذاہب|مکالمہ|یہودیت|عیسائیت|الحاد|فرق/, "globe"],
      [/اخلاق|تزکیہ|احسان|دعوت|اصلاح|آداب/, "leaf"],
      [/عربی|نحو|صرف|بلاغت|لغت|معاجم|ترجمہ|ادب/, "arabic"],
      [/معاصر|ٹیکنالوجی|مصنوعی|AI|ڈیجیٹل|میڈیا|سائنس/, "network"],
      [/خاندان|معاشرت|حقوق|خواتین|بچے|بزرگ/, "family"],
      [/تہذیب|تمدن|معیشت|تجارت|زکوٰۃ|وقف|مالیات/, "city"],
      [/تحقیق|مصادر|مراجع|حوالہ|مخطوطات|فہارس|امتحان/, "clipboard"],
      [/استشراق|مغرب|جامعات|اسلاموفوبیا|استعمار/, "library"],
      [/تعلیم|تربیت|استاد|نصاب|تدریس|تشخیص/, "graduation"],
      [/تحریک|اصلاحی|تجدید|احیا|مدارس/, "route"],
      [/شخصیات|اعلام|تراجم|انبیاء|فقہاء|مفسرین|نساء/, "users"],
      [/اصطلاح|لغت|مفاہیم|فہرست/, "tags"],
      [/عبادات|نماز|روزہ|حج|عمرہ|طہارت|قربانی/, "hands"]
    ];
    const match = rules.find(([pattern]) => pattern.test(title));
    return match ? match[1] : fallback;
  }

  function subjectIndex(subject) {
    return data.subjects.findIndex((item) => item.id === subject.id);
  }

  function pageNav(items) {
    const visible = items.filter(Boolean);
    if (!visible.length) return "";
    return `
      <nav class="page-nav container" aria-label="صفحہ نیویگیشن">
        ${visible.map((item) => `
          <a class="${item.kind || ""}" href="${item.href}">
            <span>${item.label}</span>
            <strong>${item.title}</strong>
          </a>
        `).join("")}
      </nav>
    `;
  }

  function renderShell(content) {
    app.innerHTML = `
      <header class="site-header">
        <div class="top-strip">
          <div class="container strip-inner">
            <span>اردو</span>
            <span>ذخیرہ محفوظ کریں</span>
            <span>رابطہ</span>
          </div>
        </div>
        <nav class="container nav-bar" aria-label="مرکزی نیویگیشن">
          <a class="brand" href="${root}">
            <span class="brand-mark" aria-hidden="true"><img src="${root}assets/brand/alhayat-mark.svg" alt=""></span>
            <span><strong>${data.site.nameUr}</strong><small>${data.site.nameEn}</small></span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navLinks">فہرست</button>
          <div class="nav-links" id="navLinks">
            ${[
              ["ہوم", ""],
              ["مضامین", "subjects/"],
              ["مطالعہ کا راستہ", "pathways/"],
              ["سوالات و مشقیں", "questions/"],
              ["مصادر و مراجع", "sources/"],
              ["اصطلاحات", "glossary/"],
              ["تلاش", "search/"]
            ].map(([label, href]) => `<a href="${root}${href}">${label}</a>`).join("")}
          </div>
        </nav>
      </header>
      <main id="main">${content}</main>
      ${footer()}
    `;
    const toggle = document.querySelector(".menu-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
    bindSearch();
    bindLessonDrawer();
  }

  function hero(kind = "home", title = data.site.nameUr, text = data.site.tagline) {
    const image = kind === "home" ? "alhayat-hero-custom.png" : "section-reference.png";
    return `
      <section class="hero" style="--hero-image:url('${root}assets/images/${image}')">
        <div class="hero-side hero-side-right" aria-hidden="true">${icon("kaaba")}</div>
        <div class="hero-side hero-side-left" aria-hidden="true">${icon("minaret")}</div>
        <div class="container hero-inner">
          <div class="hero-title-lockup">
            <span class="hero-ornament" aria-hidden="true"></span>
            <p class="eyebrow">${data.site.nameEn}</p>
            <h1>${title}</h1>
            <p class="hero-tagline">${text}</p>
            <p class="hero-description">${data.site.description}</p>
          </div>
          <form class="hero-search" role="search" action="${root}search/">
            <input name="q" type="search" placeholder="کسی موضوع، عنوان یا اصطلاح کو تلاش کریں..." aria-label="تلاش">
            <button type="submit" aria-label="تلاش کریں">${icon("search")}<span>تلاش</span></button>
          </form>
          <div class="quick-tags" aria-label="مشہور موضوعات">
            ${["تفسیر", "حدیث", "فقہ", "سیرت", "عقائد", "تجوید"].map((tag) => `<a href="${root}search/?q=${encodeURIComponent(tag)}">${tag}</a>`).join("")}
          </div>
          <div class="hero-badges" aria-label="ویب سائٹ خصوصیات">
            <span>${icon("shield")} مستند و محتاط</span>
            <span>${icon("layers")} منظم علمی نقشہ</span>
            <span>${icon("database")} قابلِ توسیع data</span>
          </div>
        </div>
      </section>
    `;
  }

  function home() {
    renderShell(`
      ${hero()}
      <section class="container section-block">
        <div class="section-title">
          <span></span><h2>اہم مضامین</h2><span></span>
        </div>
        <div class="subject-grid">
          ${data.subjects.slice(0, 10).map(subjectCard).join("")}
        </div>
      </section>
      <section class="container feature-row">
        <a class="feature-panel sources-panel" href="${root}sources/">
          <img src="${root}assets/images/section-reference.png" alt="">
          <span><strong>مصادر و مراجع</strong><small>معتبر کتب، تحقیقی مقالات، مخطوطات اور علمی رہنمائی</small></span>
        </a>
        <a class="feature-panel path-panel" href="${root}pathways/">
          <span class="panel-art">${icon("route")}</span>
          <span><strong>مطالعہ کا راستہ</strong><small>ابتدائی، متوسط اور اعلیٰ سطح کے لیے منظم تدریسی سفر</small></span>
        </a>
        <a class="feature-panel practice-panel" href="${root}questions/">
          <span class="panel-art">${icon("clipboard")}</span>
          <span><strong>سوالات و مشقیں</strong><small>موضوعاتی MCQs، وضاحتی سوالات اور flashcards</small></span>
        </a>
      </section>
      ${premiumHomeSections()}
      ${stats()}
      ${newsletter()}
      ${pageNav([
        { kind: "next", label: "اگلا قدم", title: "تمام مضامین دیکھیں", href: `${root}subjects/` }
      ])}
    `);
  }

  function subjectCard(subject) {
    return `
      <a class="subject-card" href="${subjectUrl(subject)}" style="--accent:${subject.accent}">
        <span class="number">${toUrduNumber(subject.order)}</span>
        <span class="card-icon">${icon(subject.icon)}</span>
        <strong>${subject.title}</strong>
        <small>${subject.subtitle}</small>
        <em>مطالعہ شروع کریں</em>
      </a>
    `;
  }

  function premiumHomeSections() {
    const lesson = data.featuredLessons[0];
    const lessonSubject = subjectById(lesson.subjectId);
    const newChapters = data.subjects.slice(0, 6).map((subject) => ({ subject, section: subject.sections[0] }));
    return `
      <section class="container premium-home">
        <article class="selected-lesson" style="--accent:${lessonSubject.accent}">
          <div>
            <p class="eyebrow">آج کا منتخب سبق</p>
            <h2>${lesson.title}</h2>
            <p>${lesson.summary}</p>
            <div class="term-cloud">${lesson.terms.slice(0, 4).map((term) => `<a href="${root}glossary/?q=${encodeURIComponent(term)}">${term}</a>`).join("")}</div>
            <a class="primary-button" href="${lessonUrl(lesson)}">${icon("book-open")} سبق پڑھیں</a>
          </div>
          <div class="selected-lesson-art" aria-hidden="true">${icon("book-open")}</div>
        </article>
        <article class="start-guide">
          <p class="eyebrow">کہاں سے شروع کریں؟</p>
          <h2>طالب علم کے لیے واضح راستہ</h2>
          <div class="guide-steps">
            ${data.pathways.map((path, i) => `
              <a href="${root}pathways/">
                <span>${toUrduNumber(i + 1)}</span>
                <strong>${path.title}</strong>
                <small>${path.description}</small>
              </a>
            `).join("")}
          </div>
        </article>
      </section>
      <section class="container knowledge-strip">
        <div class="strip-title">
          <h2>مشہور اصطلاحات</h2>
          <a href="${root}glossary/">سب دیکھیں</a>
        </div>
        <div class="term-showcase">
          ${data.glossary.map((term) => `<a href="${root}glossary/?q=${encodeURIComponent(term.term)}"><span>${term.level}</span><strong>${term.term}</strong><small>${term.definition}</small></a>`).join("")}
        </div>
      </section>
      <section class="container knowledge-strip">
        <div class="strip-title">
          <h2>نئے شامل کردہ ابواب</h2>
          <a href="${root}subjects/">مضامین دیکھیں</a>
        </div>
        <div class="chapter-showcase">
          ${newChapters.map(({ subject, section }, i) => `
            <a href="${sectionUrl(subject, 0)}" style="--accent:${subject.accent}">
              <span class="button-icon">${icon(sectionIcon(section, subject.icon))}</span>
              <strong>${section}</strong>
              <small>${subject.title}</small>
            </a>
          `).join("")}
        </div>
      </section>
    `;
  }

  function subjectsPage() {
    const lessonId = params.get("lesson");
    const subjectId = params.get("subject");
    const sectionIndex = params.get("section");
    if (lessonId) return renderLesson(lessonId);
    if (subjectId && sectionIndex !== null) return renderSection(subjectId, Number(sectionIndex));
    if (subjectId) return renderSubject(subjectId);
    renderShell(`
      ${hero("inner", "مضامین کا جامع نقشہ", "ہر مضمون ایک علمی دروازہ ہے؛ ہر دروازے کے اندر ۱۲ بڑے عنوانات اور بعد میں ہزاروں مربوط اسباق شامل کیے جا سکتے ہیں۔")}
      <section class="container section-block">
        <div class="toolbar">
          <h2>تمام مضامین</h2>
          <a class="ghost-button" href="${root}glossary/">اصطلاحات دیکھیں</a>
        </div>
        <div class="subject-grid all-subjects">${data.subjects.map(subjectCard).join("")}</div>
      </section>
      ${pageNav([
        { kind: "prev", label: "واپس", title: "ہوم", href: `${root}` },
        { kind: "next", label: "اگلا", title: data.subjects[0].title, href: subjectUrl(data.subjects[0]) }
      ])}
    `);
  }

  function renderSubject(id) {
    const subject = subjectById(id);
    const current = subjectIndex(subject);
    const prev = data.subjects[current - 1];
    const next = data.subjects[current + 1];
    renderShell(`
      <section class="subject-hero" style="--accent:${subject.accent}">
        <div class="container subject-hero-grid">
          <div>
            ${breadcrumbs([{ label: "مضامین", href: `${root}subjects/` }, { label: subject.title }])}
            <p class="eyebrow">${subject.level}</p>
            <h1>${subject.title}</h1>
            <p>${subject.subtitle}</p>
            <div class="subject-chip-row">
              <span>${icon(subject.icon)} ${toUrduNumber(subject.sections.length)} بڑے ابواب</span>
              <span>${icon("clipboard")} سوالات و مشقیں</span>
              <span>${icon("tags")} اصطلاحات سے مربوط</span>
            </div>
            <div class="hero-actions">
              <a class="primary-button" href="${sectionUrl(subject, 0)}">${icon("book-open")} پہلا باب شروع کریں</a>
              <a class="secondary-button" href="${root}search/?q=${encodeURIComponent(subject.title)}">اس مضمون میں تلاش</a>
            </div>
          </div>
          <div class="subject-visual">
            <div class="subject-visual-top">
              <span>${icon(sectionIcon(subject.title, subject.icon))}</span>
              <strong>${subject.title}</strong>
            </div>
            ${subject.visual ? `<img src="${root}assets/images/${subject.visual}" alt="">` : `<div class="subject-icon-stage">${icon(subject.icon)}</div>`}
          </div>
        </div>
      </section>
      <section class="container layout-with-map">
        <aside class="lesson-map desktop-map">
          <h2>اس مضمون کا نقشہ</h2>
          ${subject.sections.map((section, i) => `<a href="${sectionUrl(subject, i)}"><span>${toUrduNumber(i + 1)}</span>${section}</a>`).join("")}
        </aside>
        <div class="content-flow">
          <div class="section-title compact"><span></span><h2>۱۲ بڑے عناوین</h2><span></span></div>
          <div class="section-grid">
            ${subject.sections.map((section, i) => sectionCard(subject, section, i)).join("")}
          </div>
        </div>
      </section>
      ${pageNav([
        prev && { kind: "prev", label: "پچھلا مضمون", title: prev.title, href: subjectUrl(prev) },
        { kind: "up", label: "تمام مضامین", title: "مضامین کا جامع نقشہ", href: `${root}subjects/` },
        next && { kind: "next", label: "اگلا مضمون", title: next.title, href: subjectUrl(next) }
      ])}
    `);
  }

  function sectionCard(subject, section, i) {
    return `
      <a class="section-card" href="${sectionUrl(subject, i)}" style="--accent:${subject.accent}">
        <span>${toUrduNumber(i + 1)}</span>
        <em class="button-icon">${icon(sectionIcon(section, subject.icon))}</em>
        <strong>${section}</strong>
        <small>۱۲ ذیلی اسباق، اصطلاحات، سوالات اور مشقیں</small>
      </a>
    `;
  }

  function renderSection(id, index) {
    const subject = subjectById(id);
    const sectionTitle = subject.sections[index] || subject.sections[0];
    const topics = makeTopics(subject, sectionTitle, index);
    const prevSection = index > 0 ? { title: subject.sections[index - 1], href: sectionUrl(subject, index - 1) } : null;
    const nextSection = index < subject.sections.length - 1 ? { title: subject.sections[index + 1], href: sectionUrl(subject, index + 1) } : null;
    renderShell(`
      <section class="section-masthead" style="--accent:${subject.accent}">
        <div class="container section-masthead-grid">
          <div>
            ${breadcrumbs([{ label: "مضامین", href: `${root}subjects/` }, { label: subject.title, href: subjectUrl(subject) }, { label: sectionTitle }])}
            <p class="eyebrow">${subject.title}</p>
            <h1>${sectionTitle}</h1>
            <p>${subject.title} کے اس باب میں بنیادی تصور، علمی پس منظر، اصطلاحات، سوالات اور مشقوں کے ساتھ مربوط اسباق شامل کیے جائیں گے۔</p>
            <button class="drawer-button" type="button" data-open-map>سبق کا نقشہ</button>
          </div>
          <div class="masthead-emblem" aria-hidden="true">${icon(sectionIcon(sectionTitle, subject.icon))}</div>
        </div>
      </section>
      <section class="container layout-with-map">
        <aside class="lesson-map desktop-map">
          <h2>اس باب کے اسباق</h2>
          ${topics.map((topic, i) => `<a class="has-icon" href="${i === 4 && subject.id === "quran-tafsir" ? lessonUrl(data.featuredLessons[0]) : "#"}"><span>${toUrduNumber(i + 1)}</span>${icon(sectionIcon(topic, subject.icon), "mini-icon")}${topic}</a>`).join("")}
        </aside>
        <div class="content-flow">
          <div class="topic-grid">
            ${topics.map((topic, i) => `
              <a class="topic-card" href="${i === 4 && subject.id === "quran-tafsir" ? lessonUrl(data.featuredLessons[0]) : "#"}">
                <span>${toUrduNumber(i + 1)}</span>
                <em class="button-icon">${icon(sectionIcon(topic, subject.icon))}</em>
                <strong>${topic}</strong>
                <small>تعارف، جامع مضمون، ۱۰ نکات، سوالات، اصطلاحات، مصادر</small>
              </a>
            `).join("")}
          </div>
          <div class="callout">
            <strong>بعد کی data entry کے لیے تیار</strong>
            <p>یہ باب structured records سے render ہوتا ہے۔ ہر ذیلی عنوان کو بعد میں مکمل lesson object، MCQs، references اور glossary links کے ساتھ جوڑا جا سکتا ہے۔</p>
          </div>
        </div>
      </section>
      ${mobileMap(topics)}
      ${pageNav([
        prevSection && { kind: "prev", label: "پچھلا باب", title: prevSection.title, href: prevSection.href },
        { kind: "up", label: "واپس مضمون پر", title: subject.title, href: subjectUrl(subject) },
        nextSection && { kind: "next", label: "اگلا باب", title: nextSection.title, href: nextSection.href }
      ])}
    `);
  }

  function renderLesson(lessonId) {
    const lesson = data.featuredLessons.find((item) => item.id === lessonId) || data.featuredLessons[0];
    const subject = subjectById(lesson.subjectId);
    renderShell(`
      <section class="lesson-hero" style="--accent:${subject.accent}">
        <div class="container lesson-hero-grid">
          <div>
            ${breadcrumbs([{ label: "مضامین", href: `${root}subjects/` }, { label: subject.title, href: subjectUrl(subject) }, { label: lesson.title }])}
            <p class="eyebrow">${subject.title} / ${lesson.level}</p>
            <h1>${lesson.title}</h1>
            <p>${lesson.summary}</p>
            <button class="drawer-button" type="button" data-open-map>سبق کا نقشہ</button>
          </div>
          <div class="masthead-emblem lesson-emblem" aria-hidden="true">${icon(sectionIcon(lesson.title, subject.icon))}</div>
        </div>
      </section>
      <section class="container layout-with-map lesson-layout">
        <aside class="lesson-map desktop-map">
          <h2>اس سبق کا نقشہ</h2>
          ${["تعارف", "جامع علمی مضمون", "۱۰ اہم نکات", "وضاحتی سوالات", "اصطلاحات", "مصادر", "مشق", "اگلا عنوان"].map((item, i) => `<a href="#part-${i + 1}"><span>${toUrduNumber(i + 1)}</span>${item}</a>`).join("")}
        </aside>
        <article class="lesson-article">
          <section id="part-1" class="qa-card">
            <h2>تعارف</h2>
            <p>${lesson.summary}</p>
          </section>
          <section id="part-2" class="qa-card">
            <h2>جامع علمی مضمون</h2>
            <p>اسبابِ نزول قرآن فہمی کے ان اہم مباحث میں سے ہے جو آیت کے پس منظر، مخاطب، سوال یا واقعے کو سمجھنے میں مدد دیتے ہیں۔ اس علم کا مقصد قرآن کے معنی کو کسی غیر ثابت روایت تک محدود کرنا نہیں، بلکہ معتبر روایت، سیاق، لغت اور اصول تفسیر کے ساتھ آیت کے فہم کو منظم بنانا ہے۔</p>
            <p>علمی احتیاط کا تقاضا ہے کہ سببِ نزول کی ہر روایت کو یکساں درجے پر نہ رکھا جائے۔ مفسرین نے روایت کی صحت، الفاظ، راوی، سیاق اور آیت کے عموم کو سامنے رکھ کر معنی متعین کیے ہیں۔ اسی لیے ایک سنجیدہ طالب علم سببِ نزول کو تفسیر کا معاون ذریعہ سمجھتا ہے، قرآن کے عمومی پیغام کا بدل نہیں۔</p>
          </section>
          <section id="part-3" class="qa-card">
            <h2>۱۰ اہم نکات</h2>
            <ol class="key-list">${lesson.points.map((point) => `<li>${point}</li>`).join("")}</ol>
          </section>
          <section id="part-4" class="qa-card">
            <h2>وضاحتی سوالات و جوابات</h2>
            ${lesson.qa.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
          </section>
          <section id="part-5" class="qa-card">
            <h2>اصطلاحات</h2>
            <div class="term-cloud">${lesson.terms.map((term) => `<a href="${root}glossary/?q=${encodeURIComponent(term)}">${term}</a>`).join("")}</div>
          </section>
          <section id="part-6" class="qa-card">
            <h2>مصادر و مراجع</h2>
            <ul class="source-list">${lesson.references.map((ref) => `<li>${ref}</li>`).join("")}</ul>
          </section>
          <section id="part-7" class="practice-panel-large">
            <h2>اس عنوان پر مشق کریں</h2>
            <p>MCQs اور flashcards کے لیے یہ سبق data model میں تیار ہے؛ سوالات بعد میں اسی lesson ID سے منسلک ہوں گے۔</p>
            <a class="primary-button" href="${root}questions/?lesson=${lesson.id}">${icon("clipboard")} مشق شروع کریں</a>
          </section>
          <nav class="prev-next" aria-label="سبق نیویگیشن">
            <a href="${subjectUrl(subject)}">پچھلا: ${subject.title}</a>
            <a href="${sectionUrl(subject, 2)}">اگلا: علوم القرآن</a>
          </nav>
        </article>
      </section>
      ${mobileMap(["تعارف", "جامع علمی مضمون", "۱۰ اہم نکات", "وضاحتی سوالات", "اصطلاحات", "مصادر", "مشق", "اگلا عنوان"])}
      ${pageNav([
        { kind: "prev", label: "واپس مضمون پر", title: subject.title, href: subjectUrl(subject) },
        { kind: "up", label: "باب کا نقشہ", title: subject.sections[lesson.sectionIndex] || "علوم القرآن", href: sectionUrl(subject, lesson.sectionIndex || 1) },
        { kind: "next", label: "اگلا مطالعہ", title: "مشق اور سوالات", href: `${root}questions/?lesson=${lesson.id}` }
      ])}
    `);
  }

  function makeTopics(subject, sectionTitle, index) {
    if (subject.id === "quran-tafsir" && sectionTitle === "علوم القرآن") {
      return ["علوم القرآن کا تعارف", "وحی کی حقیقت", "نزولِ قرآن", "مکی و مدنی قرآن", "اسبابِ نزول", "جمع و تدوینِ قرآن", "ترتیبِ آیات و سور", "ناسخ و منسوخ", "محکم و متشابہ", "عام و خاص، مطلق و مقید", "اعجاز القرآن", "فضائلِ قرآن اور آدابِ تلاوت"];
    }
    const stems = ["تعارف", "لغوی و اصطلاحی مفہوم", "علمی اہمیت", "تاریخی پس منظر", "مصادر و دلائل", "اصولی مباحث", "نمایاں مثالیں", "عملی اطلاق", "عام غلط فہمیاں", "معاصر تناظر", "اہم اصطلاحات", "خلاصہ و مشق"];
    return stems.map((stem) => `${sectionTitle}: ${stem}`);
  }

  function searchPage() {
    const q = params.get("q") || "";
    const records = [
      ...data.subjects.map((subject) => ({ title: subject.title, text: subject.subtitle, href: `${root}subjects/?subject=${subject.id}`, type: "مضمون" })),
      ...data.subjects.flatMap((subject) => subject.sections.map((section, i) => ({ title: section, text: subject.title, href: sectionUrl(subject, i), type: "باب" }))),
      ...data.glossary.map((term) => ({ title: term.term, text: term.definition, href: `${root}glossary/?q=${encodeURIComponent(term.term)}`, type: "اصطلاح" })),
      ...data.featuredLessons.map((lesson) => ({ title: lesson.title, text: lesson.summary, href: lessonUrl(lesson), type: "سبق" }))
    ];
    const filtered = q ? records.filter((item) => `${item.title} ${item.text}`.includes(q)) : records.slice(0, 24);
    renderShell(`
      <section class="container page-head">
        <h1>تلاش</h1>
        <p>مضامین، ابواب، اسباق اور اصطلاحات میں مربوط اردو تلاش۔</p>
        <form class="inline-search" action="${root}search/"><input name="q" value="${escapeHtml(q)}" placeholder="مثلاً: وحی، سند، فقہ، استشراق"><button>تلاش</button></form>
      </section>
      <section class="container result-list">
        ${filtered.map((item) => `<a class="result-card" href="${item.href}"><span>${item.type}</span><strong>${item.title}</strong><small>${item.text}</small></a>`).join("")}
      </section>
      ${pageNav([
        { kind: "prev", label: "واپس", title: "ہوم", href: `${root}` },
        { kind: "next", label: "اگلا", title: "اسلامی اصطلاحات", href: `${root}glossary/` }
      ])}
    `);
  }

  function glossaryPage() {
    const q = params.get("q") || "";
    const terms = q ? data.glossary.filter((item) => item.term.includes(q) || item.definition.includes(q)) : data.glossary;
    renderShell(`
      <section class="container page-head">
        <h1>اسلامی اصطلاحات، مفاہیم و علمی لغت</h1>
        <p>یہ glossary پوری ویب سائٹ کے اسباق، مشقوں، مصادر اور related topics سے cross-link ہونے کے لیے بنائی گئی ہے۔</p>
        <form class="inline-search" action="${root}glossary/"><input name="q" value="${escapeHtml(q)}" placeholder="اصطلاح تلاش کریں"><button>تلاش</button></form>
      </section>
      <section class="container glossary-grid">
        ${terms.map((term) => {
          const subject = subjectById(term.subjectId);
          return `<article class="gloss-card"><span>${term.level}</span><h2>${term.term}</h2><p>${term.definition}</p><a href="${subjectUrl(subject)}">${subject.title}</a></article>`;
        }).join("")}
      </section>
      ${pageNav([
        { kind: "prev", label: "پچھلا", title: "تلاش", href: `${root}search/` },
        { kind: "next", label: "اگلا", title: "مطالعہ کا راستہ", href: `${root}pathways/` }
      ])}
    `);
  }

  function pathwaysPage() {
    renderShell(`
      <section class="container page-head"><h1>مطالعہ کا راستہ</h1><p>طالب علم اپنی سطح کے مطابق بنیادی فہم سے تخصص تک منظم سفر اختیار کر سکتا ہے۔</p></section>
      <section class="container pathway-grid">
        ${data.pathways.map((path) => `<article class="path-card"><h2>${path.title}</h2><p>${path.description}</p><div>${path.subjects.map((id) => `<a href="${subjectUrl(subjectById(id))}">${subjectById(id).title}</a>`).join("")}</div></article>`).join("")}
      </section>
      ${pageNav([
        { kind: "prev", label: "پچھلا", title: "اصطلاحات", href: `${root}glossary/` },
        { kind: "next", label: "اگلا", title: "سوالات و مشقیں", href: `${root}questions/` }
      ])}
    `);
  }

  function simplePage(title, text, cards) {
    const navMap = {
      questions: [
        { kind: "prev", label: "پچھلا", title: "مطالعہ کا راستہ", href: `${root}pathways/` },
        { kind: "next", label: "اگلا", title: "مصادر و مراجع", href: `${root}sources/` }
      ],
      sources: [
        { kind: "prev", label: "پچھلا", title: "سوالات و مشقیں", href: `${root}questions/` },
        { kind: "next", label: "اگلا", title: "تمام مضامین", href: `${root}subjects/` }
      ]
    };
    renderShell(`
      <section class="container page-head"><h1>${title}</h1><p>${text}</p></section>
      <section class="container feature-list">${cards.map((card) => `<article class="qa-card"><h2>${card[0]}</h2><p>${card[1]}</p></article>`).join("")}</section>
      ${pageNav(navMap[page] || [])}
    `);
  }

  function breadcrumbs(items) {
    return `<nav class="breadcrumbs" aria-label="breadcrumb"><a href="${root}">ہوم</a>${items.map((item) => item.href ? `<a href="${item.href}">${item.label}</a>` : `<span>${item.label}</span>`).join("")}</nav>`;
  }

  function stats() {
    return `<section class="container stats"><div><strong>20</strong><span>بڑے مضامین</span></div><div><strong>240</strong><span>بڑے ابواب</span></div><div><strong>2,880+</strong><span>ممکنہ اسباق</span></div><div><strong>100%</strong><span>RTL اور static</span></div></section>`;
  }

  function newsletter() {
    return `<section class="container newsletter"><div><h2>علم کی روشنی حاصل کرتے رہیں</h2><p>نئے مضامین، مصادر اور مشقوں کے لیے مستقبل میں subscription module شامل کیا جا سکتا ہے۔</p></div><form><input type="email" placeholder="ای میل درج کریں"><button type="button">سبسکرائب کریں</button></form></section>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><img src="${root}assets/brand/alhayat-mark.svg" alt=""><div><h2>${data.site.nameUr}</h2><p>${data.site.description}</p></div></div><div><h3>فوری لنکس</h3><a href="${root}subjects/">مضامین</a><a href="${root}pathways/">مطالعہ کا راستہ</a><a href="${root}glossary/">اصطلاحات</a></div><div><h3>علمی اصول</h3><p>مستند حوالہ، غیر جانب دار اسلوب، واضح ترتیب، اور علمی احتیاط۔</p></div></div><p class="copyright">© 2026 الحیات مرکزِ علومِ اسلامیہ</p></footer>`;
  }

  function mobileMap(items) {
    return `<div class="mobile-map" hidden><div class="mobile-map-panel"><button type="button" data-close-map>بند کریں</button><h2>سبق کا نقشہ</h2>${items.map((item, i) => `<a href="#part-${i + 1}"><span>${toUrduNumber(i + 1)}</span>${item}</a>`).join("")}</div></div>`;
  }

  function bindLessonDrawer() {
    const map = document.querySelector(".mobile-map");
    const open = document.querySelector("[data-open-map]");
    if (!map || !open) return;
    open.addEventListener("click", () => { map.hidden = false; });
    map.addEventListener("click", (event) => {
      if (event.target === map || event.target.matches("[data-close-map]") || event.target.matches("a")) map.hidden = true;
    });
  }

  function bindSearch() {
    document.querySelectorAll(".hero-search").forEach((form) => {
      form.addEventListener("submit", () => {});
    });
  }

  function toUrduNumber(num) {
    return String(num).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[ch]));
  }

  if (page === "home") home();
  if (page === "subjects") subjectsPage();
  if (page === "search") searchPage();
  if (page === "glossary") glossaryPage();
  if (page === "pathways") pathwaysPage();
  if (page === "questions") simplePage("سوالات و مشقیں", "ہر سبق سے وابستہ MCQs، وضاحتی سوالات، flashcards اور عملی مشقوں کا scalable مرکز۔", [["MCQs", "ہر سوال lesson ID سے منسلک ہوگا اور مختصر explanation کے ساتھ دکھایا جائے گا۔"], ["Flashcards", "اصطلاحات اور بنیادی مفاہیم کو یاد کرنے کے لیے glossary-linked cards۔"], ["Assessment Tasks", "تحقیق، حوالہ نویسی اور source evaluation جیسے عملی tasks بھی شامل کیے جا سکیں گے۔"]]);
  if (page === "sources") simplePage("مصادر و مراجع", "ہر دعوے کو معتبر مصادر، علمی احتیاط اور subject-specific source guidance کے ساتھ مربوط رکھنے کا مرکز۔", [["قرآن و حدیث", "نصوص، تراجم، شروح اور تخریج کو الگ metadata کے ساتھ محفوظ کیا جائے گا۔"], ["کلاسیکی کتب", "تفاسیر، شروح، اصولی کتب، فقہی ذخیرہ، تاریخ، تراجم اور معاجم۔"], ["معاصر تحقیق", "peer-reviewed مقالات، ادارہ جاتی رپورٹس، ڈیجیٹل repositories اور citation tools۔"]]);
})();
