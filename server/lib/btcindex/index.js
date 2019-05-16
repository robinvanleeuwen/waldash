/**
* This is a "mini-app" that encapsulates router definitions. See more
* at: http://expressjs.com/guide/routing.html (search for "express.Router")
*
*/

var router = require('express').Router({ mergeParams: true });
module.exports = router;

// Don't just use, but also export in case another module needs to use these as well.
router.callbacks    = require('./controllers/btcindex');
router.models       = require('./models/btcindex');
router.get('/currentRate', router.callbacks.getCurrentRate);