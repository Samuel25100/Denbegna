const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
	itemid: {type: String, required: true},
	category: {type: String, required: true},
	quantity: {type: Number, required: true}
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  cart: [{ type: cartSchema }],
  order: { type: Map, of: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
