# SAGE Lab Website

Multi-page academic GitHub Pages website for the Sustainability Analytics, Governance & Environment Lab at Adelphi University.

## Easy content updates

You can update recurring content without editing the page design:

- Members: `content/members.json`
- News: `content/news.json`
- Publications: `content/publications.json`
- Research: `content/research.json`
- Teaching: `content/teaching.json`

The site includes separate pages for Home, People, Publications, Research, Teaching, News, and Join.

Open one of these files on GitHub, click the pencil icon, copy an existing item, change its text, and commit the change. Keep commas between items and leave the surrounding square brackets in place.

For member photos, upload an image to `assets/images/` and set the member's `photo` value, for example:

```json
"photo": "assets/images/student-name.jpg"
```

Publication and news photos use the same pattern:

```json
"image": "assets/images/event-or-paper-image.jpg"
```

Dr. Kyungmin Lee's CV is available at `assets/files/kyungmin-lee-cv.pdf`.

The primary SAGE Lab logo is available at `assets/images/sage-lab-logo.png`.

## Preview on your Mac

You can open `index.html` directly in a browser. For the most reliable preview, open Terminal in this folder and run:

```bash
python3 -m http.server 4000
```

Then visit `http://localhost:4000`.

## Publish with GitHub Pages

1. Upload every file and folder in this directory to the root of your GitHub repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.

## Update content

- Main content: `index.html`
- Colors, typography, and layout: `assets/css/style.css`
- Mobile menu behavior: `assets/js/main.js`
- Project and profile images: add files to `assets/images/` and reference them in `index.html`

Before publishing, replace the sample email address, application form link, publication entries, student profiles, and news items with final information.
