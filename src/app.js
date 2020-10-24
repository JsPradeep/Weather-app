// Modules Loading
const path = require('path');
const express = require('express');
const hbs = require('hbs'); // To create partials we need to load hbs
const forecast = require('./utils/forecast'); // Provide relative address according to the this file's directory i.e. src in this case
const geoCode = require('./utils/geocode'); 

// Applicaiton created or Server Created
const app = express();

// Various Paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates(earlier_views)/views');
const partialPath = path.join(__dirname, '../templates(earlier_views)/partials');

// Setup handlebars engine, views path
app.set('view engine', 'hbs');
app.set('views',viewsPath);

// To setup the directory where we will be keeping our partials
hbs.registerPartials(partialPath); 

// Setup static directory to serve 
app.use(express.static(publicDirPath));

// Setting up routes
app.get('',(req,res)=>{  // Root route
	res.render('index',{
		Heading: 'Weather Jasoos',
		cName: 'PradeepS'
	});
});
app.get('/about',(req,res)=>{
	res.render('about', {
		Heading: 'About',
		cName: 'PradeepS'
	});
});
app.get('/help',(req,res)=>{
	res.render('help',{
		Heading: 'Help',
		cName: 'PradeepS',
		helpText: 'Here you can clear your doubts. We are here to help you!'
	});
});
app.get('/weather',(req,res)=>{
	if(!req.query.address){ // checking if address is provided in the query string or not
		return res.send({
			error: "Provide address for god's sake!"
		});
	}
	// converting the provided location into latLong and then getting forecast for the same
	geoCode(req.query.address,(error, {latitude,longitude,location}={})=>{ // Since we are using destrucuring, it is advisable to provide default value, 
		//because if that argument is not provided or undefined is provided then we cannot destructure 'undefined' and therefore our app will crash
		
		if(error) return res.send({error}); // no need to write {error: error} , because their names are same
		else{
			const latLong = latitude + ',' +longitude;
			// getting forecast for the given location based upon the latLong
			forecast(latLong,(error, forecastData)=>{
				if(error){
					return res.send({error}); 
				}
				else{
					res.send({
						forecast: forecastData,
						location,
						address: req.query.address
					});
				}
			});
		}
	});
});
	// Page not found Handling
app.get('/help/*',(req,res)=>{ 
	res.render('404page',{
		Heading: 'Error',
		errorMessage: 'Help article not found!',
		cName: 'PradeepS'
	});
});
app.get('*',(req,res)=>{ 
	res.render('404page',{
		Heading: 'Error',
		errorMessage: 'Page not found',
		cName: 'PradeepS'
	});
});

// Firing up the server
app.listen(3000,()=>{
	console.log('Server fired up at port 3000');
});


