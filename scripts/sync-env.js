import { readFileSync, writeFileSync } from 'fs';

const env = readFileSync('.env', 'utf-8');
const lines = env
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .map(line => line.split('=')[0] + '=')
    .join('\n');

writeFileSync('.env.example', lines);
console.log('.env.example updated');
