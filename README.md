# Arjun Reddy · Portfolio

My portfolio as a software engineer working across backend services, data engineering and AI.

**Live site:** https://arjunreddy91100.github.io/Arjun_Reddy_Portfolio/

The hero is an interactive 3D model of the kind of system I build, made with three.js: requests flow from users into a REST API, data streams through Kafka and pipelines into a warehouse, and an LLM answers. Visitors can drag to rotate it and hover any part to see where I've used it. The rest of the page has 3D tilt project cards, a build log, and a section on how I build with AI. There's no build step: it's plain HTML, CSS and JavaScript.

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
