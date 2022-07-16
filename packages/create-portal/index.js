const http = require('http');
const fs = require('fs');
const extract = require('extract-zip');

const file = fs.createWriteStream("portal.zip");
const request = http.get("http://localhost:3000/api/portal-template?id=41a696f2-eb69-4fa2-9e09-80ca0c67dae6", function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", async () => {
       file.close();

       await extract('./portal.zip', { dir: process.cwd() });
       fs.unlinkSync('portal.zip');
   });
});