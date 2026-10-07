KUWENTA (PWA package)

To install it as an app on your phone, the files must be hosted over HTTPS.
Free, easy options (Vercel: see below; others: drag and drop this whole folder):
  - Vercel:            vercel.com (included vercel.json; no build needed)
  - Netlify Drop:      app.netlify.com/drop
  - Cloudflare Pages:  pages.cloudflare.com
  - GitHub Pages:      upload these files to a repo, enable Pages

Then open the link on your phone:
  - Android (Chrome): menu (⋮) -> "Install app", or Kuwenta's own ⋮ menu -> Install app
  - iPhone (Safari):  Share -> Add to Home Screen

After the first visit it works fully offline. Your sheets are stored on the device.
When you publish a new version, change V in sw.js (e.g. 'kuwenta-v3') so phones refresh.

Cloud sync is optional: Settings -> Cloud sync (needs your own free Firebase Realtime Database).
