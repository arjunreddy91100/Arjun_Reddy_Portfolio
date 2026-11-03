# How to update arjunreddy.dev

Everything on the site comes from Markdown files. You never edit HTML to add content.

```
src/content/writing/    one .md file per post
src/content/projects/   one .md file per project
src/config.ts           links, email, tag list, newsletter settings
public/                 files served as-is (CNAME, resume PDF, images)
```

The file name becomes the URL: `src/content/writing/my-post.md` → `arjunreddy.dev/writing/my-post/`.
Use lowercase words joined by hyphens.

## Preview locally

```bash
npm install      # first time only
npm run dev      # open http://localhost:4321, updates as you save
npm run build    # the same check GitHub runs before deploying
```

## Add a post

1. Copy `src/content/writing/sample-post-format.md` and rename it, e.g. `ssis-to-data-factory.md`.
2. Fill in the frontmatter at the top:

   ```yaml
   ---
   title: "Moving an SSIS pipeline to Azure Data Factory"
   date: 2026-11-10
   tags: [Data Engineering]     # Data Engineering, AI, Backend, Career, or any new tag
   summary: One or two sentences for the card and link previews.
   thumb: "SSIS → Data Factory" # optional text on the card's thumbnail block
   # readTime: 6                # optional; calculated from the word count if left out
   featured: false
   draft: false                 # true hides it everywhere
   ---
   ```

3. Write the post below the `---` in Markdown. Put images in `public/assets/writing/` and use
   `![Describe the image](/assets/writing/name.png)`.
4. Set `draft: false` when it's ready. The post appears on the homepage (3 newest), on /writing, in the
   RSS feed and in the sitemap. The Writing section and nav link appear on their own once there is at
   least one published post.

## Add a project

Create `src/content/projects/my-project.md`:

```yaml
---
title: My Project
status: Live                 # shown in the pill; "Live", "Running…" or "Shipped" turn it green
category: Data pipeline      # shown at the top right of the card
summary: What it does, in one or two sentences.
stats: 3 sources · 10k rows/day   # optional mono line on the card
tech: [Python, Airflow, PostgreSQL]
repo: https://github.com/arjunreddy91100/my-project   # optional "Code" link
demo: https://…                                       # optional "Try it" link
order: 5                     # lower numbers come first; the homepage shows the first 4
featured: false
---

The write-up for /projects/my-project goes here: how it works, decisions, what broke, results.
```

Add `draft: true` to hide a project while you work on it.

## Change the featured story

The homepage story is the **first project with `featured: true`** (by `order`). If no project is
featured, it uses the newest post with `featured: true`. If nothing is featured, the section is hidden.

To switch: set `featured: false` on the Bank Text-to-SQL Bot and `featured: true` on the new item.

A featured project can also set these optional fields:

```yaml
headline: A bank chatbot that writes the SQL, never the numbers   # big title (defaults to title)
pitch: Longer pitch for the story (defaults to summary).
terminal:                     # the dark panel; leave out to show the project title there instead
  context: ~/projects/my-project · local
  question: How many customers have a personal loan?
  code: SELECT COUNT(*) FROM customers WHERE personal_loan = 'yes'
  answer: 6248 customers have a personal loan.
  check: counted by the database, not the model
```

## Update the resume

Replace `public/assets/Arjun_Reddy_Resume.pdf` with a file of the same name. The URL stays
`arjunreddy.dev/assets/Arjun_Reddy_Resume.pdf`.

## Turn on the newsletter

In `src/config.ts`, set `NEWSLETTER.action` to your provider's form URL:

- Buttondown: `https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME`
- Substack: `https://YOUR_NAME.substack.com/api/v1/free`

Until then the form shows a "launching soon" note and sends nothing.

## Deploy

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every
push to `main`.

**One-time setup** (needed before the first deploy of this version): on GitHub, open the repo's
**Settings → Pages** and set **Source** to **GitHub Actions**. The custom domain keeps working because
`public/CNAME` is copied into every build.

After that, publishing is:

```bash
git add .
git commit -m "Add post: SSIS to Data Factory"
git push
```

Watch progress under the repo's **Actions** tab; the site updates about a minute after it goes green.
If the build fails, run `npm run build` locally: it shows the same error (usually a missing or
misspelled frontmatter field).
