const mongoose = require('mongoose');

const order_sc = mongoose.Schema({
	itemid: {type: String, required: true},
	item_ownerid: {type: String, required: true},
	category: {type: String, required: true},
	quantity: {type: String, required: true},
	user_id: {type: String, required: true}
},  { timestamps: true });

module.exports = mongoose.model('Order', order_sc);
