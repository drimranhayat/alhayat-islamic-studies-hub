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
    document.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
      const card = button.closest(".quiz-card");
      if (!card || card.dataset.answered === "true") return;
      card.dataset.answered = "true";
      const correct = button.dataset.correct === "true";
      button.classList.add(correct ? "is-correct" : "is-wrong");
      card.querySelectorAll("[data-choice]").forEach((choice) => {
        choice.disabled = true;
        if (choice.dataset.correct === "true") choice.classList.add("is-correct");
      });
      const panel = card.querySelector(".answer-panel");
      if (panel) panel.hidden = false;
    }));
  }

  function hero() {
    return `<section class="hero" style="--hero-image:url('${root}assets/images/alhayat-hero-custom.png')"><div class="hero-side hero-side-right">${icon("book-open")}</div><div class="hero-side hero-side-left">${icon("mosque")}</div><div class="container hero-inner"><div class="hero-title-lockup"><span class="hero-ornament"></span><p class="eyebrow">${data.site.nameEn}</p><h1>${data.site.tagline}</h1><p class="hero-tagline">${data.site.nameUr}</p><p class="hero-description">${data.site.description}</p></div><form class="hero-search" action="${root}search/"><input name="q" type="search" placeholder="کسی موضوع، عنوان یا اصطلاح کو تلاش کریں..."><button>${icon("search")}<span>تلاش</span></button></form><div class="hero-actions centered"><a class="primary-button" href="${root}subjects/">${icon("book-open")} مطالعہ شروع کریں</a><a class="secondary-button" href="${root}questions/">${icon("clipboard")} MCQs مشق</a></div></div></section>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><img src="${root}assets/brand/alhayat-mark.svg" alt=""><div><h2>${data.site.nameUr}</h2><p>${data.site.description}</p></div></div><div><h3>فوری لنکس</h3>${data.nav.slice(1, 7).map((item) => `<a href="${root}${item.href}">${item.label}</a>`).join("")}</div><div><h3>علمی مزاج</h3><p>مستند مصادر، واضح ترتیب، غیر جانب دار اسلوب اور طالب علم کے لیے آسان علمی رہنمائی۔</p></div></div><p class="copyright">© 2026 ${data.site.nameUr}</p></footer>`;
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
    shell(`${hero()}<section class="container section-block"><div class="section-title"><span></span><h2>اہم مضامین</h2><span></span></div><div class="subject-grid">${data.subjects.map(subjectCard).join("")}</div></section><section class="container section-block"><div class="section-title"><span></span><h2>مطالعہ کے راستے</h2><span></span></div><div class="pathway-grid">${data.pathways.map(pathwayCard).join("")}</div></section>${pageNav([{kind:"next", label:"اگلا قدم", title:"تمام مضامین", href:`${root}subjects/`}])}`);
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
    const sections = sub.sectionIds.map(section).filter(Boolean);
    const active = sections.filter((s) => topicsForSection(s.id).length);
    shell(`<section class="subject-hero" style="--accent:${sub.accent}"><div class="container subject-hero-grid"><div>${breadcrumbs([{label:"مضامین", href:`${root}subjects/`},{label:sub.title}])}<p class="eyebrow">${sub.level}</p><h1>${sub.title}</h1><p>${sub.description || sub.subtitle}</p><div class="subject-chip-row"><span>${icon(sub.icon)} ${u(sections.length)} علمی ابواب</span><span>${icon("book-open")} ${u(active.length)} فعال مطالعاتی راستے</span><span>${icon("clipboard")} سوالات سے مربوط</span></div><div class="hero-actions"><a class="primary-button" href="${sectionUrl(active[0].id)}">${icon("book-open")} پہلا باب شروع کریں</a><a class="secondary-button" href="${root}questions/?subject=${sub.id}">${icon("clipboard")} MCQs</a></div></div><div class="masthead-emblem">${icon(sub.icon)}</div></div></section><section class="container section-block"><div class="section-title"><span></span><h2>بارہ بنیادی ابواب</h2><span></span></div><div class="section-grid">${sections.map((s, i) => {
      const count = topicsForSection(s.id).length;
      const body = `<span>${u(i + 1)}</span><i class="button-icon">${icon(s.icon)}</i><strong>${s.title}</strong><small>${s.purpose}</small>`;
      return count ? `<a class="section-card" href="${sectionUrl(s.id)}">${body}</a>` : `<article class="section-card is-muted">${body}</article>`;
    }).join("")}</div></section>${pageNav([{kind:"prev", label:"پچھلا", title:(data.subjects[idx-1]||{}).title || "مضامین", href:idx>0?subjectUrl(data.subjects[idx-1].id):`${root}subjects/`},{kind:"next", label:"اگلا", title:(data.subjects[idx+1]||{}).title || "مطالعہ کا راستہ", href:idx<data.subjects.length-1?subjectUrl(data.subjects[idx+1].id):`${root}pathways/`}])}`);
  }
  function renderSection(subjectId, secIndex) {
    const sub = subject(subjectId);
    const sections = sub.sectionIds.map(section).filter(Boolean);
    const sec = sections[secIndex] || sections.find((s) => topicsForSection(s.id).length) || sections[0];
    const topics = topicsForSection(sec.id);
    if (!topics.length) return renderSubject(sub.id);
    const available = sections.filter((s) => topicsForSection(s.id).length);
    const idx = available.findIndex((s) => s.id === sec.id);
    shell(`<section class="section-masthead" style="--accent:${sub.accent}"><div class="container section-masthead-grid"><div>${breadcrumbs([{label:"مضامین", href:`${root}subjects/`},{label:sub.title, href:subjectUrl(sub.id)},{label:sec.title}])}<p class="eyebrow">${sub.title}</p><h1>${sec.title}</h1><p>اس باب کے اسباق ایک ہی علمی راستے میں ترتیب دیے گئے ہیں۔</p></div><div class="masthead-emblem">${icon(sec.icon)}</div></div></section><section class="container section-block"><div class="topic-grid">${topics.map(topicCard).join("")}</div></section>${pageNav([{kind:"prev", label:"پچھلا", title:(available[idx-1]||{}).title || sub.title, href:idx>0?sectionUrl(available[idx-1].id):subjectUrl(sub.id)},{kind:"next", label:"اگلا", title:(available[idx+1]||{}).title || topics[0].title, href:idx<available.length-1?sectionUrl(available[idx+1].id):topicUrl(topics[0].id)}])}`);
  }

  function renderTopic(id) {
    const t = topic(id), sub = subject(t.subjectId), sec = section(t.sectionId);
    const prev = t.previousTopicId ? topic(t.previousTopicId) : null;
    const next = t.nextTopicId ? topic(t.nextTopicId) : null;
    const quick = t.quickRevision || {};
    const topicMcqs = itemsByIds(data.mcqs, t.mcqIds);
    const topicQa = itemsByIds(data.shortQA, t.shortQAIds);
    shell(`<section class="lesson-hero" style="--accent:${sub.accent}"><div class="container lesson-hero-grid"><div>${breadcrumbs([{label:"مضامین", href:`${root}subjects/`},{label:sub.title, href:subjectUrl(sub.id)},{label:sec.title, href:sectionUrl(sec.id)},{label:t.title}])}<p class="eyebrow">${sub.title} · ${t.level} · ${t.estimatedTime || t.time}</p><h1>${t.title}</h1><p>${t.summary || t.introduction}</p><div class="hero-actions">${topicMcqs.length ? `<button class="primary-button" type="button" data-reveal="topic-mcqs">${icon("clipboard")} MCQs حل کریں</button>` : ""}${topicQa.length ? `<button class="secondary-button" type="button" data-reveal="topic-qa">${icon("question")} مختصر سوالات دیکھیں</button>` : ""}</div></div><div class="masthead-emblem lesson-emblem">${icon(t.icon)}</div></div></section><section class="container lesson-layout-simple"><article class="lesson-article topic-page"><section class="qa-card"><h2>مختصر علمی تمہید</h2><p>${t.introduction || t.intro}</p></section><section class="qa-card scholarly-essay"><h2>${t.title} کا علمی فہم</h2>${paragraphs(t.scholarlyEssay || t.explanation)}</section><section class="qa-card"><h2>یاد رکھنے کے نکات</h2><ol class="key-list">${(t.pointsToLearn || t.keyPoints || []).slice(0, 10).map((x)=>`<li>${x}</li>`).join("")}</ol></section><section class="quick-revision"><h2>فوری دہرائی</h2><p><strong>ایک جملہ:</strong> ${quick.sentence || t.revision}</p><p><strong>اہم اصطلاحات:</strong> ${(quick.terms || t.termIds || []).slice(0,3).map(termLabel).join("، ")}</p><ul class="tick-list">${(quick.points || (t.pointsToLearn || []).slice(0,3)).map((x)=>`<li>${x}</li>`).join("")}</ul>${quick.mistake ? `<p><strong>عام غلطی:</strong> ${quick.mistake}</p>` : ""}</section>${topicMcqs.length ? `<section id="topic-mcqs" class="topic-panel" hidden><h2>MCQs Practice</h2><div class="quiz-list embedded">${topicMcqs.map(mcqCard).join("")}</div></section>` : ""}${topicQa.length ? `<section id="topic-qa" class="topic-panel" hidden><h2>مختصر سوالات</h2><div class="quiz-list embedded">${topicQa.map(qaCard).join("")}</div></section>` : ""}<nav class="prev-next"><a href="${prev?topicUrl(prev.id):sectionUrl(sec.id)}">پچھلا: ${prev?prev.title:sec.title}</a>${topicMcqs.length ? `<a href="${root}questions/?topic=${t.id}">مزید MCQs</a>` : ""}<a href="${next?topicUrl(next.id):`${root}pathways/`}">اگلا: ${next?next.title:"مطالعہ کا راستہ"}</a></nav></article></section>${pageNav([{kind:"prev", label:"پچھلا", title:prev?prev.title:sec.title, href:prev?topicUrl(prev.id):sectionUrl(sec.id)},{kind:"next", label:"اگلا", title:next?next.title:"MCQs", href:next?topicUrl(next.id):`${root}questions/?topic=${t.id}`}])}`);
  }
  function list(items=[]) { return `<ul class="tick-list">${items.map((x)=>`<li>${x}</li>`).join("")}</ul>`; }
  function itemsByIds(list, ids = []) { return ids.map((id) => byId(list, id)).filter(Boolean); }
  function termLabel(id) { const term = byId(data.glossary, id); return term ? term.term : id; }
  function paragraphs(text = "") { return text.split(/\n{2,}|(?<=۔)\s+(?=[آ-ی])/).filter(Boolean).map((part) => `<p>${part}</p>`).join(""); }
  function questionsPage() {
    const topicId = params.get("topic") || params.get("lesson");
    const subjectId = params.get("subject");
    let items = topicId ? mcqsFor("topicId", topicId) : subjectId ? mcqsFor("subjectId", subjectId) : data.mcqs;
    if (!items.length && topicId) items = mcqsFor("subjectId", topic(topicId).subjectId);
    const title = topicId ? `${topic(topicId).title}: MCQs` : subjectId ? `${subject(subjectId).title}: MCQs` : "MCQs Practice Center";
    shell(`<section class="container page-head"><h1>${title}</h1><p>ہر سوال میں پہلے جواب منتخب کریں؛ پھر درست جواب، غلط انتخاب کی نشان دہی اور وضاحت سامنے آئے گی۔</p></section><section class="container quiz-list">${items.map(mcqCard).join("")}</section>${pageNav([{kind:"prev", label:"واپس", title:topicId?topic(topicId).title:"ہوم", href:topicId?topicUrl(topicId):`${root}`},{kind:"next", label:"اگلا", title:"مختصر سوالات", href:`${root}short-qa/${topicId?`?topic=${topicId}`:""}`}])}`);
  }
  function mcqCard(item, i) {
    const answerId = `answer-${item.id}`;
    const t = topic(item.topicId);
    const correct = item.correctOption ?? item.answer ?? 0;
    return `<article class="quiz-card"><span class="quiz-meta">${t.title} · ${item.difficulty || "متوسط"}</span><h2>${u(i + 1)}. ${item.statement}</h2><div class="option-list" role="list">${item.options.map((opt, optIndex)=>`<button type="button" data-choice="${optIndex}" data-correct="${optIndex === correct}">${opt}</button>`).join("")}</div><div id="${answerId}" class="answer-panel" hidden><p><strong>درست جواب:</strong> ${item.options[correct]}</p><p>${item.explanation}</p><div class="term-cloud">${(item.termIds||[]).map((id)=>byId(data.glossary,id)).filter(Boolean).map((term)=>`<a href="${root}glossary/?term=${term.id}">${term.term}</a>`).join("")}<a href="${topicUrl(item.topicId)}">متعلقہ سبق</a></div></div></article>`;
  }
  function shortQaPage() {
    const topicId = params.get("topic") || params.get("lesson");
    const subjectId = params.get("subject");
    let items = topicId ? qaFor("topicId", topicId) : subjectId ? qaFor("subjectId", subjectId) : data.shortQA;
    if (!items.length && topicId) items = qaFor("subjectId", topic(topicId).subjectId);
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
      ...data.sections.filter((s)=>topicsForSection(s.id).length).map((s)=>({type:"باب", title:s.title, text:subject(s.subjectId).title, href:sectionUrl(s.id)})),
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
