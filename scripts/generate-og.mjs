// Generate og-default.png (1200x630) for social previews.
// Matches the dark editorial site palette.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const W = 1200;
const H = 630;
const bg = '#0a0a0b';
const ink = '#ededee';
const mute = '#a4a4ad';
const accent = '#e8dcc4';
const border = '#1f1f24';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g" cx="50%" cy="-10%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence baseFrequency="0.9" numOctaves="2" />
      <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.04 0"/>
    </filter>
  </defs>

  <!-- background -->
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" filter="url(#grain)"/>

  <!-- top hairline -->
  <line x1="80" y1="80" x2="${W - 80}" y2="80" stroke="${border}" stroke-width="1"/>

  <!-- top label row -->
  <text x="80" y="60" font-family="ui-monospace, monospace" font-size="14"
        letter-spacing="3" fill="${mute}" text-transform="uppercase">
    PORTFOLIO · 2022 — 2025
  </text>
  <text x="${W - 80}" y="60" font-family="ui-monospace, monospace" font-size="14"
        letter-spacing="3" fill="${mute}" text-anchor="end">
    HONG KONG · GMT+8
  </text>

  <!-- accent mark (italic "a") -->
  <text x="80" y="320" font-family="ui-serif, Georgia, serif" font-style="italic"
        font-size="180" font-weight="500" fill="${accent}">
    a
  </text>
  <text x="80" y="320" font-family="ui-serif, Georgia, serif" font-style="italic"
        font-size="180" font-weight="500" fill="${accent}" dx="120">
    L
  </text>

  <!-- name -->
  <text x="80" y="430" font-family="ui-sans-serif, system-ui, sans-serif"
        font-size="84" font-weight="500" fill="${ink}">
    Adrian Law
  </text>

  <!-- tagline -->
  <text x="80" y="490" font-family="ui-sans-serif, system-ui, sans-serif"
        font-size="28" font-weight="400" fill="${mute}">
    Artist &amp; developer — game design, illustration, generative AI
  </text>

  <!-- bottom hairline + footer -->
  <line x1="80" y1="${H - 80}" x2="${W - 80}" y2="${H - 80}" stroke="${border}" stroke-width="1"/>
  <text x="80" y="${H - 50}" font-family="ui-monospace, monospace" font-size="14"
        letter-spacing="3" fill="${mute}">
    o0aL0o.github.io
  </text>
  <text x="${W - 80}" y="${H - 50}" font-family="ui-monospace, monospace" font-size="14"
        letter-spacing="3" fill="${mute}" text-anchor="end">
    adrianlaw1127@gmail.com
  </text>
</svg>
`;

const outDir = path.resolve('public/images');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'og-default.png');

await sharp(Buffer.from(svg))
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outPath);

const { size } = fs.statSync(outPath);
console.log(`✓ Wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
