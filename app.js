var cronJob  = require('cron').CronJob,
    D        = require('./disqus-config.js'),
    Slackus  = require('./slackus.js'),
    slackus  = new Slackus(process.env.SLACK_DOMAIN,process.env.SLACK_TOKEN),
    mentions = process.env.SLACK_CHANNEL_MENTION;

var lastTimestamp = null;

new cronJob(D.cron_time, function (){

    D.disqus.request('posts/list', D.disqus_options, function(data) {

        if(data.error) console.log('Something went wrong: ' + data);
        else{
            var response = JSON.parse(data).response;
            if(response.length > 0){
                if(!lastTimestamp) lastTimestamp = new Date(response[0].createdAt);
                else{
                    var mostRecentTimestamp = null;
                    for(var i=0; i < response.length; i++){
                        var postDate = new Date(response[i].createdAt);
                        if(postDate > lastTimestamp){

                            slackus.buildMessage(response[i], function(message){
                                if(mentions){
                                    slackus.addMentions(message, mentions, function(messageWithMentions){
                                        slackus.sendMessage(messageWithMentions);
                                    })
                                }else{
                                    slackus.sendMessage(messageWithMentions);
                                }
                            });

                            if(!mostRecentTimestamp) mostRecentTimestamp = postDate;
                        }else{
                            console.log('Nothing new to send. Last comment timestamp: ' + lastTimestamp.toISOString());
                            break;
                        }
                    }
                    if(mostRecentTimestamp) lastTimestamp = mostRecentTimestamp;
                }
            }
        }
    });

}, null, true, null);

