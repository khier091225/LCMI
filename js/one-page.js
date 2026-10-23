const header = document.querySelector(".one-page .site-header");
if (header) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty(
      "--site-header-height",
      `${header.getBoundingClientRect().height}px`,
    );
  };
  updateHeaderHeight();
  if (typeof ResizeObserver !== "undefined")
    new ResizeObserver(updateHeaderHeight).observe(header);

  const revealTarget = () => {
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target;
    while (parent) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
      parent = parent.parentElement;
    }
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  };
  window.addEventListener("hashchange", revealTarget);
  if (location.hash) document.fonts.ready.then(revealTarget);
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (
      !anchor ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (anchor.hash === location.hash) {
      event.preventDefault();
      revealTarget();
    }
  });

  const sections = [...document.querySelectorAll("[data-nav-section]")];
  const links = [...header.querySelectorAll("[data-section-link]")];
  let activeId;
  const updateCurrentSection = () => {
    const readingLine =
      header.getBoundingClientRect().height + innerHeight * 0.25;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) active = section;
    }
    if (active?.id === activeId) return;
    activeId = active?.id;
    links.forEach((link) => {
      if (link.dataset.sectionLink === active?.id)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(updateCurrentSection, {
      rootMargin: "-20% 0px -55% 0px",
    });
    sections.forEach((section) => observer.observe(section));
  }
  let scheduled = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          updateCurrentSection();
          scheduled = false;
        });
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateCurrentSection);
  updateCurrentSection();

  const topic = document.querySelector("#topic");
  document.querySelectorAll("[data-inquiry-topic]").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      if (
        topic &&
        [...topic.options].some(
          (option) => option.value === anchor.dataset.inquiryTopic,
        )
      ) {
        topic.value = anchor.dataset.inquiryTopic;
      }
    });
  });
}
