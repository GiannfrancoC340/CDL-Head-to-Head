/**
 * Fetches CDL match data from the Liquipedia MediaWiki API and writes it to
 * src/data/matches.ts.
 *
 * Usage: node scripts/fetchMatches.js
 *
 * Rate limit: parse actions must not exceed 1 req / 30s per Liquipedia's ToS.
 * With ~10 pages this takes roughly 5 minutes to run.
 */

import { writeFileSync } from 'fs';
import { setTimeout as sleep } from 'timers/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_BASE = 'https://liquipedia.net/callofduty/api.php';
// Replace with your own contact info
const USER_AGENT = 'CDL-H2H-App/1.0 (educational project; flameshock340@gmail.com)';

// ── Team code mapping: Liquipedia template code → our team ID ──────────────
const TEAM_MAP = {
  // Season 6 (2025)
  optx: 'opt',
  tx: 'opt',           // OpTic Texas alternate code
  'optic-texas': 'opt',
  mia: 'mia',
  heretics: 'mia',
  lat: 'lat',
  thieves: 'lat',
  atl: 'atl',
  faze: 'atl',
  'atlanta-faze': 'atl',
  bos: 'bos',
  breach: 'bos',
  'boston-breach': 'bos',
  car: 'car',
  ravens: 'car',
  'carolina-royal-ravens': 'car',
  c9ny: 'c9ny',
  'cloud9-new-york': 'c9ny',
  van: 'van',
  surge: 'van',
  'vancouver-surge': 'van',
  sea: 'van',
  lvf: 'lvf',
  vf: 'lvf',           // Las Vegas Falcons alternate code
  falcons: 'lvf',
  'las-vegas-falcons': 'lvf',
  lagm: 'lagm',
  lag: 'lagm',
  'los-angeles-guerrillas': 'lagm',
  'm8': 'lagm',
  rokkr: 'min25',
  'minnesota-rokkr': 'min25',
  ultra: 'tor25',
  'toronto-ultra': 'tor25',
  // Season 7 (2026)
  fzv: 'fzv',
  fazv: 'fzv',
  fv: 'fzv',           // FaZe Vegas alternate code
  'faze-vegas': 'fzv',
  ryd: 'ryd',
  riy: 'ryd',          // Riyadh Falcons alternate code
  'riyadh-falcons': 'ryd',
  par: 'par',
  pgm: 'par',          // Paris Gentlemates alternate code
  pm8: 'par',          // Paris M8 alternate code
  'paris-gentlemates': 'par',
  g2mn: 'g2mn',
  g2: 'g2mn',
  'g2-minnesota': 'g2mn',
  tkoi: 'tkoi',
  koi: 'tkoi',
  'toronto-koi': 'tkoi',
};

// Some codes mean different teams depending on the season
function getTeamId(code, season) {
  if (code === 'tor') return season === 2025 ? 'tor25' : 'tkoi';
  if (code === 'min') return season === 2025 ? 'min25' : 'g2mn';
  return TEAM_MAP[code];
}

const MODE_MAP = {
  hp: 'Hardpoint',
  snd: 'Search & Destroy',
  con: 'Control',
  ctrl: 'Control',
  ol: 'Overload',
  ovl: 'Overload',
  overload: 'Overload',
};

