(function () {
  const data = window.ALHAYAT_DATA;
  const app = document.getElementById("app");
  const page = document.body.dataset.page || "home";
  const params = new URLSearchParams(location.search);
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
    layers: "m12 3 9 5-9 5-9-5 9-5Zm-7 9 7 4 7-4M5 16l7 4 7-4",
    compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3-12-2 6-6 2 2-6 6-2Z",
    minaret: "M10 21V8l2-4 2 4v13M8 21h8M9 8h6M11 12h2M11 16h2",
    link: "M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1",
    heart: "M20 8c0 6-8 11-8 11S4 14 4 8a4 4 0 0 1 7-2.6A4 4 0 0 1 20 8Z",
    search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm6-2 4 4",
    clipboard: "M9 4h6l1 2h3v15H5V6h3l1-2Zm0 7h6M9 15h6",
    tags: "M4 4h7l9 9-7 7-9-9V4Zm4 4h.1",
    library: "M4 19h16M6 17V5h3v12M11 17V5h3v12M16 17V5h3v12",
    route: "M5 5h5a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h10M5 5l2-2M5 5l2 2M19 17l-2-2M19 17l-2 2",
    question: "M9.1 9a3 3 0 1 1 5.8 1c-.6 1.3-2.1 1.7-2.6 2.8M12 17h.1",
    check: "M20 6 9 17l-5-5"
  };

  const byId = (list, id) => list.find((item) => item.id === id);
  const subject = (id) => byId(data.subjects, id) || data.subjects[0];
  const section = (id) => byId(data.sections, id);
  const topic = (id) => byId(data.topics, id) || data.topics[0];
  const topicsForSection = (id) => data.topics.filter((item) => item.sectionId === id);
  const topicsForSubject = (id) => data.topics.filter((item) => item.subjectId === id);
  const mcqsFor = (key, val) => data.mcqs.filter((item) => item[key] === val);
  const qaFor = (key, val) => data.shortQA.filter((item) => item[key] === val);
  const termsForTopic = (topicId) => data.glossary.filter((term) => term.topicIds.includes(topicId));
  const sourcesForIds = (ids = []) => ids.map((id) => byId(data.sources, id)).filter(Boolean);

  function icon(name, cls = "") {
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name] || icons["book-open"]}"/></svg>`;
  }
  function u(num) { return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]); }
  function h(value = "") { return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[ch])); }
  function topicUrl(id) { return `${root}subjects/?topic=${id}`; }
  function subjectUrl(id) { return `${root}subjects/?subject=${id}`; }
  function sectionUrl(id) { const s = section(id); const sub = subject(s.subjectId); return `${root}subjects/?subject=${sub.id}&section=${sub.sectionIds.indexOf(id)}`; }

  function shell(content) {
    app.innerHTML = `
      <header class="site-header">
        <div class="top-strip"><div class="container strip-inner"><span>اردو</span><span>مربوط علمی نقشہ</span><span>موبائل فرینڈلی</span></div></div>
        <nav class="container nav-bar" aria-label="مرکزی نیویگیشن">
          <a class="brand" href="${root}"><span class="brand-mark"><img src="${root}assets/brand/alhayat-mark.svg" alt=""></span><span><strong>${data.site.nameUr}</strong><small>${data.site.nameEn}</small></span></a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navLinks">فہرست</button>
          <div class="nav-links" id="navLinks">${data.nav.map((item) => `<a href="${root}${item.href}">${item.label}</a>`).join("")}</div>
        </nav>
      </header>
      <main id="main">${content}</main>${footer()}`;
    const toggle = document.querySelector(".menu-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle) toggle.addEventListener("click", () => { const open = links.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", String(open)); });
    document.querySelectorAll("[data-reveal]").forEach((button) => button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.reveal);
      if (panel) { panel.hidden = !panel.hidden; button.setAttribute("aria-expanded", String(!panel.hidden)); }
    }));
  }

  function hero() {
    return `<section class="hero" style="--hero-image:url('${root}assets/images/alhayat-hero-custom.png')"><div class="hero-side hero-side-right">${icon("book-open")}</div><div class="hero-side hero-side-left">${icon("mosque")}</div><div class="container hero-inner"><div class="hero-title-lockup"><span class="hero-ornament"></span><p class="eyebrow">${data.site.nameEn}</p><h1>${data.site.tagline}</h1><p class="hero-tagline">${data.site.nameUr}</p><p class="hero-description">${data.site.description}</p></div><form class="hero-search" action="${root}search/"><input name="q" type="search" placeholder="کسی موضوع، عنوان یا اصطلاح کو تلاش کریں..."><button>${icon("search")}<span>تلاش</span></button></form><div class="hero-actions centered"><a class="primary-button" href="${root}subjects/">${icon("book-open")} مطالعہ شروع کریں</a><a class="secondary-button" href="${root}questions/">${icon("clipboard")} MCQs مشق</a></div></div></section>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><img src="${root}assets/brand/alhayat-mark.svg" alt=""><div><h2>${data.site.nameUr}</h2><p>${data.site.description}</p></div></div><div><h3>فوری لنکس</h3>${data.nav.slice(1, 7).map((item) => `<a href="${root}${item.href}">${item.label}</a>`).join("")}</div><div><h3>علمی اصول</h3><p>ایک تصور، ایک اصل مقام۔ باقی صفحات اسی مقام سے مربوط رہیں گے۔</p></div></div><p class="copyright">© 2026 ${data.site.nameUr}</p></footer>`;
  }
  function breadcrumbs(items) {
    return `<nav class="breadcrumbs"><a href="${root}">ہوم</a>${items.map((item) => item.href ? `<a href="${item.href}">${item.label}</a>` : `<span>${item.label}</span>`).join("")}</nav>`;
  }
  function pageNav(items) {
    return `<nav class="page-nav container">${items.filter(Boolean).map((item) => `<a class="${item.kind}" href="${item.href}"><span>${item.label}</span><strong>${item.title}</strong></a>`).join("")}</nav>`;
  }
  function subjectCard(sub) {
    return `<a class="subject-card" href="${subjectUrl(sub.id)}" style="--accent:${sub.accent}"><span class="number">${u(sub.order)}</span><span class="card-icon">${icon(sub.icon)}</span><strong>${sub.title}</strong><small>${sub.subtitle}</small><em>مطالعہ شروع کریں</em></a>`;
  }
  function topicCard(t) {
    return `<a class="topic-card" href="${topicUrl(t.id)}"><span>${u(t.order || 1)}</span><i class="button-icon">${icon(t.icon)}</i><strong>${t.title}</strong><small>${t.level} · ${t.time}</small></a>`;
  }
  function pathwayCard(path) {
    return `<article class="path-card"><h2>${path.title}</h2><p>${path.description}</p><div>${path.topicIds.map((id) => `<a href="${topicUrl(id)}">${topic(id).title}</a>`).join("")}</div></article>`;
  }

  function home() {
    shell(`${hero()}<section class="container section-block"><div class="section-title"><span></span><h2>اہم مضامین</h2><span></span></div><div class="subject-grid">${data.subjects.map(subjectCard).join("")}</div></section><section class="container support-grid"><a class="feature-panel" href="${root}questions/">${icon("clipboard")}<span><strong>MCQs Practice Center</strong><small>جواب، وضاحت اور متعلقہ حوالہ reveal پر کھلتے ہیں۔</small></span></a><a class="feature-panel" href="${root}short-qa/">${icon("question")}<span><strong>مختصر سوالات</strong><small>جوابات ضرورت پر کھلتے ہیں تاکہ revision آسان رہے۔</small></span></a><a class="feature-panel" href="${root}glossary/">${icon("tags")}<span><strong>اصطلاحات</strong><small>ہر اصطلاح اپنے اصل topic سے مربوط ہے۔</small></span></a></section><section class="container section-block"><div class="section-title"><span></span><h2>مطالعہ کے راستے</h2><span></span></div><div class="pathway-grid">${data.pathways.map(pathwayCard).join("")}</div></section>${stats()}${pageNav([{kind:"next", label:"اگلا قدم", title:"تمام مضامین", href:`${root}subjects/`}])}`);
  }
  function stats() {
    return `<section class="container stats"><div><strong>${data.subjects.length}</strong><span>مرکزی مضامین</span></div><div><strong>${data.topics.length}</strong><span>نمونہ اسباق</span></div><div><strong>${data.mcqs.length}</strong><span>مربوط MCQs</span></div><div><strong>${data.glossary.length}</strong><span>اصطلاحات</span></div></section>`;
  }

  function subjectsPage() {
    const topicId = params.get("topic") || params.get("lesson");
    const subjectId = params.get("subject");
    const secIndex = params.get("section");
    if (topicId) return renderTopic(topicId);
    if (subjectId && secIndex !== null) return renderSection(subjectId, Number(secIndex));
    if (subjectId) return renderSubject(subjectId);
    shell(`${hero()}<section class="container section-block"><div class="toolbar"><h2>مرکزی مضامین</h2><a class="ghost-button" href="${root}pathways/">مطالعہ کا راستہ</a></div><div class="subject-grid all-subjects">${data.subjects.map(subjectCard).join("")}</div></section>${pageNav([{kind:"prev", label:"واپس", title:"ہوم", href:`${root}`},{kind:"next", label:"آغاز", title:data.subjects[0].title, href:subjectUrl(data.subjects[0].id)}])}`);
  }
  function renderSubject(id) {
    const sub = subject(id);
    const idx = data.subjects.findIndex((item) => item.id === sub.id);
    const sections = sub.sectionIds.map(section).filter((s) => s && topicsForSection(s.id).length);
    shell(`<section class="subject-hero" style="--accent:${sub.accent}"><div class="container subject-hero-grid"><div>${breadcrumbs([{label:"مضامین", href:`${root}subjects/`},{label:sub.title}])}<p class="eyebrow">${sub.level}</p><h1>${sub.title}</h1><p>${sub.subtitle}</p><div class="subject-chip-row"><span>${icon(sub.icon)} ${u(sections.length)} فعال ابواب</span><span>${icon("clipboard")} سوالات سے مربوط</span><span>${icon("tags")} اصطلاحات سے مربوط</span></div><div class="hero-actions"><a class="primary-button" href="${sectionUrl(sections[0].id)}">${icon("book-open")} پہلا باب شروع کریں</a><a class="secondary-button" href="${root}questions/?subject=${sub.id}">${icon("clipboard")} MCQs</a></div></div><div class="masthead-emblem">${icon(sub.icon)}</div></div></section><section class="container section-block"><div class="section-title"><span></span><h2>ابواب</h2><span></span></div><div class="section-grid">${sections.map((s, i) => `<a class="section-card" href="${sectionUrl(s.id)}"><span>${u(i + 1)}</span><i class="button-icon">${icon(s.icon)}</i><strong>${s.title}</strong><small>${u(topicsForSection(s.id).length)} سبق</small></a>`).join("")}</div></section>${pageNav([{kind:"prev", label:"پچھلا", title:(data.subjects[idx-1]||{}).title || "مضامین", href:idx>0?subjectUrl(data.subjects[idx-1].id):`${root}subjects/`},{kind:"next", label:"اگلا", title:(data.subjects[idx+1]||{}).title || "مطالعہ کا راستہ", href:idx<data.subjects.length-1?subjectUrl(data.subjects[idx+1].id):`${root}pathways/`}])}`);
  }
  function renderSection(subjectId, secIndex) {
    const sub = subject(subjectId);
    const available = sub.sectionIds.map(section).filter((s) => s && topicsForSection(s.id).length);
    const sec = available[secIndex] || available[0];
    const idx = available.findIndex((s) => s.id === sec.id);
    const topics = topicsForSection(sec.id);
    shell(`<section class="section-masthead" style="--accent:${sub.accent}"><div class="container section-masthead-grid"><div>${breadcrumbs([{label:"مضامین", href:`${root}subjects/`},{label:sub.title, href:subjectUrl(sub.id)},{label:sec.title}])}<p class="eyebrow">${sub.title}</p><h1>${sec.title}</h1><p>اس باب کے اسباق ایک ہی علمی راستے میں ترتیب دیے گئے ہیں۔</p></div><div class="masthead-emblem">${icon(sec.icon)}</div></div></section><section class="container section-block"><div class="topic-grid">${topics.map(topicCard).join("")}</div></section>${pageNav([{kind:"prev", label:"پچھلا", title:(available[idx-1]||{}).title || sub.title, href:idx>0?sectionUrl(available[idx-1].id):subjectUrl(sub.id)},{kind:"next", label:"اگلا", title:(available[idx+1]||{}).title || topics[0].title, href:idx<available.length-1?sectionUrl(available[idx+1].id):topicUrl(topics[0].id)}])}`);
  }

  function renderTopic(id) {
    const t = topic(id), sub = subject(t.subjectId), sec = section(t.sectionId);
    const all = data.topics;
    const idx = all.findIndex((item) => item.id === t.id);
    const prev = all[idx - 1], next = all[idx + 1];
    const terms = termsForTopic(t.id);
    const sources = sourcesForIds(t.sourceIds);
    shell(`<section class="lesson-hero" style="--accent:${sub.accent}"><div class="container lesson-hero-grid"><div>${breadcrumbs([{label:"مضامین", href:`${root}subjects/`},{label:sub.title, href:subjectUrl(sub.id)},{label:sec.title, href:sectionUrl(sec.id)},{label:t.title}])}<p class="eyebrow">${sub.title} · ${t.level} · ${t.time}</p><h1>${t.title}</h1><p>${t.intro}</p><div class="hero-actions"><a class="primary-button" href="${root}questions/?topic=${t.id}">${icon("clipboard")} اس عنوان پر مشق</a><a class="secondary-button" href="${root}short-qa/?topic=${t.id}">${icon("question")} مختصر سوالات</a></div></div><div class="masthead-emblem lesson-emblem">${icon(t.icon)}</div></div></section><section class="container layout-with-map lesson-layout"><aside class="lesson-map desktop-map"><h2>سبق کا نقشہ</h2>${["مقصد", "تعارف", "دائرہ", "تصوراتی راستہ", "تعریف", "دلائل", "علمی توضیح", "مثالیں", "اہم نکات", "غلط فہمیاں", "فوری دہرائی", "روابط"].map((x,i)=>`<a href="#part-${i+1}"><span>${u(i+1)}</span>${x}</a>`).join("")}</aside><article class="lesson-article topic-page"><section id="part-1" class="qa-card"><h2>اس سبق کے بعد آپ کیا سمجھ سکیں گے؟</h2><ul class="tick-list">${t.purpose.map((x)=>`<li>${x}</li>`).join("")}</ul></section><section id="part-2" class="qa-card"><h2>مختصر تعارف</h2><p>${t.intro}</p></section><section id="part-3" class="scope-grid"><article><h2>اس میں شامل ہے</h2>${list(t.included)}</article><article><h2>اس میں شامل نہیں</h2>${list(t.excluded)}</article></section><section id="part-4" class="qa-card"><h2>تصوراتی راستہ</h2><div class="concept-route">${t.route.map((x,i)=>`<span>${u(i+1)}. ${x}</span>`).join("")}</div></section><section id="part-5" class="qa-card"><h2>کلیدی تعریف</h2><p class="definition-box">${t.definition}</p></section><section id="part-6" class="evidence-grid"><article><h2>قرآنی دلیل</h2><p>${t.quranEvidence}</p></article><article><h2>حدیثی/علمی اشارہ</h2><p>${t.hadithEvidence}</p></article></section><section id="part-7" class="qa-card"><h2>علمی توضیح</h2><p>${t.explanation}</p></section><section id="part-8" class="qa-card"><h2>مثالیں</h2>${list(t.examples)}</section><section id="part-9" class="qa-card"><h2>۱۰ اہم نکات</h2><ol class="key-list">${t.keyPoints.map((x)=>`<li>${x}</li>`).join("")}</ol></section><section id="part-10" class="qa-card"><h2>عام غلط فہمیاں</h2>${list(t.mistakes)}</section><section id="part-11" class="quick-revision"><h2>فوری دہرائی</h2><p>${t.revision}</p></section><section id="part-12" class="linked-panels"><article><h2>متعلقہ اصطلاحات</h2><div class="term-cloud">${terms.map((term)=>`<a href="${root}glossary/?term=${term.id}">${term.term}</a>`).join("")}</div></article><article><h2>مصادر</h2>${sources.map((s)=>`<p><strong>${s.title}</strong><br><small>${s.note}</small></p>`).join("")}</article></section><nav class="prev-next"><a href="${prev?topicUrl(prev.id):sectionUrl(sec.id)}">پچھلا: ${prev?prev.title:sec.title}</a><a href="${next?topicUrl(next.id):`${root}questions/?topic=${t.id}`}">اگلا: ${next?next.title:"مشق"}</a></nav></article></section>${pageNav([{kind:"prev", label:"پچھلا سبق", title:prev?prev.title:sec.title, href:prev?topicUrl(prev.id):sectionUrl(sec.id)},{kind:"next", label:"اگلا سبق", title:next?next.title:"MCQs", href:next?topicUrl(next.id):`${root}questions/?topic=${t.id}`}])}`);
  }
  function list(items=[]) { return `<ul class="tick-list">${items.map((x)=>`<li>${x}</li>`).join("")}</ul>`; }
  function questionsPage() {
    const topicId = params.get("topic") || params.get("lesson");
    const subjectId = params.get("subject");
    let items = topicId ? mcqsFor("topicId", topicId) : subjectId ? mcqsFor("subjectId", subjectId) : data.mcqs;
    const title = topicId ? `${topic(topicId).title}: MCQs` : subjectId ? `${subject(subjectId).title}: MCQs` : "MCQs Practice Center";
    shell(`<section class="container page-head"><h1>${title}</h1><p>ہر سوال پہلے صرف statement اور options دکھاتا ہے؛ جواب، وضاحت، مصادر اور related links بٹن سے کھلتے ہیں۔</p></section><section class="container quiz-list">${items.map(mcqCard).join("")}</section>${pageNav([{kind:"prev", label:"واپس", title:topicId?topic(topicId).title:"ہوم", href:topicId?topicUrl(topicId):`${root}`},{kind:"next", label:"اگلا", title:"مختصر سوالات", href:`${root}short-qa/${topicId?`?topic=${topicId}`:""}`}])}`);
  }
  function mcqCard(item, i) {
    const answerId = `answer-${item.id}`;
    const t = topic(item.topicId);
    return `<article class="quiz-card"><span class="quiz-meta">${t.title}</span><h2>${u(i + 1)}. ${item.statement}</h2><ol class="option-list">${item.options.map((opt)=>`<li>${opt}</li>`).join("")}</ol><button class="secondary-button" type="button" data-reveal="${answerId}" aria-expanded="false">جواب دیکھیں</button><div id="${answerId}" class="answer-panel" hidden><p><strong>درست جواب:</strong> ${item.options[item.answer]}</p><p>${item.explanation}</p><div class="term-cloud">${(item.termIds||[]).map((id)=>byId(data.glossary,id)).filter(Boolean).map((term)=>`<a href="${root}glossary/?term=${term.id}">${term.term}</a>`).join("")}</div></div></article>`;
  }
  function shortQaPage() {
    const topicId = params.get("topic") || params.get("lesson");
    const subjectId = params.get("subject");
    let items = topicId ? qaFor("topicId", topicId) : subjectId ? qaFor("subjectId", subjectId) : data.shortQA;
    const title = topicId ? `${topic(topicId).title}: مختصر سوالات` : subjectId ? `${subject(subjectId).title}: مختصر سوالات` : "مختصر سوالات";
    shell(`<section class="container page-head"><h1>${title}</h1><p>جواب پہلے چھپا رہتا ہے تاکہ طالب علم خود recall کر سکے۔</p></section><section class="container quiz-list">${items.map(qaCard).join("")}</section>${pageNav([{kind:"prev", label:"پچھلا", title:"MCQs", href:`${root}questions/${topicId?`?topic=${topicId}`:""}`},{kind:"next", label:"اگلا", title:"اصطلاحات", href:`${root}glossary/`}])}`);
  }
  function qaCard(item, i) {
    const answerId = `qa-${item.id}`;
    const t = topic(item.topicId);
    return `<article class="quiz-card"><span class="quiz-meta">${t.title}</span><h2>${u(i + 1)}. ${item.question}</h2><button class="secondary-button" type="button" data-reveal="${answerId}" aria-expanded="false">جواب دیکھیں</button><div id="${answerId}" class="answer-panel" hidden><p>${item.answer}</p></div></article>`;
  }
  function glossaryPage() {
    const id = params.get("term");
    const q = params.get("q") || "";
    const items = id ? data.glossary.filter((term)=>term.id===id) : q ? data.glossary.filter((term)=>`${term.term} ${term.definition}`.includes(q)) : data.glossary;
    shell(`<section class="container page-head"><h1>اصطلاحات</h1><p>ہر اصطلاح اپنے اصل topic، subject اور متعلقہ مشق سے جڑی ہوئی ہے۔</p><form class="inline-search" action="${root}glossary/"><input name="q" value="${h(q)}" placeholder="اصطلاح تلاش کریں"><button>تلاش</button></form></section><section class="container glossary-grid">${items.map((term)=>{ const sub=subject(term.subjectId); return `<article class="gloss-card"><span>${sub.title}</span><h2>${term.term}</h2><p>${term.definition}</p><div class="term-cloud">${term.topicIds.map((tid)=>`<a href="${topicUrl(tid)}">${topic(tid).title}</a>`).join("")}</div></article>`; }).join("")}</section>${pageNav([{kind:"prev", label:"پچھلا", title:"مختصر سوالات", href:`${root}short-qa/`},{kind:"next", label:"اگلا", title:"مصادر", href:`${root}sources/`}])}`);
  }
  function sourcesPage() {
    shell(`<section class="container page-head"><h1>مصادر</h1><p>مصادر کو الگ main subject نہیں بنایا گیا؛ یہ ہر سبق کے دعووں اور اصطلاحات کو سہارا دینے والا support system ہے۔</p></section><section class="container result-list">${data.sources.map((s)=>`<article class="result-card"><span>${s.type}</span><strong>${s.title}</strong><small>${s.note}</small></article>`).join("")}</section>${pageNav([{kind:"prev", label:"پچھلا", title:"اصطلاحات", href:`${root}glossary/`},{kind:"next", label:"اگلا", title:"مطالعہ کا راستہ", href:`${root}pathways/`}])}`);
  }
  function pathwaysPage() {
    shell(`<section class="container page-head"><h1>مطالعہ کا راستہ</h1><p>طالب علم اپنی سطح کے مطابق ایک مسلسل علمی سفر اختیار کر سکتا ہے۔</p></section><section class="container pathway-grid">${data.pathways.map(pathwayCard).join("")}</section>${pageNav([{kind:"prev", label:"پچھلا", title:"مصادر", href:`${root}sources/`},{kind:"next", label:"اگلا", title:"تلاش", href:`${root}search/`}])}`);
  }
  function searchPage() {
    const q = params.get("q") || "";
    const records = [
      ...data.subjects.map((s)=>({type:"مضمون", title:s.title, text:s.subtitle, href:subjectUrl(s.id)})),
      ...data.sections.map((s)=>({type:"باب", title:s.title, text:subject(s.subjectId).title, href:sectionUrl(s.id)})),
      ...data.topics.map((t)=>({type:"سبق", title:t.title, text:t.intro, href:topicUrl(t.id)})),
      ...data.glossary.map((term)=>({type:"اصطلاح", title:term.term, text:term.definition, href:`${root}glossary/?term=${term.id}`})),
      ...data.sources.map((s)=>({type:"مصدر", title:s.title, text:s.note, href:`${root}sources/`}))
    ];
    const filtered = q ? records.filter((item)=>`${item.title} ${item.text}`.includes(q)) : records.slice(0,24);
    shell(`<section class="container page-head"><h1>تلاش</h1><p>مضامین، ابواب، اسباق، اصطلاحات اور مصادر ایک ہی مربوط search میں شامل ہیں۔</p><form class="inline-search" action="${root}search/"><input name="q" value="${h(q)}" placeholder="مثلاً: وحی، سند، مقاصد"><button>تلاش</button></form></section><section class="container result-list">${filtered.map((item)=>`<a class="result-card" href="${item.href}"><span>${item.type}</span><strong>${item.title}</strong><small>${item.text}</small></a>`).join("")}</section>${pageNav([{kind:"prev", label:"پچھلا", title:"مطالعہ کا راستہ", href:`${root}pathways/`},{kind:"next", label:"واپس", title:"ہوم", href:`${root}`}])}`);
  }

  if (page === "home") home();
  if (page === "subjects") subjectsPage();
  if (page === "questions") questionsPage();
  if (page === "short-qa") shortQaPage();
  if (page === "glossary") glossaryPage();
  if (page === "sources") sourcesPage();
  if (page === "pathways") pathwaysPage();
  if (page === "search") searchPage();
})();
