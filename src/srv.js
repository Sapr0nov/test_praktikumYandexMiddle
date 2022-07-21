const express = require('express')
const app = express();
const port = 3000;

app.use('/', express.static(__dirname + '/../dist'));

/** Routing */
app.get('/', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/index/' });
});
app.get('/profile', function (req, res) {
  res.status(200).type('.html').sendFile('profile.html', { root: __dirname + '/../dist/profile/' });
});
app.get('/signin', function (req, res) {
  res.status(200).type('.html').sendFile('signin.html', { root: __dirname + '/../dist/signin/' });
});
app.get('/signup', function (req, res) {
  res.status(200).type('.html').sendFile('signup.html', { root: __dirname + '/../dist/signup/' });
});
app.get('/404', function (req, res) {
  res.status(200).type('.html').sendFile('404.html', { root: __dirname + '/../dist/404/' });
});
app.get('/500', function (req, res) {
  res.status(200).type('.html').sendFile('500.html', { root: __dirname + '/../dist/500/' });
});
app.get('/favicon.ico', function (req, res) {
  res.status(200).sendFile('favicon.ico', { root: __dirname + '/../dist/' });
});
/** Other files */
app.get('/:page', function (req, res) {
  res.status(200).sendFile(req.params.page, { root: __dirname + '/../dist/' });
});

/* 404 error */
app.get('*', function (req, res) {
  res.status(404).type('.html').sendFile('404.html', { root: __dirname + '/../dist/404' });
});

/** error server */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).type('.html').sendFile('500.html', { root: __dirname + '/../dist/500' });
});

app.set('port', process.env.PORT || port);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
