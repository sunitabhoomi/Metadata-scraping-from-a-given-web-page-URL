# Metadata-scraping-from-a-given-web-page-URL

Open Graph returns all metadata properties scraped from URL.

1) Install 

var og = require('open-graph');



Usage

var og = require('open-graph');

exports.getMetaDataPropertiesUsingOpenGraph = (req) => new Promise(function (resolve, reject, options) {
    var url = req.body.url;
    og(url, function(err, meta) {
    if (err)
    {
        reject(err)
    }
    else {
        resolve(meta);
    }
})

})


Input:

{
	"url":"https://github.com/"
}



Output

{
    "url": "https://github.com",
    "site_name": "GitHub",
    "title": "Build software better, together",
    "description": "GitHub is where people build software. More than 40 million people use GitHub to discover, fork, and contribute to over 100 million projects.",
    "image": [
        {
            "": "https://github.githubassets.com/images/modules/open_graph/github-logo.png",
            "type": "image/png",
            "width": "1200",
            "height": "1200"
        },
        {
            "": "https://github.githubassets.com/images/modules/open_graph/github-mark.png",
            "type": "image/png",
            "width": "1200",
            "height": "620"
        },
        {
            "": "https://github.githubassets.com/images/modules/open_graph/github-octocat.png",
            "type": "image/png",
            "width": "1200",
            "height": "620"
        }
    ]
}


-> If the URL not set the parameters need to parse the webpage to get related details.

Install

var request = require('request'),
    cheerio = require('cheerio');
    
    

    Input :
    
    {
	"url":"https://www.amazon.com/b?node=18332383011&pf_rd_p=738205f7-6bfe-4423-bacb-73a824c6a296&pf_rd_r=4WQTEEA9CF3GR2PDZJYQ"
    }
    
    
    
    Output
    
    {
    "title": "Amazon Renewed: Laptops & Computers @ Amazon.com",
    "description": "Online shopping for Amazon Renewed: Laptops & Computers: Featured Stores at Amazon.com",
    "image": [{
        "url": "//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:130-7649254-8205050:65MZYVAEEH8365HSCZG5$uedata=s:%2Fmn%2Fsearch%2Fuedata%2F130-7649254-8205050%3Fstaticb%26id%3D65MZYVAEEH8365HSCZG5:0",
        "width": "1",
        "height": "1"
    }]
}
    
    
    
