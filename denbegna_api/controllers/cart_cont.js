import redisClient from '../utils/redis_db';
import bcrypt from 'bcryptjs';
import User from '../models/users_db';
import { Electronics, Clothings,
        HomeUtils, BookMedias } from '../models/products_db';


export default class Cart {

	static async getCart(req, res) {
		const token = req.headers["x-token"];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
		const user_id = await redisClient.get(token);
		if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
			return;
                }
		res.status(200).json(user.cart || []);
	}

	static async postCart(req, res) {
		const token = req.headers["x-token"];
                if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
		const {category, itemid, quantity, name} = req.body;
		const us = await User.findOne({
			_id: user_id, 
			"cart.itemid": itemid});
		if (us) {
			const update = await User.findOneAndUpdate(
                        	{_id: user_id, "cart.itemid": itemid},
                        	{$inc: {'cart.$.quantity': quantity}},
                        	{new: true}
                	);
			res.status(200).json({"cart": update.cart});
			return;
		}
		else {
			const nw = await User.findByIdAndUpdate(user_id,
				{$push: {cart: {
					"category": category,
					"name": name,
					"itemid": itemid,
					"quantity": quantity }}},
				{new: true}
			);
			res.status(200).json({"cart": nw.cart});
			return;
		}
	}


	static async delCart(req, res) {
		const token = req.headers["x-token"];
                if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
		}
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
                const { itemid }= req.body;
                if (!itemid) {
                        res.status(401).json({"message": "Missing Parameter itemid"});
                        return;
                }
		const response = await User.findByIdAndUpdate(user_id,
			{ $pull: { cart: {"itemid": itemid }}},
			{ new: true }
		);
		res.status(200).json({"cart": response.cart});
                return;
	}

	static async ClearCart(req,res) {
		const token = req.headers["x-token"];
                if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
		const response = await User.findByIdAndUpdate(user_id,
                        { $set: { cart: []}},
                        { new: true }
                );
		res.status(201).json({"message": "All items cleared from cart"});
	}
}
