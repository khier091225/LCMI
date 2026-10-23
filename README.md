# Laguna Carparts Manufacturing website

A static, responsive HTML/CSS/JavaScript site. No build step is required. Serve this directory with any static web server.

For the current development environment:

```powershell
rtk proxy uv run --python 3.14 python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/.

`DESIGN.md` describes the shared design and interaction rules. `AUDIT.md` records the audit, improvements, verification and content still awaiting company review.

The contact form opens the visitor's email application; it has no submission backend. Company-approved privacy and terms content is still needed before those pages can serve as published policies.
