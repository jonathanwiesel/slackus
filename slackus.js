var Slack = require('node-slack');
    channels = process.env.SLACK_CHANNEL.split('.');

var Slackus = function(domain, token){
    this.slack = new Slack(domain, token);
}

Slackus.prototype = {

    buildMessage: function(comment, callback){

        var commentDate = new Date(comment.createdAt);

        var url = comment.thread.link + '#comment-' + comment.id;

        var message = comment.author.name + ' created <'+ url +'|a new comment>';
        message += ' on entry <'+ comment.thread.link +'|' +  comment.thread.title + '>:\n';
        message += comment.raw_message;

        callback(message);
    },

    addMentions: function(message, mentionsArray, callback){

        message += '\n Alerting';
        var mentionsVar = mentionsArray.split('.');
        var mentions = '';
        for(var j=0; j < mentionsVar.length; j++){
            mentions += ' <!' + mentionsVar[j] + '>';
        }

        message += mentions;

        callback(message);
    },

    sendMessage: function(message){

        for(var k=0; k < channels.length; k++){
            slack.send({
                text: message,
                channel: '#' + channels[k]
            },function(error){
                if(error){
                    console.log('Something went wrong...');
                    console.log(error);
                }else{
                    console.log('New Disqus comment!. Message sent to Slack channel #' + channels[k]);
                }
            });
        }
    }

}
module.exports = Slackus;
