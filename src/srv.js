const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

const app = express();
const port = process.env.PORT || 3000
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    'default-src': [
      "'self'",
      'https://ya-praktikum.tech',
      'wss://ya-praktikum.tech',
      'ws://localhost:*',
      "'unsafe-inline'",
    ],
    "connect-src": [
      "'self'",
      'https://ya-praktikum.tech',
      'wss://ya-praktikum.tech',
      'ws://localhost:*',
      "'unsafe-inline'"
      ],
    "img-src": [
      "'self'",
      'https://ya-praktikum.tech',
      "data:"
      ],
    "style-src-elem": ["'self'", "data:"],
    "script-src": ["'unsafe-inline'","'unsafe-eval'","'self'"],
    "object-src": ["'none'"],
  
  },
}));

app.use(limiter);

app.use('/', express.static(`${__dirname}/../dist`));

app.get('*', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});

app.set('port', process.env.PORT || port);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.use(express.static(__dirname + '/public'));

module.exports = app;