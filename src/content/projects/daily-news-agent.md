---
title: Daily News Summarization Agent
status: Scheduled daily
category: AI agent
summary: Fetches top headlines from trusted sources, summarizes them with AI and posts a digest to Discord every morning at 10 AM.
tech: [n8n, OpenAI, Discord]
repo: https://github.com/arjunreddy91100/Daily-News-Summarization-Agent-for-Discord
order: 3
---

An n8n workflow that delivers an AI-summarized news digest to a Discord channel every morning at 10 AM. It fetches the day's top headlines, summarizes them with an LLM and posts the result, with no manual steps.

## How it works

1. **Schedule Trigger** fires every day at 10 AM.
2. **Fetch headlines** with an HTTP request to NewsAPI.
3. **Summarize** all headlines with OpenAI GPT-4 (any LLM works) using a short morning-digest prompt.
4. **Send to Discord** through a channel webhook.

## Design decisions

- **A public API over RSS feeds.** RSS sources were often restricted or broke without notice. NewsAPI needs only an API key and is well documented.
- **Summaries, not raw headlines.** A list of headlines feels fragmented; a short summary gives context.
- **Discord for delivery.** Webhooks are simple and reliable, and it's where the community already is.
- **No database.** Nothing needs history yet, so there's nothing to store.

## Problems I hit

- **401 errors from RSS sources.** Fixed by switching to NewsAPI.
- **Data mapping errors.** A `.flatMap` failed because the response shape didn't match; mapping with `.map` and checking the array exists fixed it.
- **Unreliable LLM output.** Getting readable summaries took prompt tuning and checking which output key the summary came back under.
- **Discord formatting.** Getting the message format right meant referencing the AI output key correctly in the webhook body.

## Run your own

Get a NewsAPI key, create a Discord webhook, paste both into the workflow nodes, run it once manually to check the channel, then switch it on.
