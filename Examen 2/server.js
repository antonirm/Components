'use strict';

// server.js (Express 4.0)

// BASE SETUP
// ==============================================

// call the packages we need
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/test',
		port = process.env.PORT || 8000;

// connect to mongodb
mongoose.connect(dbURI);

//  require models
let KitchenRecipes = require('./api/models/kitchenRecipes');


// DEFINE THE MIDDLEWARE FOR APP
// ==============================================

// configure app to use bodyParser()
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// test router
// apiRouter.get('/', (req, res) => {
// 	res.json({ message: 'welcome to out api' });
// });

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

// routes 
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /kitchenRecipes
apiRouter.route('/kitchenRecipes')
	// create a kitchenRecipes (http://localhost:8080/api/kitchenRecipes)
	.post((req, res) => {
		let kitchenRecipe = new KitchenRecipes();

		kitchenRecipe.name = req.body.name;
		kitchenRecipe.utensilRequired = req.body.utensilRequired;
		kitchenRecipe.type = req.body.type;
        kitchenRecipe.ingredient = req.body.ingredient;
        kitchenRecipe.measure = req.body.measure;
        kitchenRecipe.steps = req.body.steps;

		kitchenRecipe.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Recipes created!' });
		});
	})
	// get all kitchenRecipess (http://localhost:8080/api/kitchenRecipes)
	.get((req, res) => {
		KitchenRecipes.find((err, kitchenRecipes) => {
			if (err) res.send(err);
			res.json(kitchenRecipes);
		});
	});

// on routes that end in /kitchenRecipess/:kitchenRecipesname
apiRouter.route('/kitchenRecipes/name/:kitchenRecipesname')
	// get a beer by id (http://localhost:8080/api/beers/:beer_id)
	.get((req, res) => {
		KitchenRecipes.find({name:req.params.kitchenRecipesname}, (err, kitchenRecipe) => {
			if (err) res.send(err);
			res.json(kitchenRecipe);
		});
	})

// on routes that end in /kitchenRecipess/:kitchenRecipesname
apiRouter.route('/kitchenRecipes/type/:kitchenRecipestype')
	// get a beer by id (http://localhost:8080/api/beers/:beer_id)
	.get((req, res) => {
		KitchenRecipes.find({type:req.params.kitchenRecipestype}, (err, kitchenRecipe) => {
			if (err) res.send(err);
			res.json(kitchenRecipe);
		});
	})

// on routes that end in /kitchenRecipess/:kitchenRecipesname
apiRouter.route('/kitchenRecipes/utensil/:kitchenRecipesutensilRequired')
	// get a beer by id (http://localhost:8080/api/beers/:beer_id)
	.get((req, res) => {
		KitchenRecipes.find({utensilRequired:req.params.kitchenRecipesutensilRequired}, (err, kitchenRecipe) => {
			if (err) res.send(err);
			res.json(kitchenRecipe);
		});
	})


	// update a kitchenRecipes by id (http://localhost:8080/api/kitchenRecipess/:kitchenRecipes_id)
	.put((req, res) => {
		kitchenRecipes.findById(req.params.kitchenRecipes_id, (err, kitchenRecipes_id) => {
			if (err) res.send(err);
			// update info
			kitchenRecipes.name = req.body.name;
			kitchenRecipes.lastName = req.body.lastName;
			kitchenRecipes.country = req.body.country;
			// save kitchenRecipes
			kitchenRecipes.save(err => {
				if (err) res.send(err);
				res.json({ message: 'kitchenRecipes updated!' });
			});
		});
	})
	// delete a kitchenRecipes by id (http://localhost:8080/api/kitchenRecipess/:kitchenRecipes_id)
	.delete((req, res) => {
		kitchenRecipes.remove({ _id: req.params.kitchenRecipes_id }, (err, kitchenRecipes) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});


// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);



// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
