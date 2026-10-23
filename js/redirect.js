// Retain old bookmarks, inquiry topics and section fragments after consolidation.
const destination = new URL("index.html", window.location.href);
destination.search = window.location.search;
destination.hash =
  window.location.hash || document.currentScript.dataset.section;
window.location.replace(destination.href);
