const https = require('https');
 
function functionWithHttpsCall(apiInput) { 
  return new Promise((resolve, reject) => {
    const request = https.get(`https://dummyapi.com?giveme=${apiInput}`, (response) => {
      let body = '';
 
      response.on('data', (d) => {
        console.log('stream, "on(data) called"')
        body += d;
      });
 
      // stream ended so resolve the promise 
      response.on('end', ()=> {
        console.log('stream, "on(end) called"')
        resolve(JSON.parse(body));
      });
    });
 
    request.on('error', (e) => {
      reject(e);
    });
  });
}

module.exports = functionWithHttpsCall;
