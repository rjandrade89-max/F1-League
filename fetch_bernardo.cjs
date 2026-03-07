const https = require('https');

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

fetchDirectLink('https://ibb.co/FknstgcB').then(console.log);
