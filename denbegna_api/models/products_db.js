const mongoose = require('mongoose');

const ele_prod = mongoose.Schema({
	user_id: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String },
	price: { type: Number, required: true },
	comments: { type: Map, of: String},
	stock: {type: Number, required: true}
});

const clothings = mongoose.Schema({
	user_id: { type: String, required: true },
	name: { type: String, required: true },
        description: { type: String},
        price: { type: Number, required: true },
        comments: { type: Map, of: String },
        stock: { type: Number, required: true },
	size: { type: String, required: true }
});

const home_util = mongoose.Schema({
	user_id: { type: String, required: true },
	name: { type: String, required: true },
        description: { type: String},
        price: { type: Number, required: true },
        comments: { type: Map, of: String},
        stock: {type: Number, required: true}
});

const book_media = mongoose.Schema({
	user_id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String},
        price: { type: Number, required: true },
	type: { type: String, required: true },
        comments: { type: Map, of: String},
        stock: {type: Number, required: true}
});

module.exports = {
	Electronics: mongoose.model('Electronics', ele_prod),
	Clothings: mongoose.model('Clothings', clothings),
	HomeUtils: mongoose.model('HomeUtils', home_util),
	BookMedias: mongoose.model('BookMedias', book_media)
};
