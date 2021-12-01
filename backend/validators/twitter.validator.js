const { body, query } = require('express-validator')

exports.fetchTweetsValidator = () => {
    return [ 
        query('query', 'invalid query').isLength({min: 3, max: 50}),
        query('max_results', 'invalid max_results').isInt()
    ]
}