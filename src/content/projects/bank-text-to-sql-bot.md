---
title: Bank Text-to-SQL Bot
status: Local LLM
category: AI + Data Engineering
summary: Ask a bank's customer database questions in plain English and get exact answers. A local LLM writes the SQL; the database does the math, so numbers are never hallucinated. Private fields are masked before they reach the model.
stats: 41,188 customers · read-only queries · runs fully offline
tech: [Python, SQL, SQLite, Ollama, Qwen 2.5 Coder]
repo: https://github.com/arjunreddy91100/bank-text-to-sql-bot
featured: true
order: 1
headline: A bank chatbot that writes the SQL, never the numbers
pitch: Plain-English questions over 41,188 customer records, answered by a local LLM that only translates. The database does every count, private fields are masked before the model sees them, and nothing leaves the machine.
terminal:
  context: ~/projects/bank-text-to-sql-bot · qwen2.5-coder:7b · local
  question: How many customers have a personal loan?
  code: SELECT COUNT(*) FROM customers WHERE personal_loan = 'yes'
  answer: 6248 customers have a personal loan.
  check: counted by the database, not the model
---

The bot answers questions about a bank's customer database in plain English, with no hallucinated numbers. It runs on a local model, `qwen2.5-coder:7b`, served by Ollama on my own PC: no API key, no cloud, no cost, and customer data never leaves the machine.

```
Question: How many customers have a personal loan?
SQL     : SELECT COUNT(*) FROM customers WHERE personal_loan = 'yes'
Answer  : 6248 customers have a personal loan.
```

## The main design decision: the model never counts

The LLM is used twice per question, and only to translate:

1. **English to SQL.** It reads the question plus a map of the table and writes one SQL query.
2. **Result to English.** It turns the database's result into one short sentence.

Every count, average and total comes from the database. That split is what keeps the numbers honest.

| Piece | Role | Good at | Bad at |
| --- | --- | --- | --- |
| `bank.db` (SQLite) | Stores 41,188 customers | Exact counting | Understanding English |
| LLM (`qwen2.5-coder:7b`) | Translator | Understanding English, writing SQL | Counting |
| Python | Connects the two | Glue, masking, testing | |

## One question, start to finish

1. The user types "How many customers have a personal loan?"
2. Python sends the LLM the instructions, a map of the table and the question.
3. The LLM replies with `SELECT COUNT(*) FROM customers WHERE personal_loan = 'yes'`.
4. Python runs that SQL on `bank.db` over a read-only connection, and the database counts 6248.
5. Python sends 6248 back to the LLM to explain in one sentence.
6. The user sees "6248 customers have a personal loan."

**The table map is what makes the SQL accurate.** Python sends every column name, its type and its allowed values, for example `personal_loan (TEXT) allowed values: ['no', 'yes', 'unknown']`. Without it, the model might write `'Yes'` with a capital Y and match nothing.

## Choosing the model

I compared the models I had installed:

| Model | Decision |
| --- | --- |
| `gemma3:270m` | Too small to write SQL reliably |
| `phi3` | General-purpose, weaker at code |
| `gpt-oss:120b-cloud` | Strong, but runs on Ollama's servers, so customer data would leave the machine |
| **`qwen2.5-coder:7b`** | **Chosen:** code-specialized, fully local |

It runs at temperature `0` for consistent SQL, through Ollama's OpenAI-compatible API. Moving to a cloud model such as Azure OpenAI later is a three-line change.

## Safety and accuracy

- **No AI arithmetic.** Totals come from `SELECT COUNT(*)` on the database, never from the model counting rows.
- **Private data masked** before it is shown *or sent to the LLM*: last names become `J.`, emails `r***@example.com`, account numbers `******9190`. Masking checks both column names and value patterns, so a renamed column (`account_number AS acct`) is still caught.
- **Read-only database connection.** If the model ever wrote `DELETE`, SQLite would refuse.
- **Local model.** Customer data is never sent to an outside service.

## A bug the tests caught

The first version passed 8 of 8 counting questions. Then a list question exposed a hallucination:

| | Before | After |
| --- | --- | --- |
| "Show me the customers with a personal loan" | "There are **22** customers" | "There are **6248** customers" |
| Who counted | The LLM, from a 20-row sample | The database, all rows |
| Account number shown | `3410529190` | `******9190` |

**Cause:** the LLM saw only 20 sample rows and counted them itself.
**Fix:** the database counts the full result with `SELECT COUNT(*) FROM (<query>)`, the LLM is told to use that number and never count on its own, and private fields are masked before the LLM sees them.

## Results

Tested on Windows with Python 3.13.1 and `qwen2.5-coder:7b` on Ollama.

| Test | What it checks | Score |
| --- | --- | --- |
| Counting test | 8 counting questions against a ground-truth answer key | **8/8** |
| Privacy test | 3 list questions: correct total and no leaked private data | **3/3** |

## The data

Customer attributes come from the [Bank Marketing dataset](https://archive.ics.uci.edu/dataset/222/bank+marketing) (Moro et al., 2014, UCI Machine Learning Repository). Names, emails, account numbers and the routing number are synthetic: names from the Faker library, emails on the reserved `example.com` domain, and a routing number that deliberately fails the ABA checksum.

## What's next

- Refuse off-topic or unanswerable questions instead of guessing
- Add policy documents and route each question to SQL or to document search (RAG)
- A simple web chat interface
