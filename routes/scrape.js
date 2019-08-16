/** importing express and router module */
var express =  require('express');
/** express.Router middleware allows to group the router handler and access them by using common route prefix */
var router = express.Router();

/** Import the category service module */
var scrapeService = require('../services/scrape_service');

/** using http methods(get,post,put, delete) created API it contains http methods, path and router handler */
router.post('/getMetaDataFromUrl', scrapeService.getMetaDataFromUrl);


//OR



/** using open graph  */
router.post('/getMetaDataPropertiesUsingOpenGraph', scrapeService.getMetaDataPropertiesUsingOpenGraph)

/** export the router object */

module.exports = router;
