const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static(`${__dirname}/../dist`));

app.use('/login', express.static(`${__dirname}/../dist`));
app.use('/settings', express.static(`${__dirname}/../dist`));
app.use('/reg', express.static(`${__dirname}/../dist`));
app.use('/404', express.static(`${__dirname}/../dist`));
app.use('/500', express.static(`${__dirname}/../dist`));

/** Routing */
app.get('*', function (req, res) {
  res.status(200).type('.html').sendFile('index.html', { root: __dirname + '/../dist/' });
});

app.set('port', process.env.PORT || port);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.use(express.static(__dirname + '/public'));
