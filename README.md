# Loud Take — Creator Distribution Agency for Consumer Apps

Turnkey network of US creators and AI avatars that posts every day on TikTok, Reels, and Shorts.

## Core Value Proposition
- **Hero:** Get in front of people. Without managing a single creator.
- **Proof:** 601K Organic Views | $1.80 Average CPM | 13 Creators Managed | 30 Days to start and warm up
- **Operating Model:** Real creators test hooks → Data picks the winners → AI avatars multiply them

## Site Architecture
- `index.html`: High-conversion homepage with Proof Bar, Problem Section, 3-Step Flywheel, 601K Case Study, FAQ accordion, Final CTA, and sticky mobile "Book a call" action.
- `pricing.html`: Gated transparent monthly volume plans ($3,167 / $4,667 / $7,667 / Custom) with FormSubmit email lead capture (`sdsurya7276@gmail.com`) and instant localStorage unlock.
- `styles.css`: Mobile-first responsive styling with warm ivory (`#F4F1EA`) + black sections + Bodoni/Didot serif display + Inter clean sans.
- `script.js`: Centralized `BOOK_URL` constant for all booking CTAs, FAQ accordion logic, smooth scrolling, and pricing form gating.

## Local Development
Run a local static server:
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000`.
