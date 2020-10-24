// Import modules
const request = require('request');

// forecast function takes address and forecast is sent to the requester
const forecast = (address, callback)=>{
	const url = "http://api.weatherapi.com/v1/forecast.json?key=6b76be22abe944e6b6b92831202109&q=" + address + "&days=1";

	request({url, json: true},(error, {body})=>{ 
		// Handling lower level errors(machine based errors) like network error(internet disconnected)
		if(error){
			callback("Can't connect to weather service!", undefined);
		}
		// Handling errors from API
		else if(body.error){
			callback(body.error.message, undefined);
		}
		// If everything is OK return the forecast
		else{
			const message = 'Weather condition will be ' + body.current.condition.text + ' today, with average temperature of ' + body.forecast.forecastday[0].day.avgtemp_c + " degrees. It is currently " + body.current.temp_c + ' degrees out and there is ' + body.forecast.forecastday[0].day.daily_chance_of_rain + '% chance of rain.'
			callback(undefined, message);
		}
	});
};

// exporting the forecast function
module.exports = forecast;