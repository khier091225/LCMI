# LCMI website design

This is a single-page website for Laguna Carparts Manufacturing, Inc. Keep its navy and white identity, logo, Poppins headings, Source Sans Pro text, company information, catalogue and factory photographs.

## Purpose and composition

Help prospective customers understand LCMI's products and manufacturing capabilities, then contact sales or purchasing. `index.html` contains the entire site: Home → About → Products → Facilities → plant locations → Contact. The sticky header links to the five primary sections and highlights the section being read. Contact navigation lands directly at the team information.

Treat the site as a readable company capability sheet. Use real names, parts, equipment and locations. Do not invent testimonials, capacity figures, certification status or customer claims. Historical company information must retain its date or status qualification.

## Shared system

| Role | Value |
| --- | --- |
| Main ink and dark sections | `--ink: #001152` |
| Page ground | `--paper: #ffffff` |
| Secondary surface | `--surface: #f1f4f8` |
| Primary action | `--accent: #215fc7` |
| Action hover | `--accent-hover: #164b9f` |
| Keyboard focus | `--focus: #c15100` |
| Display | Poppins, weight 600 |
| Body | Source Sans Pro, weights 400 and 600 |
| Main text | 18px, line height 1.55 |
| Outer spacing | 20px on phones; fluid desktop spacing |

Use `css/site.css` for shared layout and tokens, `css/styles.css` for motion and image preview layers, and `css/one-page.css` for the single-page composition. `js/main.js` handles product browsing, previews, navigation disclosure and the email draft; `js/one-page.js` handles section navigation, active-link updates, deep links and inquiry-topic selection. There is no build step or framework dependency.

All content lives in `index.html`. The former About, Products, Facilities, Contact, privacy and terms files are compatibility redirects, with `js/redirect.js` preserving existing fragments and query parameters. Do not reintroduce duplicate page content into these files.

Headings are short, left aligned and balanced. Use filled navy or pale surfaces to group content. Keep buttons rectangular, controls at least 44px tall, focus visible, and text contrast sufficient. Forms retain visible labels and use native validation.

## Responsive and interaction rules

- Desktop navigation changes to a disclosure menu at 850px. The header remains available while scrolling; anchor offsets account for its actual height. Without JavaScript the links remain visible.
- Six products appear initially. Visitors can expand the full 17-item catalogue or filter by category; selecting a category shows all matching products. Without JavaScript all 17 products remain visible.
- Company profile, leadership, policy and records live in native expandable panels. The short About introduction stays visible; the full company background is retained in the profile panel. Each equipment category has its own panel, with pipe bending open initially. Opening several panels is allowed.
- Image links open the original file without JavaScript. The enhanced viewer uses a native modal dialog, Escape, arrow navigation, focus containment and focus restoration. Its image set is limited to the current gallery group, active product filter and visible panels.
- Deep links automatically expand the relevant panel and its ancestors. Native panels and their full content remain usable without JavaScript.
- The contact form prepares a `mailto:` draft. It never reports that a message was sent, never submits to a server, and keeps entered text available if no email client opens.
- Motion starts from visible content and respects reduced motion. Do not add preloaders, hidden reveal states or scroll hijacking.

## Assets and content

Display images are local WebP copies in `assets/images/optimized/`; gallery links retain the existing full-size originals. Keep product plates uncropped so their embedded labels remain legible. All displayed photographs and catalogue plates come from the original project. No generated images or new stock photography were added.

Facilities thumbnails share a 4:3 frame and fill it with a crop, including categories with only one image. Source documents with blank paper around their photographs use the `image-preview--padded` treatment to keep that paper outside the thumbnail. Opening a thumbnail always shows the complete original image.

In the expandable About panels, quality records and customer recognition form separate image layouts. Documents use complete, uncropped 3:4 previews; award photographs use 4:3 thumbnails. The recognition text plate remains uncropped. The quality policy uses two balanced desktop columns and returns to its original reading order on phones. Phone layouts use larger, single-column previews inside expanded panels.

Fonts are served locally as WOFF2, with source information and OFL notices in `assets/fonts/`.

Privacy and website information are native disclosures in the footer and explicitly await company-approved content. Their old routes redirect to these disclosures and carry `noindex`. Do not republish the unrelated organization’s text that previously occupied those pages. Certification records are historical, and employee figures remain dated October 2024.
