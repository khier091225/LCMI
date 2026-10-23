# Laguna Carparts Manufacturing website

A static, responsive single-page HTML/CSS/JavaScript site. No build step is required. Serve this directory with any static web server.

`index.html` contains Home, About, Products, Facilities and Contact, along with the footer notices. The old page URLs redirect to matching sections and preserve bookmarks and inquiry topics. Edit the main page to update content; the redirect files contain no separate copy.

For the current development environment:

```powershell
rtk proxy uv run --python 3.14 python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/.

`DESIGN.md` describes the shared design and interaction rules. `AUDIT.md` records the audit, improvements, verification and content still awaiting company review.

The contact form opens the visitor's email application; it has no submission backend. Company-approved privacy and terms content is still needed for the footer notices.
