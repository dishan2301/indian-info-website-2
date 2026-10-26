# Indian Infotech standalone Studio

This branch includes the existing Studio schemas, with shared editorial validation.
It targets `rmgfsayz/production`. It is not embedded in or deployed by Next.js.

Run `npm ci`, `npm run dev`, or `npm run build` inside this directory. Deploy this
Studio only as an explicitly reviewed Studio release; pushing the website Preview
branch does not deploy Studio validation. No existing document is migrated.

All three article types share required title, unique slug, summary, body and
ISO publication date validation. Slugs are unique across editorial types and
cannot claim the five original static URLs. The date initializes to the current
ISO instant. Future dates intentionally schedule visibility. Hero image, author
and category remain optional; image alt text is required when adding an image.

Use semantic Normal/Heading 2/Heading 3/Bold/Italic/List formatting. Typography is
owned by the website's shared ArticleBody and needs no per-post code changes.
