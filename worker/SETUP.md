# Rani AI — Setup Guide

## What you need (all free, no credit card)

1. **Google account** — to get the Gemini API key
2. **Cloudflare account** — to deploy the Worker proxy

---

## Step 1 — Get your free Gemini API key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **Create API key**
4. Copy the key — you'll need it in Step 3

---

## Step 2 — Create a free Cloudflare account

1. Go to https://cloudflare.com and sign up (free plan is fine)
2. No credit card required

---

## Step 3 — Deploy the Worker

Open your terminal and run these commands from the project root:

```bash
# Install Wrangler (Cloudflare's CLI tool)
npm install -g wrangler

# Login to your Cloudflare account
cd worker
npx wrangler login

# Deploy the Worker
npx wrangler deploy

# Add your Gemini API key as a secret (it stays encrypted, never in code)
npx wrangler secret put GEMINI_API_KEY
# Paste your Gemini key when prompted, then press Enter
```

After deploying, Wrangler will print a URL like:
```
https://rani-chatbot.YOUR-SUBDOMAIN.workers.dev
```

---

## Step 4 — Connect the chatbot

1. Open `.env.local` in the project root
2. Paste your Worker URL:
   ```
   VITE_WORKER_URL=https://rani-chatbot.YOUR-SUBDOMAIN.workers.dev
   ```
3. Restart the dev server (`npm run dev`)

That's it — Rani is now powered by Gemini AI.

---

## Rate limiting & security

The Worker already includes:
- **15 requests per IP per minute** — prevents individual abuse
- **API key never exposed** — lives only in Cloudflare's encrypted env
- **Input validation** — max 600 chars, sanitized before hitting Gemini
- **Gemini free tier limits** — 15 RPM / 1M tokens per day (more than enough)
- **Safety filters** — Gemini's built-in content moderation is enabled

### Going live (production)

When deploying to the real domain, open `worker/index.js` and change:
```js
'Access-Control-Allow-Origin': '*'
```
to:
```js
'Access-Control-Allow-Origin': 'https://sreeindiapalace.com'
```
This ensures the API key proxy only responds to your website, not anyone else.
