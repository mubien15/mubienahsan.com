/**
 * Renders the printable routes under /print into the PDFs in public/research.
 *
 * The point is that the downloads are derived, not authored. Both documents
 * read src/content/autonomy.ts, the same file the site reads, so correcting
 * the framework and re-running this is the whole update path. Nobody has to
 * remember that a PDF exists saying something different, and the binaries in
 * public/research are reproducible rather than mysterious.
 *
 *   npm run build && npm run pdfs
 *
 * Needs a production build on disk: it serves that build, prints from it, and
 * shuts the server down again.
 *
 * Chromium comes from `npx playwright install chromium`. Set PDF_CHROMIUM to
 * an executable to use a browser the image already ships instead — CI images
 * and sandboxes often carry one whose build number does not match the
 * Playwright release, which otherwise fails to launch.
 */

import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const require = createRequire(import.meta.url);

const PORT = Number(process.env.PDF_PORT ?? 4317);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const OUT_DIR = path.resolve("public/research");

const DOCS = [
  {
    route: "/print/autonomy-matrix",
    file: "ai-autonomy-governance-matrix.pdf",
    label: "The AI Autonomy Governance Matrix",
  },
  {
    route: "/print/oversight-assessment",
    file: "meaningful-human-oversight-assessment.pdf",
    label: "Meaningful Human Oversight assessment template",
  },
  {
    route: "/print/oversight-threshold-paper",
    file: "the-oversight-threshold-paper.pdf",
    label: "The Oversight Threshold — research paper",
  },
];

/** A footer Chromium draws on every sheet, so a stray page stays traceable. */
const FOOTER = `
  <div style="width:100%;font-family:system-ui,sans-serif;font-size:7.5pt;
              color:#6f6350;padding:0 14mm;display:flex;
              justify-content:space-between;">
    <span>The Oversight Threshold · mubienahsan.com/research/autonomy-governance</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;

async function waitForServer(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // not listening yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

async function main() {
  try {
    await stat(".next/BUILD_ID");
  } catch {
    throw new Error("No production build found. Run `npm run build` first.");
  }

  await mkdir(OUT_DIR, { recursive: true });

  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "ignore", "inherit"],
  });

  let browser;
  try {
    await waitForServer(`${ORIGIN}/print/autonomy-matrix`);

    const { chromium } = require("playwright");
    browser = await chromium.launch(
      process.env.PDF_CHROMIUM ? { executablePath: process.env.PDF_CHROMIUM } : {}
    );
    const page = await browser.newPage();

    for (const doc of DOCS) {
      const res = await page.goto(`${ORIGIN}${doc.route}`, {
        // This server never reaches networkidle, so wait on the document and
        // then on fonts — webfonts are what actually shift a print layout.
        waitUntil: "domcontentloaded",
      });
      if (!res || res.status() !== 200) {
        throw new Error(`${doc.route} returned ${res ? res.status() : "no response"}`);
      }
      await page.evaluate(() => document.fonts.ready.then(() => true));
      await page.emulateMedia({ media: "print" });

      const out = path.join(OUT_DIR, doc.file);
      await page.pdf({
        path: out,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: true,
        headerTemplate: "<span></span>",
        footerTemplate: FOOTER,
      });
      console.log(`  ✓ ${doc.label}\n    → public/research/${doc.file}`);
    }
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(`\n  ✗ ${err.message}\n`);
  process.exitCode = 1;
});
