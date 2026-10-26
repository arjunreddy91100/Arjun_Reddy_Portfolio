# Arjun Reddy · Portfolio

My portfolio as a software engineer working across backend services, data engineering and AI.

**Live site:** https://arjunreddy91100.github.io/Arjun_Reddy_Portfolio/

The site is laid out like API documentation: each section is an endpoint (`GET /experience`, `GET /projects`, `POST /contact`), and the hero is a JSON response describing me. It works in light and dark mode and on phones, and it has no build step and no dependencies.

## What's inside

| File | What it is |
|---|---|
| `index.html` | The whole site: layout, styles and script |
| `projects.js` | The list of projects. This is the only file to edit when I ship something new |
| `assets/projects/` | Project screenshots |
| `assets/Arjun_Reddy_Resume.pdf` | The resume behind the "Download resume" buttons |

## Adding a new project

My goal is to build and ship something every day. To add one:

1. Open `projects.js`.
2. Copy an existing block, paste it at the **top** of the list, and fill it in:

```js
{
  name: "My new project",
  date: "2026-10-27",            // the day you shipped it; fills the build log
  kind: "Web app",               // Web app, AI agent, API, Data pipeline…
  summary: "What it does and who it's for, in one or two sentences.",
  points: ["Optional highlight", "Another highlight"],
  stack: ["Python", "FastAPI", "PostgreSQL"],
  live: "https://…",             // optional link to try it
  code: "https://github.com/…",  // optional link to the source
  image: "assets/projects/my-project.jpg",  // optional screenshot, 1280×800
  featured: false                // true shows it large at the top
},
```

3. Commit and push. GitHub Pages updates the site in about a minute.

The "projects shipped" count in the hero and the 30-day build log update automatically from this list.

## Updating the resume

Replace `assets/Arjun_Reddy_Resume.pdf` with the new file, keeping the same name, and push.

## Run it locally

Open `index.html` in a browser.

## Contact

- Email: arjunreddy0928@gmail.com
- LinkedIn: https://www.linkedin.com/in/arjunreddyy7/
