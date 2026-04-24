# Le Anh Duc Portfolio

Personal portfolio for a senior data engineer working on cloud data platforms, lakehouse systems, and applied AI research.

The site is intentionally concise: CV, selected work, resume, publications, and a small wiki/notebook for technical writing.

## Stack

- Vite + React 18
- React Router
- Liquid glass UI via `@liquidglass/react` plus local cursor/refraction effects
- Markdown, GFM, and KaTeX rendering
- Express 5 API
- MongoDB + Mongoose 8
- Zod validation
- Helmet, CORS, compression, Morgan

## Design Notes

- Dark neutral base with cool cyan/blue/green refraction.
- Liquid glass surfaces must preserve text contrast.
- Main content is row/archive based, not product landing page sections.
- Copy should remain factual and restrained.

## Frontend

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:3000`.

Production build:

```bash
npm run build
```

## Backend

```bash
cd Server
cp .env.example .env
npm install
npm run dev
```

The backend runs at `http://localhost:3600`.

Required for persistence:

```bash
MONGODB_URI=mongodb://localhost:27017/portfolio
BLOG_ADMIN_TOKEN=replace-with-a-long-random-token
```

When `MONGODB_URI` is missing, the content API returns `503` quickly and the frontend uses local fallback entries.

## Content API

Read endpoints:

- `GET /api/content`
- `GET /api/content/:slug`
- `GET /api/content?type=wiki`
- `GET /api/content?tag=aws`
- `GET /api/content?parentSlug=data-platforms`

Legacy aliases:

- `GET /api/blogs`
- `GET /api/blogs/:slug`

Protected write endpoints require `x-blog-admin-token`:

- `POST /api/content`
- `PUT /api/content/:slug`
- `PATCH /api/content/:slug`
- `DELETE /api/content/:slug`

Supported content types:

- `wiki`
- `blog`
- `note`
- `project-doc`
- `research`
- `changelog`

Supported source formats:

- `markdown`
- `latex`
- `plaintext`

Example payload:

```json
{
  "title": "Designing Cloud Data Products",
  "slug": "designing-cloud-data-products",
  "type": "wiki",
  "sourceFormat": "markdown",
  "excerpt": "A practical note about production-grade data products.",
  "body": "## First section\n\nMarkdown, LaTeX math like $y = mx + b$, tables, and code blocks are supported.",
  "tags": ["Data Engineering", "AWS"],
  "parentSlug": "data-platforms",
  "relatedSlugs": ["observability-checklist"],
  "readingTime": "5 min read",
  "publishedAt": "2026-01-15T00:00:00.000Z",
  "isPublished": true
}
```

## Current CV

Current PDF:

- `LeAnhDuc_CV_Sep_2025_2.pdf`

Public resume link:

- `/LeAnhDuc_CV_Sep_2025_2.pdf`

## Agent Handoff

See [agent.md](./agent.md) before continuing design or architecture work.
