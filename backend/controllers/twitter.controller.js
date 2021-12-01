const util = require("util");
const request = require("request");

const get = util.promisify(request.get);

const rulesURL = new URL("https://api.twitter.com/2/tweets/search/stream/rules");

const token = process.env.TWITTER_APP_BEARER_TOKEN

exports.fetchTweets = async (req, res, next) => {
    try {
        const searchUrl = new URL("https://api.twitter.com/2/tweets/search/recent");
        const {query, max_results, next_token} = req.query        
        searchUrl.searchParams.append('query', query)
        searchUrl.searchParams.append('max_results', max_results)
        if(next_token) searchUrl.searchParams.append('next_token', next_token)
        const searchConfig = {
            url: searchUrl,
            auth: {
              bearer: token,
            },
            timeout: 31000,
        };
        const searchRes = await get(searchConfig)
        const tweetsData = JSON.parse(searchRes.body)
        res.status(200).json({tweetsData})
        next()
    } catch(err) {
        res.json(err)
        next(err)
    }
}

exports.getRules = async (req, res, next) => {
    
    const requestConfig = {
        url: rulesURL,
        auth: {
            bearer: token,
        },
        json: true,
    };

    try {
        const response = await get(requestConfig);

        if (response.statusCode !== 200) {
            if (response.statusCode === 403) {
                res.status(403).send(response.body);
            } else {
                throw new Error(response.body.error.message);
            }
        }

        res.send(response);
    } catch (e) {
    res.send(e);
    }
}

exports.addRules = async (req, res, next) => {
    const requestConfig = {
        url: rulesURL,
        auth: {
          bearer: token,
        },
        json: req.body,
    };

    try {
        const response = await post(requestConfig);

        if (response.statusCode === 200 || response.statusCode === 201) {
            res.send(response);
        } else {
            throw new Error(response);
        }
    } catch (e) {
        res.send(e);
    }
}