var db = require('../controllers');

module.exports.getMetaDataFromUrl = (req, res, next) =>
    db.scrape.getMetaDataFromUrl(req)
        .then((mataData) => res.send(mataData))
        .catch((err) => next(err))


        module.exports.getMetaDataPropertiesUsingOpenGraph = (req, res, next) =>
    db.scrape.getMetaDataPropertiesUsingOpenGraph(req)
        .then((mataData) => res.send(mataData))
        .catch((err) => next(err))

        