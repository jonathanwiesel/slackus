var Disqus = require('disqus'),
    Slack = require('node-slack');

var Slackus = function(config) {
  this.config = config;
  this.forums = config.disqus.forums.split(',');
  this.slack = new Slack(config.slack.webhook);
  this.disqus = new Disqus(config.disqus.authentication);
  this.lastChecked = new Date();
};

Slackus.prototype.start = function() {
  var milliseconds = this.config.interval * 1000;
  this.interval = setInterval(this.checkAll.bind(this), milliseconds);
  this.checkAll();
};

Slackus.prototype.stop = function() {
  clearInterval(this.interval);
};

Slackus.prototype.checkAll = function() {
  this.forums.forEach(this.checkForum, this);
};

Slackus.prototype.checkForum = function(forum) {
  var options = this.config.disqus.options || {};
  options.limit = this.config.disqus.limit;
  options.forum = forum;
  options.related = 'thread';

  var callback = this.checkComments.bind(this, forum);
  this.disqus.request('posts/list', options, callback);
};

Slackus.prototype.checkComments = function(forum, data) {
  var response;

  if (data.error) {
    response = JSON.parse(data.error.body).response;
    return console.log('[' + forum + '] Something went wrong: ' + response);
  }
  else {
    response = JSON.parse(data).response;
  }

  if (!response.length) {
    return console.log('[' + forum + '] No comments found.');
  }

  // The creation time of the most recent comment.
  var lastCommentTime;

  var i;
  for (i = 0; i < response.length; i++) {
    var commentTime = new Date(response[i].createdAt);

    if (commentTime > this.lastChecked) {
      var message = this.buildMessage(response[i]);

      this.sendMessage(message, forum);

      if (!lastCommentTime) {
        lastCommentTime = commentTime;
      }
    }
  }

  if (lastCommentTime) {
    this.lastChecked = lastCommentTime;
  }
};

Slackus.prototype.buildMessage = function(comment) {
  var url = comment.thread.link + '#comment-' + comment.id;

  var message = comment.author.name + ' posted <'+ url +'|a new comment> ' +
                'on <' + comment.thread.link + '|' + comment.thread.title + '>:' +
                '\n' + comment.raw_message;

  return message;
};

Slackus.prototype.sendMessage = function(message, forum) {
  var options = this.config.slack.options || {};
  options.text = message;

  if (this.config.slack.mention) {
    options.link_names = 1;
    options.text = '@' + this.config.slack.mention.split(',').join(' @') + ' ' + options.text;
  }

  this.slack.send(options, function(error) {
    if (error) {
      return console.log('[' + forum + '] Something went wrong: ' + error);
    }

    console.log('[' + forum + '] New Disqus comment! Message sent to Slack.');
  });
};

module.exports = Slackus;
