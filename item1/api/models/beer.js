// beers model

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	BeerSchema = new Schema({
	name: String,
	type: String,
	country: String
});

module.exports = mongoose.model('Beer', BeerSchema);


