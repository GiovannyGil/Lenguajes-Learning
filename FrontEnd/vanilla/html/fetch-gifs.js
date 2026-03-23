const fs = require('fs');
const https = require('https');

const file = 'd:/Codes/Lenguajes-Learning/FrontEnd/vanilla/html/ejercicios.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /https:\/\/fitnessprogramer\.com\/wp-content\/uploads\/\d{4}\/\d{2}\/([^.]+)\.gif/g;
const matches = [...content.matchAll(regex)];

const uniqueMatches = [];
const map = new Map();
for (let m of matches) {
    if (!map.has(m[1])) {
        map.set(m[1], m[0]);
        uniqueMatches.push(m);
    }
}

async function fetchUrl(slug) {
    return new Promise((resolve) => {
        const get = (url) => {
            https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
                if ([301, 302, 308].includes(res.statusCode) && res.headers.location) {
                    get(res.headers.location);
                    return;
                }
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const m = data.match(/src="(https:\/\/fitnessprogramer\.com\/wp-content\/uploads\/[^"]+\.gif)"/);
                    if (m) resolve(m[1]);
                    else resolve(null);
                });
            }).on('error', () => resolve(null));
        };
        get('https://fitnessprogramer.com/exercise/' + slug.toLowerCase() + '/');
    });
}

(async () => {
    let newContent = content;
    for (let m of uniqueMatches) {
        const slug = m[1];
        const newUrl = await fetchUrl(slug);
        if (newUrl) {
            console.log('Replacing ' + slug + ' -> ' + newUrl);
            newContent = newContent.replaceAll(m[0], newUrl);
        } else {
            console.log('Could not find new url for ' + slug);
        }
    }
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Done replacing.');
})();
