#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const extract = require('extract-zip');

const completionMessage = `
You've Astral API Portal configuration is downloaded! 💫

When you're ready to test locally run the
following commands one at a time:

cd portal
npm install
npm run dev
`;

const companyId = process.argv[process.argv.length - 1];

https.get(`https://app.astral.sh/api/portal-template?id=${companyId}`, function(response) {
  if (response.statusCode !== 200) {
    console.log('Unable to find a portal configuration for your company.');
    return;
  }

  const file = fs.createWriteStream("portal.zip");
  response.pipe(file);

  // after download completed close filestream
  file.on("finish", async () => {
    file.close();

    if (!fs.existsSync('portal')) {
      fs.mkdirSync('portal');
    }

    await extract('./portal.zip', { dir: path.join(process.cwd(), 'portal') });
    fs.unlinkSync('portal.zip');

    console.log(completionMessage);
  });
});
