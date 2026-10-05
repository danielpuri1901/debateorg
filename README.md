# DebateHub landing page

A static landing-page prototype for a proposed political debate service.
The page presents a concept based on LinkedIn-verified participants.

The repository contains HTML, CSS, and JavaScript.
The email form stores addresses in the visitor's browser through `localStorage`.
It does not send addresses to a server.

The repository does not implement the advertised LinkedIn verification or a working debate service.
The sample discussions are interface content.

## Local preview

Run from the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## Files

- `index.html` contains the page.
- `styles.css` contains the styles.
- `app.js` controls the email form and page interactions.
