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
		port = process.env.PORT || 8080;

// connect to mongodb
mongoose.connect(dbURI);

//  require models
let movie = require('./api/models/movie');


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

// on routes that end in /movies
apiRouter.route('/movies')
	// create a movie (http://localhost:8080/api/movies)
	.post((req, res) => {
		let movie = new movie();

		movie.name = req.body.name;
		movie.lastName = req.body.lastName;
		movie.country = req.body.country;

		movie.save(err => {
			if (err) res.send(err);
			res.json({ message: 'movie created!' });
		});
	})
	// get all movies (http://localhost:8080/api/movies)
	.get((req, res) => {
		movie.find((err, movies) => {
			if (err) res.send(err);
			res.json(movies);
		});
	});

// on routes that end in /movies/:movie_id
apiRouter.route('/movies/:movie_id')
	// get a movie by id (http://localhost:8080/api/movies/:movie_id)
	.get((req, res) => {
		movie.findById(req.params.movie_id, (err, movie) => {
			if (err) res.send(err);
			res.json(movie);
		});
	})
	// update a movie by id (http://localhost:8080/api/movies/:movie_id)
	.put((req, res) => {
		movie.findById(req.params.movie_id, (err, movie) => {
			if (err) res.send(err);
			// update info
			movie.name = req.body.name;
			movie.lastName = req.body.lastName;
			movie.country = req.body.country;
			// save movie
			movie.save(err => {
				if (err) res.send(err);
				res.json({ message: 'movie updated!' });
			});
		});
	})
	// delete a movie by id (http://localhost:8080/api/movies/:movie_id)
	.delete((req, res) => {
		movie.remove({ _id: req.params.movie_id }, (err, movie) => {
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
