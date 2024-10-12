import redisClient from '../utils/redis_db';
import { ObjectId } from 'mongodb';
import { Electronics, Clothings,
	HomeUtils, BookMedias } from '../models/products_db';
import bcrypt from 'bcryptjs';
import User from '../models/users_db';


export default class Products {

	static async add_prod(req, res) {
		const catagories = {
			"Electronics": Electronics,
			"HomeUtils": HomeUtils
		};
		const token = req.headers['x-token'];
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
		console.log("Pass findById");
		const category = req.body["category"];
		if (category == "Electronics" || category == "HomeUtils") {
			const {name, description, price, stock} = req.body;
			const prod = await catagories[catagory].create({
				name, description, price, stock, user_id});
			res.status(201).json(
			{"_id": prod._id});
			return;
		}
		if (category == "Clothings") {
                        const {name, description, price, stock, size} = req.body;
                        const prod = await Clothings.create({
                                name, size, description, price, stock, user_id});
                        res.status(201).json(
                        {"_id": prod._id});
                        return;
                }
		if (category == "BookMedias") {
                        const { name, description, price,
				type, stock, size } = req.body;
                        const prod = await Clothings.create({
                                name, size, description,
				price, type, stock, user_id});
                        res.status(201).json(
                        {"_id": prod._id});
                        return;
                }
		res.status(401).json({"error": "Missing catagory"});
                return;
	}

	static async getElectronics(req, res) {
		const token = req.headers['x-token'];
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
		const products = await Electronics.find({});
		const final = [];
		for (let line of products) {
			final.push({"_id": line["_id"],
				"user_id": line.user_id,
				"name": line.name,
				"price": line.price,
				"stock": line.stock}
			);
		}
		res.status(200).json(final);
	}

	static async getClothings(req, res) {
                const token = req.headers['x-token'];
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
                const products = await Clothings.find({});
                const final = [];
                for (let line of products) {
                        final.push({"_id": line["_id"],
                                "user_id": line.user_id,
                                "name": line.name,
                                "price": line.price,
                                "stock": line.stock,
				"size": line.size});
                }
                res.status(200).json(final);
        }

	static async getHomeUtils(req, res) {
                const token = req.headers['x-token'];
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
                const products = await HomeUtils.find({});
                const final = [];
                for (let line of products) {
                        final.push({"_id": line["_id"],
                                "user_id": line.user_id,
                                "name": line.name,
                                "price": line.price,
                                "stock": line.stock});
                }
                res.status(200).json(final);
        }

	static async getBookMedia(req, res) {
                const token = req.headers['x-token'];
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
                const products = await BookMedias.find({});
                const final = [];
                for (let line of products) {
                        final.push({"_id": line["_id"],
                                "user_id": line.user_id,
                                "name": line.name,
				"type": line.type,
                                "price": line.price,
                                "stock": line.stock});
                }
                res.status(200).json(final);
        }


}