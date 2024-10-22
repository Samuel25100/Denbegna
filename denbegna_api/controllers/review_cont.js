import { Electronics, Clothings,
        HomeUtils, BookMedias } from '../models/products_db';
import redisClient from '../utils/redis_db';
import { ObjectId } from 'mongodb';
import User from '../models/users_db';


export default class Review {

	static async add_review(req, res) {
		const catagories = {
                        "Electronics": Electronics,
                        "HomeUtils": HomeUtils,
			"Clothings": Clothings,
			"BookMedias": BookMedias,
                };
                const token = req.headers['x-token'];
                if (!token) {
                        res.status(405).json({"message": "Token is missing"});
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
                const { itemid, category, comment, rating} = req.body;
		if (!itemid || !category || !comment) {
			res.status(405).json({"error": "Missing Parameters"});
			return;
		}
		const result = await catagories[category].findByIdAndUpdate(
			itemid,
			{$push: {comments: { user_id, comment, rating }}},
			{ new: true }
		);
		console.log("result:", result);
		if (!result) {
			res.status(405).json({"error": "Product not found"});
                        return;
		}
		const newcomment = result.comments[result.comments.length - 1];
		res.status(201).json({"_id": newcomment._id.toString()});
	}

	static async del_review(req, res) {
		const catagories = {
                        "Electronics": Electronics,
                        "HomeUtils": HomeUtils,
                        "Clothings": Clothings,
                        "BookMedias": BookMedias,
                };
                const token = req.headers['x-token'];
                if (!token) {
                        res.status(405).json({"message": "Token is missing"});
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
		const { comment_id, itemid, category } = req.body;
		const result = await catagories[category].findByIdAndUpdate(
			itemid,
			{$pull: {comments: {
				_id: comment_id,
				"user_id": user_id 
				}}
			},
                        { new: true }
                );
		if (!result) {
			res.status(401).json({"error": "Unauthorized"});
			return;
		}
		res.status(201).json({"message": "Comment deleted"});
	}
}
