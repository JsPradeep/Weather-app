const request = require("request");

// Converts a given address/ location name into latitude and longitude
const geoCode = (address,callback)=>{
	const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicHJhZGVlcGFkYW1zIiwiYSI6ImNrZmlraWllZzAwN2UydW56dmJhdGdyZngifQ.6-QnTluzWaK7Azunlt4UTQ&limit=1";
	// making request to the url and simultaneousely converting json into JavaScript object
	request({url, json: true}, (error, {body:{features}} = {body:{}})=>{ // We grab the features property from body property of response 
		// Handling low level error
		if(error){
			callback('Unable to connect to the GeoCoding service!', undefined);
		}
		// Handling errors from API
		else if(features.length===0){
			callback("No such location found!!", undefined);
		}
		// If everything went smoothely return the lat and long of the given address
		else{
			callback(undefined,{
				// center's format -> [longitude,latitude]
				latitude: features[0].center[1],
				longitude: features[0].center[0], 
				location: features[0].place_name
			});
		}
	});
};

// export our function
module.exports = geoCode;  