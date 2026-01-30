import { CITIES, PREF_IDS } from '../src/constants/seo-areas';
import { TOP_STATIONS } from '../src/constants/seo-stations';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Argument Parsing
const args = process.argv.slice(2);
function getArg(key: string, defaultValue?: string): string | undefined {
    const found = args.find(a => a.startsWith(`--${key}=`) || a === `--${key}`);
    if (!found) return defaultValue;
    if (found.includes('=')) return found.split('=')[1];
    const idx = args.indexOf(found);
    return args[idx + 1] || defaultValue;
}

const LIMIT_PER_RUN = Number(getArg('limit', '5'));
const MODE = getArg('mode', 'all'); // 'city', 'station', 'all'
const PREF_FILTER = getArg('pref', 'tokyo'); // default to tokyo for cities, can use 'all' for everything (risky volume)
const LINE_FILTER = getArg('line'); // filter for stations

// Sleep function to avoid local resource exhaustion
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Major Genres for Seeding
const MAJOR_GENRES = [
    'イタリアン',
    '和食',
    '居酒屋',
    '焼肉',
    '寿司',
    '中華',
    'カフェ',
    'ラーメン'
];

async function main() {
    console.log(`Starting Data Seeding...`);
    console.log(`  Target: ${BASE_URL}`);
    console.log(`  Limit : ${LIMIT_PER_RUN}`);
    console.log(`  Mode  : ${MODE}`);
    if (MODE !== 'station') console.log(`  Pref  : ${PREF_FILTER} (Cities)`);
    if (MODE !== 'city' && LINE_FILTER) console.log(`  Line  : ${LINE_FILTER} (Stations)`);

    if (process.env.NEXT_PUBLIC_ENABLE_E2E_MOCK !== 'true') {
        console.warn('WARNING: NEXT_PUBLIC_ENABLE_E2E_MOCK is not true. Rate limits may apply.');
    }

    let count = 0;

    // Target Strategy: (Cities + Stations) x Major Genres
    const targets: { type: 'City' | 'Station'; name: string; genre: string; query: string }[] = [];

    // 1. Cities
    if (MODE === 'city' || MODE === 'all') {
        let cityList: { id: string, name: string }[] = [];

        if (PREF_FILTER === 'all') {
            // Combine all cities from all prefs in CITIES
            Object.values(CITIES).forEach(list => cityList.push(...list));
        } else {
            cityList = CITIES[PREF_FILTER as keyof typeof CITIES] || [];
            if (cityList.length === 0) {
                console.warn(`! No cities found for pref: ${PREF_FILTER}. Use pref id (e.g. tokyo, saitama).`);
            }
        }

        cityList.forEach(city => {
            MAJOR_GENRES.forEach(genre => {
                targets.push({
                    type: 'City',
                    name: city.name,
                    genre: genre,
                    query: `${city.name} ${genre}`
                });
            });
        });
    }

    // 2. Stations
    if (MODE === 'station' || MODE === 'all') {
        const uniqueStations = new Set<string>();
        TOP_STATIONS.forEach(line => {
            if (LINE_FILTER && !line.line.includes(LINE_FILTER)) return;
            line.stations.forEach(station => uniqueStations.add(station));
        });

        uniqueStations.forEach(station => {
            MAJOR_GENRES.forEach(genre => {
                targets.push({
                    type: 'Station',
                    name: station,
                    genre: genre,
                    query: `${station}駅 ${genre}`
                });
            });
        });
    }

    console.log(`Total Combinations: ${targets.length}`);

    // Execute Sequentially
    for (const target of targets) {
        if (count >= LIMIT_PER_RUN) break;

        console.log(`[${count + 1}/${LIMIT_PER_RUN}] Seeding (${target.type}): "${target.query}"...`);

        try {
            const res = await fetch(`${BASE_URL}/api/places/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: target.query })
            });

            if (!res.ok) {
                console.error(`Failed: ${res.status} ${res.statusText}`);
                const text = await res.text();
                if (text.includes('Rate limit exceeded')) {
                    console.error('!! RATE LIMIT EXCEEDED !! Aborting...');
                    break;
                }
                console.error(text);
            } else {
                const data = await res.json();
                const items = data.places || [];
                console.log(`  -> Found ${items.length} places.`);
            }

        } catch (error) {
            console.error('Network Error:', error);
        }

        count++;
        // Polite wait
        await sleep(1000);
    }

    console.log('Seeding completed.');
}

main().catch(console.error);
