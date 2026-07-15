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
- Project overviews: `src/data/projects/`
- Shared site copy: `src/config.ts`
- Public assets: `public/`

## Publishing an article

Create a draft with a consistent filename, frontmatter, and network-focused outline:

```bash
npm run new:article -- "How DNS Resolution Actually Works"
```

The command prints the generated file and its local preview path. Drafts are available by direct URL during local
development, but they are excluded from production pages, RSS, the sitemap, and `llms.txt`.

1. Frame one reader question and define the practical outcome.
2. Develop the explanation around observable evidence, a useful mental model, practical checks, and known limits.
3. Keep `draft: true` while writing and preview with `npm run dev`.
4. Replace every placeholder, verify links, commands, code, citations, and image alt text.
5. Set `publishedDate` to the release date and change `draft` to `false`.
6. Run `npm test`, open a pull request, and merge after the build passes.
7. Publish a shorter LinkedIn version that links back to the site as the canonical article.

## Verification

```bash
npm test
```

The production build is written to `dist/`. GitHub Actions publishes `main` to GitHub Pages while preserving the custom domain.
