document.documentElement.classList.add("js");

// Without JavaScript all navigation, catalogue images and contact links remain usable.
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
if (menu && nav) {
  menu.hidden = false;
  const setMenu = (open, restoreFocus = false) => {
    nav.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    if (restoreFocus) menu.focus();
  };
  menu.addEventListener("click", () =>
    setMenu(menu.getAttribute("aria-expanded") !== "true"),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true")
      setMenu(false, true);
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menu.contains(event.target))
      setMenu(false);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  matchMedia("(min-width: 851px)").addEventListener("change", () =>
    setMenu(false),
  );
}

const products = [...document.querySelectorAll(".product[data-category]")];
const filters = document.querySelector(".filter-bar");
if (filters && products.length) {
  filters.hidden = false;
  const count = document.querySelector("#product-count");
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    filters
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    let visible = 0;
    products.forEach((product) => {
      product.hidden =
        button.dataset.filter !== "all" &&
        product.dataset.category !== button.dataset.filter;
      if (!product.hidden) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? "product" : "products"}`;
  });
}

const gallery = [...document.querySelectorAll("[data-gallery]")];
if (
  gallery.length &&
  typeof HTMLDialogElement !== "undefined" &&
  "showModal" in HTMLDialogElement.prototype
) {
  const arrow =
    '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const dialog = document.createElement("dialog");
  dialog.className = "image-dialog";
  dialog.setAttribute("aria-label", "Image preview");
  dialog.innerHTML = `<button type="button" class="image-dialog__close" autofocus>Close <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button><button type="button" class="image-dialog__previous" aria-label="Previous image">${arrow}</button><div class="image-dialog__content"><img class="image-dialog__image" alt="Image preview" hidden><p class="image-dialog__caption" aria-live="polite"></p><p class="image-dialog__error" hidden>We couldn’t load this image. <a>Open the original image</a></p></div><button type="button" class="image-dialog__next" aria-label="Next image">${arrow}</button><p class="image-dialog__count" aria-live="polite"></p>`;
  document.body.append(dialog);
  const image = dialog.querySelector("img");
  const caption = dialog.querySelector(".image-dialog__caption");
  const counter = dialog.querySelector(".image-dialog__count");
  const previous = dialog.querySelector(".image-dialog__previous");
  const next = dialog.querySelector(".image-dialog__next");
  const error = dialog.querySelector(".image-dialog__error");
  let items = [],
    index = 0,
    trigger;
  const update = () => {
    const item = items[index];
    image.hidden = false;
    error.hidden = true;
    image.alt = item.querySelector("img").alt;
    image.src = item.href;
    caption.textContent = image.alt;
    error.querySelector("a").href = item.href;
    counter.textContent = `${index + 1} of ${items.length}`;
    previous.hidden = next.hidden = items.length < 2;
  };
  gallery.forEach((item) =>
    item.addEventListener("click", (event) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;
      event.preventDefault();
      items = gallery.filter((entry) => !entry.closest("[hidden]"));
      index = items.indexOf(item);
      trigger = item;
      update();
      dialog.showModal();
      document.body.classList.add("preview-open");
    }),
  );
  dialog
    .querySelector(".image-dialog__close")
    .addEventListener("click", () => dialog.close());
  const advance = (step) => {
    index = (index + step + items.length) % items.length;
    update();
  };
  previous.addEventListener("click", () => advance(-1));
  next.addEventListener("click", () => advance(1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      advance(event.key === "ArrowLeft" ? -1 : 1);
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("preview-open");
    image.hidden = true;
    image.removeAttribute("src");
    if (trigger?.isConnected) trigger.focus();
  });
  image.addEventListener("error", () => {
    image.hidden = true;
    error.hidden = false;
  });
}

const form = document.querySelector("#inquiry-form");
if (form) {
  form.hidden = false;
  const requested = new URLSearchParams(location.search).get("topic");
  const topic = form.elements.namedItem("topic");
  if ([...topic.options].some((option) => option.value === requested))
    topic.value = requested;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "Not specified"}\n\n${data.get("message")}`;
    const draft = `mailto:marketing@lagunacarpartsmfg.com?subject=${encodeURIComponent("LCMI — " + data.get("topic"))}&body=${encodeURIComponent(body)}`;
    // Preserve the fields: the email client is the only place the message can be sent.
    document.querySelector("#form-status").textContent =
      "Your email draft is ready. Send it in your email app to complete your inquiry. If no app opens, use the email link below.";
    window.location.href = draft;
  });
}

// A small arrival gesture keeps the company profile visible throughout the animation.
const motion = matchMedia("(prefers-reduced-motion: reduce)");
if (!motion.matches && typeof Element.prototype.animate === "function") {
  document
    .querySelectorAll(
      ".hero-copy h1, .hero-copy > p, .hero-copy .button, .hero-photo, .page-intro > *, .contact-intro > div",
    )
    .forEach((element, index) => {
      element.style.setProperty("--arrival-delay", `${index * 65}ms`);
      element.classList.add("profile-arrival");
    });
  const photo = document.querySelector(".hero-photo img");
  if (photo) photo.classList.add("photo-arrival");
  // Scroll feedback is restrained and never hides content or delays reading.
  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const isImage = target.matches("img");
          target.classList.add(isImage ? "photo-arrival" : "profile-arrival");
          observer.unobserve(target);
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(
        ".section-heading h2, .section-heading > div, .capability-pictures img, .plant-layout img, .plant-layout h2, .plant-layout p, .plant-layout .text-link",
      )
      .forEach((element) => observer.observe(element));
    motion.addEventListener(
      "change",
      ({ matches }) => {
        if (matches) {
          observer.disconnect();
          document.getAnimations().forEach((animation) => animation.finish());
        }
      },
      { once: true },
    );
  }
}
