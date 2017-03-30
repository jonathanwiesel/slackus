var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Slackus Web Dyno is live. You may want to check the Worker Dyno is enabled in the Heroku dashboard for this app.')
})

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Web Dyno info app listening on port '+ port)
})
