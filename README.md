# Indian Infotech Website

Website for Indian Infotech, featuring workforce and access-control solutions, industry pages, product information, resources, and enquiry flows.

## Requirements

- Node.js 22.13 or newer
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the local development server on port 3001:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Available commands

```bash
npm run dev             # Start the development server
npm run build           # Create a production build
npm run start           # Serve the production build
npm run lint            # Check TypeScript
npm run check:security  # Run security tests
```

## Project structure

- `app/` - Pages, layouts, metadata, and route handlers
- `components/` - Reusable UI and product components
- `public/` - Static images and other public assets
- `lib/` - Shared utilities and security helpers
- `tests/` - Automated security tests

## Production build

Use `website/` as the deployment root. Keep `app/`, `components/`, `lib/`,
`public/`, `proxy.ts`, the Next.js and TypeScript configuration, `package.json`,
`package-lock.json`, and `vercel.json`. Configure environment values using
`.env.example`; do not upload local environment files.

The attendance automation page reads HTML and CSS from `public/easytime/`
at runtime, so that directory is required. The separate `studio/` project
is the CMS editor and is maintained independently.

Run the checks and build before deployment:

```bash
npm run lint
npm run check:security
npm run build
```

## License

This project is private and maintained for Indian Infotech.
