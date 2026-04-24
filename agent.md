# Agent Notes

## Current Goal

This repository is being modernized into a focused personal portfolio for Le Anh Duc, a senior data engineer based in Hanoi. The site should feel concise, technical, readable, and modern. Avoid product-landing-page language and avoid braggy copy.

## Positioning

Use restrained, factual wording:

- Senior Data Engineer, Techcombank
- PhD candidate focused on AI in healthcare
- Work areas: ETL/ELT, CDC, backfills, AWS Data Lake, Databricks Lakehouse, Spark, Airflow, Kafka, Python, Scala, SQL
- Research areas: Raman spectroscopy, glucose-level classification, machine learning, signal processing

Avoid overclaiming. Do not use language like "world-class", "revolutionary", "10x", "stunning", or excessive marketing claims.

## Design Direction

The visual direction is Apple's 2026 liquid-glass trend, but it must remain readable and professional.

Important constraints:

- Glass surfaces must have dark inner content layers when text is inside them.
- Text on glass must be light and high contrast.
- Do not use white/bright glass panels with white text.
- Keep the palette consistent: dark neutral base, cool blue/cyan/green refraction, restrained warm amber accents.
- Prefer concise sections and archive-like rows over large marketing cards.
- Animation should be subtle and useful: cursor highlights, chromatic edge refraction, soft reveal, not distracting motion.

## Glass Implementation

Current stack:

- `@liquidglass/react` is used through `src/components/Glass/LiquidGlassSurface.js`.
- `src/hooks/useLiquidGlass.js` adds cursor-following highlights, subtle tilt, shimmer, and ambient light.
- Text-heavy cards such as `AboutCard` should use the local `.liquid-glass` CSS treatment instead of the `@liquidglass/react` wrapper. The wrapper forces `height: 100%` inline and can overlap/break inside content-flow layouts.
- `@specy/liquid-glass-react` was tested and removed because it washed out the profile panel and hurt legibility. Do not reintroduce it unless the layout is redesigned around its capture/render behavior.

The main CSS corrections live near the end of `src/style.css` under:

- `/* Liquid glass pass: ambient, compact, readable */`
- `/* Readable chromatic glass correction */`

## Content Architecture

The old "blog" concept has been generalized into a wiki/content system:

- Frontend route: `/blog`, `/blog/:slug`
- API route: `/api/content`
- Supported types: `wiki`, `blog`, `note`, `project-doc`, `research`, `changelog`
- Supported source formats: `markdown`, `latex`, `plaintext`
- Local fallback entries live in `src/data/blogPosts.js`
- API helpers live in `src/lib/api.js`
- Content normalization lives in `src/lib/content.js`

MongoDB is optional during local dev. When `MONGODB_URI` is missing, the API returns fast `503` and the frontend falls back to local entries.

## Current CV

The current CV file is:

- `/Users/ducle/lab/portfolio/LeAnhDuc_CV_Sep_2025_2.pdf`

It has been copied to:

- `public/LeAnhDuc_CV_Sep_2025_2.pdf`

Use this for resume links.

## Commands

Frontend:

```bash
npm install
npm run dev
npm run build
```

Backend:

```bash
cd Server
cp .env.example .env
npm install
npm run dev
```

Dev URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3600`

## Known Risks

- CSS has accumulated several iterative overrides. Prefer consolidating `src/style.css` in a future cleanup, but avoid doing a huge rewrite unless the visual output is checked.
- Liquid glass effects can easily reduce contrast. Always test profile/about/project/blog text on actual dark background.
- The `@liquidglass/react` component uses SVG/backdrop filters. Keep fallback CSS readable when filters are unsupported.
- Bundle size is larger because of Three.js, Markdown/KaTeX, and glass effects. Heavy visual libraries should be lazy-loaded or avoided.
