# LCMI website design

This is a refinement of the existing Laguna Carparts Manufacturing, Inc. site. Keep its navy and white identity, logo, Poppins headings, Source Sans Pro text, company information, catalogue and factory photographs.

## Purpose and composition

Help prospective customers understand LCMI's products and manufacturing capabilities, then contact sales or purchasing. The homepage introduces the business in readable HTML, shows the Canlubang plant, explains the company, presents equipment photographs and closes with the Carmona plant and an inquiry link.

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

Use `css/site.css` for layout and tokens, `css/styles.css` for motion and image preview layers, and `js/main.js` for enhancements. HTML pages contain their complete content and navigation. There is no build step or framework dependency.

Headings are short, left aligned and balanced. Use filled navy or pale surfaces to group content. Keep buttons rectangular, controls at least 44px tall, focus visible, and text contrast sufficient. Forms retain visible labels and use native validation.

## Responsive and interaction rules

- Desktop navigation changes to a disclosure menu at 850px. Without JavaScript the links remain visible.
- Product categories are optional filters. Without JavaScript all 17 products remain visible.
- Image links open the original file without JavaScript. The enhanced viewer uses a native modal dialog, Escape, arrow navigation, focus containment and focus restoration. Filtering also limits the viewer's image set.
- The contact form prepares a `mailto:` draft. It never reports that a message was sent, never submits to a server, and keeps entered text available if no email client opens.
- Motion starts from visible content and respects reduced motion. Do not add preloaders, hidden reveal states or scroll hijacking.

## Assets and content

Display images are local WebP copies in `assets/images/optimized/`; gallery links retain the existing full-size originals. Keep product plates uncropped so their embedded labels remain legible. All displayed photographs and catalogue plates come from the original project. No generated images or new stock photography were added.

Facilities thumbnails share a 4:3 frame and fill it with a crop, including categories with only one image. Source documents with blank paper around their photographs use the `image-preview--padded` treatment to keep that paper outside the thumbnail. Opening a thumbnail always shows the complete original image.

On About, quality records and customer recognition form separate galleries. Documents use complete, uncropped 3:4 previews; award photographs use 4:3 thumbnails. The recognition text plate remains uncropped. The quality policy uses two balanced desktop columns and returns to its original reading order on phones. In-page navigation links to the company profile, officers, policy and records.

Fonts are served locally as WOFF2, with source information and OFL notices in `assets/fonts/`.

The privacy and website-information routes explicitly await company-approved content and carry `noindex`. Do not republish the unrelated organization’s text that previously occupied those pages. Certification records are historical, and employee figures remain dated October 2024.
