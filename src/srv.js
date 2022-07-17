const express = require('express')
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.status(404).type('.html').sendFile('index.html', { root: __dirname + '/../dist' });
});
app.get('/500', function (req, res) {
  res.status(500).type('.html').sendFile('500.html', { root: __dirname + '/../dist' });
});
app.get('*', function (req, res) {
  res.status(404).type('.html').sendFile('404.html', { root: __dirname + '/../dist' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});