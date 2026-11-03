---
title: TrueFit
status: Local AI app
category: AI engineering
summary: Finds real US job postings, tailors my own resume to each one and shows the gaps. Honesty rules are enforced in code, not trusted to the AI, and it never applies for me.
stats: 6 job sources · resume import · application tracker
tech: [Python, FastAPI, Ollama, REST APIs]
repo: https://github.com/arjunreddy91100/TrueFit-local-honest-you-hit-send
order: 2
---

TrueFit finds real US job postings, tailors **my own** resume to each one, writes a cover letter when asked, shows my gaps and tracks every application. It runs entirely on a laptop with a local model through Ollama. **It never applies for you:** you read the result, check it and submit it yourself.

## Why I built it

After a year of applying to jobs, two problems stood out:

1. **Rewriting the resume for every job took hours.** Each posting wants different keywords, a different order of experience, and sometimes a different format (W2 vs. contract-to-hire).
2. **The usual shortcut makes things worse.** AI resume tools invent skills, inflate titles and add numbers you never achieved, and auto-apply bots send those resumes everywhere.

TrueFit does the slow part, reading the posting, choosing and ordering real experience, and formatting, while making it impossible for the tool to misrepresent me.

## The honesty rules, enforced by code

- Companies, titles, dates and education are copied from the profile, never generated.
- An AI-reworded bullet is **blocked and reverted** if it adds a tool, number or name that wasn't in the original line, or a seniority word such as "led", "owned" or "managed".
- A rewrite is also blocked if it drops a word that shows shared work: "helped migrate" can't become "migrated".
- Summaries and cover letters are checked sentence by sentence against the whole profile, and unsupported claims are highlighted.
- Skills with no supporting bullet are hidden by default, so every listed skill shows where it was used.

## How a day with it works

1. Find jobs.
2. Click **Tailor resume** and review the result. Every AI change is marked.
3. Check **Fit & gaps**: which requirements I've demonstrated, which I only list, which I'm missing.
4. Write a cover letter only if the job asks for one.
5. Download Word or PDF, open the posting and apply myself.
6. Mark it submitted, and the tracker records it.

## Where the jobs come from

Public APIs only. TrueFit doesn't scrape and never logs in anywhere.

- Company boards on Greenhouse, Lever and Ashby, posted directly by the employer and marked most trusted
- Remotive and RemoteOK
- With a free API key: JSearch, Adzuna and USAJOBS

The same job listed on several sites is merged into one entry. Postings older than 30 days, third-party recruiter ads and very short descriptions are flagged. Contract terms (W2, C2H, C2C, 1099) are detected, and "No C2C" is not mistaken for C2C.

## Resume import and templates

Importing a .docx, .pdf or .txt resume has the local model copy it into a structured profile; every line is checked against the original file and anything that doesn't match is flagged. Output comes in two ATS-safe templates: a one-column W2 / direct-hire layout, and a contract layout with work authorization up top and an **Environment:** line per role.

## Privacy

- The server listens only on `127.0.0.1`.
- Ollama must be local; cloud models are refused.
- Job searches send only the search words to the job APIs. The resume never leaves the laptop.
- Everything lives in one local SQLite file, ignored by git.

## Stack

A FastAPI backend (job sources, resume import, tailoring and honesty checks, skill matching, Word/PDF rendering, a local Ollama client, SQLite) with a plain HTML/CSS/JS front end and no build step.
