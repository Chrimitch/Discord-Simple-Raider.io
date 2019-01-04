const request = require('request');
const fs = require('fs');

request('https://raider.io/api/v1/characters/profile?region=us&realm=suramar&name=raelsine&fields=mythic_plus_scores', function (error, response, body) {
    if(!error & response.statusCode == 200) {
	fs.writeFile("test.json", body, function(err) {
	    if(err) {
	    	return console.log(err);
	    }
        });
    }
    else {
    	console.log("Error "+response.statusCode)
    }
});
