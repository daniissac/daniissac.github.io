# daniissac.com

The source for [daniissac.com](https://daniissac.com), a technical publication and project hub focused on networks, observability, technical learning, and practical tools.

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

## Content

- Writing: `src/data/writing/`
- Project case studies: `src/data/projects/`
- Shared site copy: `src/config.ts`
- Public assets: `public/`

## Verification

```bash
npm test
```

The production build is written to `dist/`. GitHub Actions publishes `main` to GitHub Pages while preserving the custom domain.
