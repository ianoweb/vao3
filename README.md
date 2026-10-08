# Vao Cornerstone Financial Advisory – website

Frontend-only React + Vite + Tailwind site. No backend, database or environment variables needed.

## Run it on Windows

1. Install Node.js LTS (20.19 or newer) from https://nodejs.org
   or in PowerShell: `winget install OpenJS.NodeJS.LTS`
2. Close and reopen PowerShell / VS Code so `node` and `npm` are on PATH.
3. Either double-click **start.bat**, or in PowerShell from this folder:

   ```powershell
   npm install
   npm run dev
   ```

   The site opens at http://localhost:5173

## Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check and build into `dist\` (or double-click **build.bat**) |
| `npm run preview` | Serve the built site at http://localhost:4173 |
| `npm run typecheck` | TypeScript check only |

## Absolute sitemap URLs (optional)

Before building, set your real domain (HTTPS) so `dist\sitemap.xml` and `dist\robots.txt` get absolute URLs:

```powershell
$env:VITE_SITE_URL = "https://your-domain.com"
npm run build
```

Or put `VITE_SITE_URL=https://your-domain.com` in a file named `.env.production`.

## Troubleshooting

- **`Could not resolve ./scripts/...`**: not applicable any more; `vite.config.ts` is self-contained. If you copied files over an older folder, delete the old folder's `vite.config.ts`/`package.json` first or extract this zip into a fresh folder.
- **`npm` is not recognized**: Node isn't installed or the terminal was opened before installing. Reopen it.
- **Script blocked by execution policy**: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
- **Port 5173 already in use**: stop the other dev server, or change `port` in `vite.config.ts`.
- **Slow or odd install errors**: keep the project out of OneDrive (for example `C:\dev\Vao-Cornerstone-Website`); OneDrive tries to sync thousands of `node_modules` files.
- **Fonts look different offline**: headings and body use Google Fonts, so they need internet; fallbacks are built in.

## Changing the home-page picture

The hero picture is `public\hero-finance.jpg`. To swap it, replace that file (keep the same name) or change the file name in the `<img src={asset('hero-finance.jpg')}>` line in `src\App.tsx`.

## Deploying

The site is a static Vite build (`npm run build` -> `dist\`).

**Vercel**: import the repo; `vercel.json` already sets the build command and output folder. No environment variables are required. The sitemap picks up your Vercel production domain automatically (or set `VITE_SITE_URL`).

**GitHub Pages**: in the repo go to Settings > Pages and set Source to **GitHub Actions**. The workflow in `.github\workflows\deploy.yml` builds and publishes on every push to `main` at `https://<user>.github.io/<repo>/`. Do not use "Deploy from a branch": that serves the source files, which is why the page appears blank. For a custom domain, set `VITE_BASE` to `/` in the workflow.

**Building for a sub-path locally (PowerShell)**:

```powershell
$env:VITE_BASE = "/vao/"
npm run build
```

Commit `package-lock.json` (created by `npm install`) so every host installs the same versions.
