export const GOJYUON_ROWS = [
    { label: 'あ行', id: 'a', chars: ['a', 'i', 'u', 'e', 'o'] },
    { label: 'か行', id: 'ka', chars: ['k', 'g'] },
    { label: 'さ行', id: 'sa', chars: ['s', 'z', 'j'] },
    { label: 'た行', id: 'ta', chars: ['t', 'd', 'c'] },
    { label: 'な行', id: 'na', chars: ['n'] },
    { label: 'は行', id: 'ha', chars: ['h', 'b', 'p', 'f'] },
    { label: 'ま行', id: 'ma', chars: ['m'] },
    { label: 'や行', id: 'ya', chars: ['y'] },
    { label: 'ら行', id: 'ra', chars: ['r'] },
    { label: 'わ行', id: 'wa', chars: ['w'] },
] as const;

export function getGojyuonRow(romaji: string) {
    const lower = romaji.toLowerCase();
    const first = lower.charAt(0);

    return GOJYUON_ROWS.find(row => (row.chars as readonly string[]).includes(first)) || { label: 'その他', id: 'other', chars: [] };
}

export function normalizeForSort(romaji: string): string {
    let s = romaji.toLowerCase();

    // Normalize Hepburn to Kunrei-ish (sort-friendly)
    // Handle composite syllables first
    s = s.replace(/^shi/, 'si');
    s = s.replace(/^chi/, 'ti');
    s = s.replace(/^tsu/, 'tu');
    s = s.replace(/^fu/, 'hu');

    // J-consonants
    s = s.replace(/^j([auo])/, 'zy$1'); // ja, ju, jo -> zya, zyu, zyo
    s = s.replace(/^ji/, 'zi');

    // Sh-consonants (rest)
    s = s.replace(/^sh([auo])/, 'sy$1');

    // Ch-consonants (rest)
    s = s.replace(/^ch([auo])/, 'ty$1'); // cha, chu, cho -> tya, tyu, tyo

    // Ignore Dakuten for basic dictionary sort (Approximation)
    // g -> k
    s = s.replace(/^g/, 'k');
    // z -> s
    s = s.replace(/^z/, 's');
    // d -> t
    s = s.replace(/^d/, 't');
    // b, p -> h
    s = s.replace(/^b/, 'h');
    s = s.replace(/^p/, 'h');

    return s;
}
