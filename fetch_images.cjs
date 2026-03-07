const https = require('https');

const urls = [
  'https://ibb.co/jkL5wTxP',
  'https://ibb.co/Vp27R3xL',
  'https://ibb.co/rRhDRRVV',
  'https://ibb.co/bjG0jc44',
  'https://ibb.co/N2TgmggH',
  'https://ibb.co/GQvJTdXJ',
  'https://ibb.co/0y4ZBJQs',
  'https://ibb.co/ycjTS9W2'
];

async function fetchDirectLink(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) resolve(match[1]);
        else resolve(url);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const url of urls) {
    const direct = await fetchDirectLink(url);
    console.log(`${url} -> ${direct}`);
  }
}

run();
