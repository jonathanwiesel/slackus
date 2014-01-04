var Disqus = require('disqus'),
    cronJob = require('cron').CronJob,
    slack = require('./slack.js');

var disqus = new Disqus({
    api_secret : process.env.DISQUS_API_SECRET,
    api_key : process.env.DISQUS_API_KEY,
    access_token : process.env.DISQUS_API_ACCESS_TOKEN
});

var disqus_options = {
    forum: process.env.DISQUS_FORUM,
    related: 'thread',
    order: 'asc'
};

new cronJob('*/10 * * * * *', function (){

    var lastTimestamp = new Date();

    disqus_options.since = lastTimestamp.toISOString();

    disqus.request('posts/list', disqus_options, function(data) {

        if(data.error) {
            console.log('Something went wrong...');
            console.log(data);
        }else{
            slack.sendComment(data);
        }
    });

}, null, true, null);

