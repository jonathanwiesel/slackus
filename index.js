var Slackus = require('./lib/slackus.js'),
    config  = require('./config.js');

// Check if the required configuration values have been set.
var required = [
  'slack.webhook',
  'disqus.forums',
  'disqus.authentication.api_secret',
  'disqus.authentication.api_key',
  'disqus.authentication.access_token'
].filter(function(config, path) {
  var i, len;
  for (i = 0, path = path.split('.'), len = path.length; i < len; i++) {
    config = config[path[i]];
  }
  return !config;
}.bind(this, config));

// Exit if missing required configuration.
if (required.length) {
  console.log('Missing required configuration:');
  console.log(required.join(', '));
  process.exit(1);
}

// Fallback to defaults.
config.disqus.limit = config.disqus.limit || 25;
config.interval = config.interval || 60;

// Start checking!
var slackus = new Slackus(config);
slackus.start();
