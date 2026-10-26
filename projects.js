/*
  Arjun's projects.
  To add a project, copy one block, paste it at the TOP of the list, and fill it in.

  name      Project name
  date      Day you shipped it, as "YYYY-MM-DD" (leave null if unknown). Fills the build log.
  kind      Short type, e.g. "Web app", "AI agent", "API", "Data pipeline"
  summary   One or two sentences: what it does and who it's for
  points    2–4 short highlights (optional)
  stack     Tools and languages used
  live      Link to try it (optional)
  code      Link to the source (optional)
  image     Screenshot in assets/projects/ (optional, 1280×800 looks best)
  featured  true shows it large at the top
*/
window.PROJECTS = [
  {
    name: "Tally",
    date: "2026-10-26",
    kind: "Web app",
    summary: "A shared-expenses app for trips, flatmates and dinner clubs. A free alternative to Splitwise with no daily limits, ads or sign-up.",
    points: [
      "Type “Tacos 45 with Alex and Sam” and the whole expense fills itself in",
      "Splits equally, by exact amounts, percentages or shares; settles up in the fewest payments",
      "Recurring bills, receipt photos, UPI/Venmo/PayPal pay links and spending insights",
      "32 end-to-end browser tests, including two phones syncing a shared group"
    ],
    stack: ["JavaScript", "HTML", "CSS", "Playwright", "GitHub Pages"],
    live: "https://arjunreddy91100.github.io/Tally-App/",
    code: "https://github.com/arjunreddy91100/Tally-App",
    image: "assets/projects/tally.jpg",
    featured: true
  },
  {
    name: "Multimodal AI Assistant for Telegram",
    date: null,
    kind: "AI agent",
    summary: "A Telegram assistant that understands text and voice messages, works out what you’re asking, and answers with summaries or live information.",
    points: [
      "Whisper turns voice notes into text",
      "GPT-4 routes each request by intent",
      "Perplexity API pulls in real-time answers"
    ],
    stack: ["n8n", "OpenAI GPT-4", "Whisper", "Perplexity API", "REST APIs"]
  },
  {
    name: "Daily News Intelligence Agent",
    date: null,
    kind: "AI agent",
    summary: "A scheduled agent that collects the day’s news through APIs and posts short GPT-4 summaries to a Discord channel every morning.",
    stack: ["n8n", "OpenAI GPT-4", "News APIs", "Discord"]
  },
  {
    name: "Context-Aware AI Chatbot",
    date: null,
    kind: "AI chatbot",
    summary: "A chatbot that remembers the conversation and answers questions about files you upload, with research-backed responses.",
    stack: ["n8n", "OpenAI", "File uploads", "Retrieval"]
  }
];
