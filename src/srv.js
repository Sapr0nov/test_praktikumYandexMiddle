const express = require('express');
const https = require('https');

const app = express();
const port = process.env.PORT || 3000

app.use('/', express.static(`${__dirname}/../dist`));


/** Routing */
/*
app.get('/login/', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});
app.get('/settings', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});
app.get('/reg/', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});
app.get('/404/', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});
app.get('/500/', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});
*/
const base_url = 'https://ya-praktikum.tech/api/v2';
const getUser = '/auth/user';

https.get(base_url + getUser, (resp) => {
  let data = '';
  
  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
//    console.log(JSON.parse(data).explanation);
  });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });  console.log("test login");


app.get('*', function (req, res) {
console.log(req);

  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});

app.set('port', process.env.PORT || port);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.use(express.static(__dirname + '/public'));
