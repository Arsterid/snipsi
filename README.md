# SnipSI

**Same video. Cleaner link.**

SnipSI is a tiny, friendly tool that spots the extra `si` parameter in YouTube share links and helps remove it with a short, playful animation.

## What it does

- Accepts regular, unencoded YouTube URLs.
- Removes the `si` query parameter while preserving other query parameters and their order.
- Explains what the parameter is and why a cleaner link may be preferable.
- Uses a magnifying glass and animated scissors to make the process memorable.
- Automatically selects English or Russian based on the visitor's browser language preferences, with English as the fallback.
- Runs entirely in the browser and requires no backend.

The exact purpose of YouTube's `si` parameter is not fully documented publicly. SnipSI does not make claims about tracking or security risks; it simply helps remove an additional sharing parameter when appropriate.

## Usage

Append `#` followed by the original YouTube URL to the SnipSI website address.

Example:

`https://<owner>.github.io/snipsi/#https://youtu.be/VIDEO_ID?si=SHARE_ID&t=42`

Use the original URL as copied from YouTube. Do not encode it manually.

The source URL is carried in the browser's URL fragment and processed client-side. URL fragments are not included in the HTTP request sent to GitHub Pages.

## Development

The project uses Next.js, React, TypeScript, Tailwind CSS v4, and Vitest.

To start developing, open the repository in VS Code and reopen it in the Dev Container. Then run:

- `npm ci` — install the locked dependencies.
- `npm run dev` — start the development server.
- `npm test` — run unit tests.
- `npm run lint` — run ESLint.
- `npm run typecheck` — check TypeScript types.
- `npm run build` — create the static export in `out/`.

## Deployment

The site is deployed to GitHub Pages using GitHub Actions. Every push to `main` triggers linting, tests, type checking, a production build, and deployment of the static export.

The repository must use GitHub Actions as its Pages publishing source. The expected project URL is `https://<owner>.github.io/snipsi/`.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
