// Neon Dodger — entry for "The agent builds a game from one prompt"
// (make.fun bounty post-x-the-agent-builds-a-game-from-20261122-1709).
//
// The entry itself is the X post: a short video about an AI coding agent
// building the tiny browser game in game.html from a single prompt, ending
// with make.fun's referral end card. This program's only job is to hand the
// post's address to the grader: it copies POST.json from the repository root
// to /output/POST.json. Node 22, standard library only, no network, no wall
// clock, deterministic — the two runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate only accepts a JSON object naming an X post's address, so check
// the shape before copying: a bad POST.json should fail loudly here, not
// silently produce an invalid entry.
const raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
let post: unknown;
try {
  post = JSON.parse(raw);
} catch {
  console.error('POST.json is not valid JSON');
  process.exit(1);
}
if (
  typeof post !== 'object' ||
  post === null ||
  Array.isArray(post) ||
  typeof (post as { url?: unknown }).url !== 'string' ||
  !/^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+/.test(
    (post as { url: string }).url,
  )
) {
  console.error('POST.json must be {"url": "https://x.com/<handle>/status/<id>"}');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const src = join(BOT_DIR, 'POST.json');
const dst = join(OUTPUT_DIR, 'POST.json');
copyFileSync(src, dst);

// The two runs of an entry must write the same bytes, so verify the copy is
// byte-identical to the source instead of trusting the copy call.
const copied = readFileSync(dst);
if (!copied.equals(Buffer.from(raw, 'utf8'))) {
  console.error(`POST.json copy to ${dst} does not match the source byte for byte`);
  process.exit(1);
}
