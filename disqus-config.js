var Disqus = require('disqus'),
    disqus = new Disqus({
        api_secret : process.env.DISQUS_API_SECRET,
        api_key : process.env.DISQUS_API_KEY,
        access_token : process.env.DISQUS_API_ACCESS_TOKEN
    }),
    disqus_options = {
        forum: process.env.DISQUS_FORUM,
        related: 'thread',
        limit: process.env.DISQUS_COMMENT_COUNT
    };

module.exports.disqus = disqus;
module.exports.disqus_options = disqus_options;
