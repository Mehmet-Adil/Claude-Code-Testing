# Ember & Bean ☕

A fictional coffee shop website built with [Next.js](https://nextjs.org) (App Router), React and TypeScript.

## Features
- Product catalog with roast-level filters (light / medium / dark)
- Cart drawer with quantity controls, a free-shipping threshold, and items saved in `localStorage`
- Responsive layout with a mobile menu
- Pure-CSS illustrations (coffee cup, beans, bags), so no image files are needed
- Demo checkout and newsletter signup (nothing is actually sold or sent)

## Getting started
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Project structure
```
app/
  layout.tsx       # fonts, metadata, global CSS
  page.tsx         # assembles the homepage
  globals.css      # all styles
components/        # Header, Hero, Shop, CartDrawer, etc.
  CartProvider.tsx # cart state (React context) + toast
lib/
  products.ts      # fictional product catalog and pricing helpers
```

## Deploy
The easiest option is [Vercel](https://vercel.com/new). Import the GitHub repo and it deploys automatically.

## Disclaimer
Ember & Bean is not a real business. This is a demo project.
