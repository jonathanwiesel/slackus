var config = module.exports = {};
config.disqus = {};
config.slack = {};

// Number of seconds between each check (optional, default 60).
config.interval = process.env.SLACKUS_INTERVAL;

// The number of recent comments to check (optional, default 25, max 100).
config.disqus.limit = process.env.SLACKUS_DISQUS_LIMIT;

// Disqus forum to check, specified by its shortname.
// To check multiple forums, enter their shortnames separated by comma.
config.disqus.forums = process.env.SLACKUS_DISQUS_FORUM;

// Disqus authentication.
config.disqus.authentication = {
  api_secret: process.env.SLACKUS_DISQUS_API_SECRET,
  api_key: process.env.SLACKUS_DISQUS_API_KEY,
  access_token: process.env.SLACKUS_DISQUS_ACCESS_TOKEN,
};

// URL of your Slack Incoming WebHook.
// See https://my.slack.com/services.
config.slack.webhook = process.env.SLACKUS_SLACK_WEBHOOK;

// Additional options for messages posted to Slack (optional).
// Overrides the webhook's settings, see Setup Instructions for your webhook.
config.slack.options = {
  // Some examples:
  // username: 'Santa Claus',
  // icon_emoji: ':santa:',
  // icon_url: 'http://northpole.com/santa.jpg',
  // channel: '#workshop',
  // channel: '@helper',
  // attachments: [ ... ],
};

// Additional options for API requests to Disqus (optional).
// See https://disqus.com/api/docs/posts/list/.
config.disqus.options = {};
