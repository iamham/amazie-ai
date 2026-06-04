# Amazie AI

Amazie is an agentic e-commerce chatbot for [Amaze](https://www.amaze.shop). It uses
Google Gemini 2.5 Flash with a `searchProducts` tool that queries an embedded catalog
of ~4,400 Amaze products. The assistant is guardrailed to answer only product- and
shopping-related questions about Amaze.

This repository was reverse-engineered from a production bundle and re-architected
to run on [Vercel](https://vercel.com).

## Stack

- **React 19** + **TypeScript** + **Vite** (client)
- **Vercel Functions** (Node runtime) — `api/chat.ts` owns the Gemini call and the
  product catalog; the API key never reaches the browser
- **@google/genai** — Gemini 2.5 Flash with function calling
- **Tailwind CSS** (via CDN — see `index.html`)

## Project layout

```
api/
  chat.ts                – Vercel Function: Gemini orchestration + tool routing
src/
  App.tsx                – top-level layout
  main.tsx               – React entry
  index.css              – global styles
  types.ts               – Role enum, Product, ChatMessage, GeminiReply
  components/
    Chatbot.tsx          – chat UI
    ProductCard.tsx      – product result card
  services/
    geminiService.ts     – thin fetch client for /api/chat (no SDK in browser)
  data/
    products.ts          – embedded Amaze catalog (~4,400 items, server-only)
    productSearch.ts     – searchProducts tool implementation
vercel.json              – Vercel build + headers config
```

## Local development

```bash
npm install
cp .env.example .env
# put your key from https://aistudio.google.com into GEMINI_API_KEY
npm run dev   # runs `vercel dev` so /api/chat works locally
```

`vercel dev` will route `/api/chat` through `api/chat.ts` exactly the way production
does.

## Deploying to Vercel

The repo is already wired up to deploy automatically on every push to `main` via the
Vercel ↔ GitHub integration. The only manual step is the API key:

1. Open the project in the Vercel dashboard.
2. **Settings → Environment Variables** → add `GEMINI_API_KEY` for Production
   (and Preview, if you want PRs to work).
3. Push to `main`. Vercel builds and deploys.

To deploy manually from your machine:

```bash
npm run deploy   # vercel --prod
```

## Guardrails

`api/chat.ts` ships a system prompt that:

- restricts the assistant to Amaze products / shopping / Amaze-relevant recipes,
- refuses prompt-injection ("ignore previous instructions"), code generation, and
  off-topic requests (medical, legal, financial, politics, adult content),
- forbids the model from inventing SKUs, prices, or stock that aren't returned by
  the `searchProducts` tool,
- enforces THB pricing and bilingual (Thai / English) replies.

The tool layer in the same file calls `searchProducts()` from
`src/data/productSearch.ts`, which only ever returns rows from the embedded catalog
— the model cannot reach any other data source.

## Security model

- The browser only ever calls `/api/chat`. It does not import `@google/genai` and
  does not see `GEMINI_API_KEY`.
- `GEMINI_API_KEY` is a Vercel project env var (server-side only), read inside the
  Node Function.
- The product catalog ships only with the function bundle, not with the client.
- `vercel.json` sets `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  a strict `Referrer-Policy`, and a tight `Permissions-Policy`.

See `REPORT.md` for the full reverse-engineering write-up.
