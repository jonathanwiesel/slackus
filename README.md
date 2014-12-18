#slackus

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


This simple application monitors a Disqus forum and sends a notification to Slack channels when a new comment is made in said forum. Can be easily deployed to Heroku. You only need to set the following enviroment variables:

```
DISQUS_API_KEY=disqus_api_key
DISQUS_API_SECRET=api_secret
DISQUS_API_ACCESS_TOKEN=api_access_token
DISQUS_FORUM=your_disqus_forum
DISQUS_COMMENT_COUNT=10
SLACK_DOMAIN=jonathan                       # supposing the Slack URL is jonathan.slack.com
SLACK_TOKEN=slack_token
SLACK_CHANNEL=general.otherChannel          # separate multiple channels by a dot (.)
SLACK_CHANNEL_MENTION=everyone.channel      # optional
```

The server will request every 10 seconds the 10 most recent comments (according to what's stated in the `DISQUS_COMMENT_COUNT` variable). If you consider that your forum could receive more than 10 new comments in a 10 second window, feel free to increase that variable's number.

The `SLACK_CHANNEL_MENTION` variable is **optional**, it will mention those specified (separated by a dot). Remember `everyone` will mention every member on your team and `channel` will mention every member of the channel. (For now specific members are not supported since his ID is necessary, it's not enough with his name)

***

##Notes
This application was built using:
* [node-disqus](https://github.com/hay/node-disqus)
* [node-slack](https://github.com/xoxco/node-slack)
* [cron](https://github.com/ncb000gt/node-cron)

***

## License

[http://jonathanwiesel.mit-license.org/](http://jonathanwiesel.mit-license.org/)
