# Faith International School Portal — PWA

This is the school portal converted into a **Progressive Web App (PWA)**.

It works on:
- **Mobile phones** (Android & iPhone) — can be installed to the home screen
- **PC / Laptop** (Chrome, Edge, Safari, Firefox) — can be installed as a desktop app

## What’s included

| File              | Purpose                                      |
|-------------------|----------------------------------------------|
| `index.html`      | The full portal (Firebase Auth + Firestore)  |
| `manifest.json`   | App name, icons, theme colour, display mode  |
| `sw.js`           | Service Worker (caches the app shell)        |
| `icons/`          | App icons (72 → 512 px + maskable)           |

## How to use / install

### 1. Host the folder on any HTTPS website
You **must** serve the files over HTTPS (or localhost).  
Examples:
- Firebase Hosting
- Netlify / Vercel / Cloudflare Pages
- Your own school server with SSL

Just upload the entire `fis-portal-pwa` folder so that:
```
https://yourdomain.com/portal/index.html
https://yourdomain.com/portal/manifest.json
https://yourdomain.com/portal/sw.js
https://yourdomain.com/portal/icons/...
```

### 2. Install on phone or computer

**Android (Chrome):**
1. Open the portal URL
2. Tap the menu (⋮) → “Install app” or “Add to Home screen”

**iPhone (Safari):**
1. Open the portal URL
2. Tap Share → “Add to Home Screen”

**Windows / Mac (Chrome or Edge):**
1. Open the portal URL
2. Click the install icon in the address bar (or menu → “Install Faith International School Portal”)

Once installed it opens in its own window without the browser address bar.

## Notes

- The app shell (login screen + interface) works offline after the first visit.
- Login, results, student data etc. still need an internet connection (Firebase).
- Theme colour is school maroon (`#6B0F1A`).
- Icons show “FIS” on a maroon background.

## Firebase
The original Firebase project (`myschoolportal-53158`) is already configured inside `index.html`.  
No change needed unless you want to use a different project.
