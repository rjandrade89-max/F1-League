const https = require('https');

const urls = [
  'https://ibb.co/gLRVj4Tx',
  'https://ibb.co/3ym4dBT5'
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
