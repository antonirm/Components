// KitchenRecipes model

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	KitchenRecipesSchema = new Schema({
	name: String,
	type: String,
	ingredient: {type:String},
    utensilRequired:String,
    measure:Number,
    steps:{type:String}
});

module.exports = mongoose.model('KitchenRecipes', KitchenRecipesSchema);


