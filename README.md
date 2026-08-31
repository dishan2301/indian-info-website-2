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

Start the local development server on port 2000:

```bash
npm run dev -- --port 2000
```

Open [http://localhost:2000](http://localhost:2000) in your browser.

## Available commands

```bash
npm run dev             # Start the development server
npm run build           # Create a production build
npm run start           # Serve the production build
npm run lint            # Run ESLint
npm run check:security  # Run security tests
```

## Project structure

- `app/` - Pages, layouts, metadata, and route handlers
- `components/` - Reusable UI and product components
- `public/` - Static images and other public assets
- `lib/` - Shared utilities and security helpers
- `tests/` - Automated security tests

## Production build

Run the checks and build before deployment:

```bash
npm run lint
npm run check:security
npm run build
```

## License

This project is private and maintained for Indian Infotech.
