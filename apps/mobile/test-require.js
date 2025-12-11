const path = require('path');
console.log('--- Diagnostic Start ---');

function check(name) {
    try {
        const m = require(name);
        console.log(`[OK] ${name} loaded. Keys: ${Object.keys(m).join(', ')}`);
    } catch (e) {
        console.log(`[FAIL] ${name}: ${e.message}`);
    }
}

check('expo/metro-config');
check('nativewind/metro');
check('tailwindcss');

console.log('CWD:', process.cwd());
console.log('__dirname:', __dirname);
console.log('--- Diagnostic End ---');