// ── Tournament pages to fetch ───────────────────────────────────────────────
const PAGES = [
  // Season 6 (BO6, 2025)
  { page: 'Call_of_Duty_League/Season_6/Stage_1/Major', event: 'Stage 1 Major', season: 2025, game: 'BO6' },
  { page: 'Call_of_Duty_League/Season_6/Stage_2/Major', event: 'Stage 2 Major', season: 2025, game: 'BO6' },
  { page: 'Call_of_Duty_League/Season_6/Stage_3/Major', event: 'Stage 3 Major', season: 2025, game: 'BO6' },
  { page: 'Call_of_Duty_League/Season_6/Stage_4/Major', event: 'Stage 4 Major', season: 2025, game: 'BO6' },
  { page: 'Call_of_Duty_League/Season_6/Playoffs',      event: 'Champs',        season: 2025, game: 'BO6' },
  // Season 7 (BO7, 2026)
  { page: 'Call_of_Duty_League/Season_7/Stage_1/Major', event: 'Stage 1 Major', season: 2026, game: 'BO7' },
  { page: 'Call_of_Duty_League/Season_7/Stage_2/Major', event: 'Stage 2 Major', season: 2026, game: 'BO7' },
  { page: 'Call_of_Duty_League/Season_7/Stage_3/Major', event: 'Stage 3 Major', season: 2026, game: 'BO7' },
  { page: 'Call_of_Duty_League/Season_7/Stage_4/Major', event: 'Stage 4 Major', season: 2026, game: 'BO7' },
  { page: 'Call_of_Duty_League/Season_7/Playoffs',      event: 'Champs',        season: 2026, game: 'BO7' },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function parseDate(raw) {
  let s = raw
    .replace(/\{\{[^}]*\}\}/g, '')  // remove {{Abbr/CET}} etc.
    .replace(/\d{1,2}:\d{2}/g, ''); // remove HH:MM time

  // Remove the separator dash between date and time ("2025-01-31 - 17:30")
  // but leave ISO date dashes (YYYY-MM-DD) intact.
  s = s.replace(/\s+-\s*/g, ' ').replace(/-\s*$/, '').trim();

  const d = new Date(s);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

function parseStage(blockId) {
  const id = blockId.toUpperCase();
  if (/^GF/.test(id))  return 'Grand Final';
  if (/^LF/.test(id))  return 'Losers Final';
  if (/^WF/.test(id))  return 'Winners Final';
  const lr = id.match(/^LR(\d+)/);
  if (lr) return `Losers Round ${lr[1]}`;
  const wr = id.match(/^WR(\d+)/);
  if (wr) return `Winners Round ${wr[1]}`;
  const r  = id.match(/^R(\d+)/);
  if (r)  return `Round ${r[1]}`;
  return blockId;
}

/** Extracts the full content of a `{{...}}` template starting at startPos. */
function extractTemplate(text, startPos) {
  let depth = 0;
  let i = startPos;
  while (i < text.length) {
    if (text[i] === '{' && text[i + 1] === '{') { depth++; i += 2; }
    else if (text[i] === '}' && text[i + 1] === '}') {
      depth--;
      i += 2;
      if (depth === 0) return text.slice(startPos, i);
    } else { i++; }
  }
  return text.slice(startPos);
}

function parseWikitext(wikitext, eventInfo) {
  const matches = [];
  // Find every |BLOCKID={{Match occurrence
  const matchStarts = [...wikitext.matchAll(/\|([A-Z0-9_]+)=(\{\{Match\b)/g)];

  for (const ms of matchStarts) {
    const blockId  = ms[1];
    const tmplStart = ms.index + ms[1].length + 1; // position of {{
    const tmpl = extractTemplate(wikitext, tmplStart);

    // Date
    const dateRaw = tmpl.match(/\|date=([^\n\|]+)/)?.[1]?.trim() ?? '';
    const date = parseDate(dateRaw);
    if (!date) continue;

    // Opponents
    const opp1 = tmpl.match(/\|opponent1=\{\{TeamOpponent\|([^\|\}\n]+)/)?.[1]?.trim().toLowerCase();
    const opp2 = tmpl.match(/\|opponent2=\{\{TeamOpponent\|([^\|\}\n]+)/)?.[1]?.trim().toLowerCase();
    if (!opp1 || !opp2) continue;

    const team1Id = getTeamId(opp1, eventInfo.season);
    const team2Id = getTeamId(opp2, eventInfo.season);
    if (!team1Id || !team2Id) {
      console.warn(`  ⚠ Unknown team codes: "${opp1}" or "${opp2}" in ${blockId} — skipping`);
      continue;
    }

    // Maps
    const maps = [];
    for (let mapNum = 1; mapNum <= 7; mapNum++) {
      const mapRe = new RegExp(`\\|map${mapNum}=(\\{\\{Map\\b)`);
      const mapMs = mapRe.exec(tmpl);
      if (!mapMs) break;

      const mapTmpl = extractTemplate(tmpl, mapMs.index + `|map${mapNum}=`.length);
      const mapName  = mapTmpl.match(/\|map=([^\|\}\n]+)/)?.[1]?.trim() ?? '';
      const modeRaw  = mapTmpl.match(/\|mode=([^\|\}\n]+)/)?.[1]?.trim().toLowerCase() ?? '';
      const score1   = parseInt(mapTmpl.match(/\|score1=(\d+)/)?.[1] ?? '0', 10);
      const score2   = parseInt(mapTmpl.match(/\|score2=(\d+)/)?.[1] ?? '0', 10);
      const winnerRaw = mapTmpl.match(/\|winner=(\d)/)?.[1];

      if (!winnerRaw || !mapName) continue;

      maps.push({
        mapNumber: mapNum,
        mode: MODE_MAP[modeRaw] ?? modeRaw,
        mapName,
        scoreTeam1: score1,
        scoreTeam2: score2,
        winner: winnerRaw === '1' ? 'team1' : 'team2',
      });
    }

    if (maps.length === 0) continue;

    const t1Wins = maps.filter(m => m.winner === 'team1').length;
    const t2Wins = maps.filter(m => m.winner === 'team2').length;

    const id = [
      eventInfo.game.toLowerCase(),
      `s${eventInfo.season}`,
      eventInfo.event.toLowerCase().replace(/\s+/g, '-'),
      team1Id,
      team2Id,
      blockId.toLowerCase(),
    ].join('-');

    matches.push({
      id,
      date,
      game: eventInfo.game,
      season: eventInfo.season,
      event: eventInfo.event,
      stage: parseStage(blockId),
      team1Id,
      team2Id,
      scoreTeam1: t1Wins,
      scoreTeam2: t2Wins,
      winner: t1Wins >= t2Wins ? 'team1' : 'team2',
      maps,
    });
  }

  return matches;
}

// ── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchWikitext(page) {
  const url = new URL(API_BASE);
  url.searchParams.set('action', 'parse');
  url.searchParams.set('page', page);
  url.searchParams.set('prop', 'wikitext');
  url.searchParams.set('format', 'json');
  url.searchParams.set('formatversion', '2');

  const res = await fetch(url.toString(), {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept-Encoding': 'gzip',
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} for ${page}`);
  const json = await res.json();

  if (json.error) {
    if (json.error.code === 'missingtitle') return null; // page doesn't exist yet
    throw new Error(`API error for ${page}: ${json.error.info}`);
  }

  return json.parse?.wikitext ?? null;
}

// ── TypeScript serialiser ────────────────────────────────────────────────────

function serializeMatches(matches) {
  const lines = [];
  for (const m of matches) {
    lines.push(`  {`);
    lines.push(`    id: '${m.id}',`);
    lines.push(`    date: '${m.date}',`);
    lines.push(`    game: '${m.game}',`);
    lines.push(`    season: ${m.season},`);
    lines.push(`    event: '${m.event}',`);
    lines.push(`    stage: '${m.stage}',`);
    lines.push(`    team1Id: '${m.team1Id}',`);
    lines.push(`    team2Id: '${m.team2Id}',`);
    lines.push(`    scoreTeam1: ${m.scoreTeam1},`);
    lines.push(`    scoreTeam2: ${m.scoreTeam2},`);
    lines.push(`    winner: '${m.winner}',`);
    lines.push(`    maps: [`);
    for (const map of m.maps) {
      lines.push(`      { mapNumber: ${map.mapNumber}, mode: '${map.mode}', mapName: '${map.mapName}', scoreTeam1: ${map.scoreTeam1}, scoreTeam2: ${map.scoreTeam2}, winner: '${map.winner}' },`);
    }
    lines.push(`    ],`);
    lines.push(`  },`);
    lines.push(``);
  }
  return lines.join('\n');
}

function writeMatchesFile(matches) {
  const grouped = {};
  for (const m of matches) {
    const key = `${m.game} ${m.season}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  }

  let body = '';
  for (const [label, group] of Object.entries(grouped)) {
    // Sort by date within each group
    group.sort((a, b) => a.date.localeCompare(b.date));
    body += `\n  // --- ${label} ---\n\n`;
    body += serializeMatches(group);
  }

  const output = `import type { Match } from '../types';

export const matches: Match[] = [
${body}];

export const getMatchesByTeams = (team1Id: string, team2Id: string): Match[] =>
  matches.filter(
    (m) =>
      (m.team1Id === team1Id && m.team2Id === team2Id) ||
      (m.team1Id === team2Id && m.team2Id === team1Id)
  );

export const getMatchById = (id: string): Match | undefined =>
  matches.find((m) => m.id === id);
`;

  const outPath = join(__dirname, '..', 'src', 'data', 'matches.ts');
  writeFileSync(outPath, output, 'utf8');
  console.log(`\n✅ Wrote ${matches.length} matches to src/data/matches.ts`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const allMatches = [];
  const seenIds = new Set();

  for (let i = 0; i < PAGES.length; i++) {
    const { page, event, season, game } = PAGES[i];
    console.log(`\n[${i + 1}/${PAGES.length}] Fetching: ${page}`);

    try {
      const wikitext = await fetchWikitext(page);
      if (!wikitext) {
        console.log('  ⚠ Page not found — skipping');
      } else {
        const parsed = parseWikitext(wikitext, { event, season, game });
        let added = 0;
        for (const m of parsed) {
          if (!seenIds.has(m.id)) {
            seenIds.add(m.id);
            allMatches.push(m);
            added++;
          }
        }
        console.log(`  ✓ ${added} matches parsed`);
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }

    // Respect the 1 req/30s rate limit for parse actions (skip wait on last page)
    if (i < PAGES.length - 1) {
      console.log('  ⏳ Waiting 31s (Liquipedia rate limit)…');
      await sleep(31_000);
    }
  }

  if (allMatches.length === 0) {
    console.error('\n❌ No matches found — matches.ts not updated.');
    process.exit(1);
  }

  writeMatchesFile(allMatches);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
