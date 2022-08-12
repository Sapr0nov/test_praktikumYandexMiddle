const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use('/', express.static(`${__dirname}/../dist`));

/** Routing */

app.get('/login/', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});
app.get('/settings/', function (req, res) {
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


app.get('*', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});

app.set('port', process.env.PORT || port);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.use(express.static(__dirname + '/public'));
