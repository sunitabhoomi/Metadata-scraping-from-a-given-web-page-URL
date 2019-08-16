 /** Importing express module using require function */
 var express = require('express');
 var bodyparser = require('body-parser');
 var app = express();
 var port = 3000;
 app.use(bodyparser.json());
 
 /** Listen on the port 3000 for connections */
 app.listen(port, () => {
     console.log('App listening on the port', + port);
 })
 
 /** import the router module */
 var scrapeRouter = require('./routes/scrape');

 
 /** add the router to the middleware handling path*/
 app.use('/scrape',scrapeRouter);
