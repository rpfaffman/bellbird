var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var bodyParser = require('body-parser');
var config = require('./webpack.local.config');

var app = new require('express')();
var port = process.env.PORT || 8080;
var compiler = webpack(config);

var db = require('./lib/db.js');
db.migrate();

/* MIDDLEWARE */
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('express').static('assets'));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());


app.get('/api/alarms', function(req, res) {
  db.alarmsIndex()
    .then(function(alarms) {
      res.status(200).json(alarms);
    })
    .catch(function(err) {
      res.status(500).send(err.message)
    });
});

app.post('/api/alarms', function(req, res) {
  db.alarmsCreate({ content: req.body.content.toUpperCase() }) // enforce uppercase
    .then(function(alarm) {
      res.status(200).json(alarm);
    })
    .catch(function(err) {
      res.status(500).send(err.message)
    });
});

app.post('/api/upvotes', function(req, res) {
  db.upvotesCreate({ alarmId: req.body.alarm_id })
    .then(function(upvote) {
      res.status(200).json(upvote);
    })
    .catch(function(err) {
      res.status(500).send(err.message)
    });
});

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌍  Open up http://localhost:%s/ in your browser.', port);
  }
});
