var Slack = require('node-slack');
var slack = new Slack(process.env.SLACK_DOMAIN,process.env.SLACK_TOKEN);

var sendComment = function (data, callback) {

    var response = JSON.parse(data);
    var responseLength = response.response.length;
    if(responseLength > 0){
        for(var i=0; i < responseLength; i++){

            var comment = response.response[i];
            var commentDate = new Date(comment.createdAt);

            var url = comment.thread.link + '#comment-' + comment.id;

            var message = '<' + comment.author.profileUrl + '|' + comment.author.name + '> created <'+ url +'|a new comment>';
            message += ' on entry <'+ comment.thread.link +'|' +  comment.thread.title + '>:\n';
            message += comment.raw_message;

            if(process.env.SLACK_CHANNEL_MENTION){
                message += '\n Alerting ';
                var mentionsVar = process.env.SLACK_CHANNEL_MENTION.split('-');
                var mentions = '';
                for(var j=0; j < mentionsVar.length; j++){
                    mentions += ' <!' + mentionsVar[j] + '>';
                }

                message += mentions;
            }

            slack.send({
                text: message,
                channel: '#' + process.env.SLACK_CHANNEL
            },function(error){
                if(error){
                    console.log('Something went wrong...');
                    console.log(error);
                }else{
                    console.log('New Disqus comment!. Message sent to Slack channel.')
                }
            });
        }
    }else{
        console.log('Nothing new to send');
    }

    callback();
}

module.exports.sendComment = sendComment;
